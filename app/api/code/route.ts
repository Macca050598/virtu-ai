export {};
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. When you're writing lines of code You must answer only in mark down code snippets. Use code comments for explanations "
}

export async function POST(
    req: Request 
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {messages} = body;

        if (!userId) {
            return new NextResponse("Unathorized", { status: 401 });
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
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}