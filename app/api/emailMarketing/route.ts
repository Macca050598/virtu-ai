export {};
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});





export async function POST(
    req: Request 
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {templateType, messages} = body;
        const { emailPurpose, tone, length, clickThrough, product, benefit1, benefit2, offer, email } = body;

        let instructionContent;

        switch (templateType) {
            case 'Cold Outreach':
                instructionContent = `You are an email marketing bot. Generate a marketing email based on these instructions, Here are the instructions you must follow: You need to write the email about ${emailPurpose}. The tone of the email must strictly be ${tone}. You need to write the email that is strictly ${length} words long. You should always finish the email by creating an intriguing call to action that makes people want to click the link at ${clickThrough}. Also you need to write a subject line based on the ${emailPurpose}`;
                break;
            case 'Product Launch':
                instructionContent = `You are an email marketing bot. Generate an email to help promote a product launch with these instructions that must you follow. You need to write an email promoting product ${product}, You need to sell them on the benefits of the product which are ${benefit1} & ${benefit2} , the cost of the product is ${offer} , the tone of the email needs to be ${tone} , The length of the email must strictly be ${length} , and the call to action of the whole email or the link you tell the user to go to is ${clickThrough} `;  // Your instruction for product launch
                break;
            case 'Follow Up Reminder':
                    instructionContent = `You are an email marketing bot. You need to write a follow up email, think of it like you've already sent a promotional email and they haven't replied yet so you want to follow up on it. The email to follow up to is: ${email} , The tone of the email should be ${tone} and the length of the follow up email should be ${length} `;  // Your instruction for product launch
                    break;    
            case 'Welcome Email':
                   instructionContent = `You are an email marketing bot. You need to write a welcome email, the requirments of the email are stated here: ${email} , The tone of the email should be ${tone} and the length of the follow up email should be ${length} Make the reader of the email want to click on the call to action link which is ${clickThrough}`;  // Your instruction for product launch
                   break;           
            // ... other cases
            default:
                instructionContent = `...`;  // Your default instruction or throw an error
                break;
        }

        const instructionMessage: ChatCompletionMessageParam = {
            role: "system",
            content: instructionContent
        };
        

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500});
        }

        if (!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.",  {status: 403})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });

        if (!isPro) {
            await increaseApiLimit(); 
        }

        return NextResponse.json(response.choices[0].message);


    } catch (error) {
        console.log("[EMAILMARKETING_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}