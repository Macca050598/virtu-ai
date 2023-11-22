export {};
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import * as deepai from 'deepai';
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Ensure the environment variable is set
if (!process.env.DEEP_API_KEY) {
    throw new Error('Missing DEEP_API_KEY environment variable');
}

// Set the DeepAI API key using the environment variable
deepai.setApiKey(process.env.DEEP_API_KEY);


export async function POST(
    req: Request 
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { image: dataUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!deepai.setApiKey) {
            return new NextResponse("DeepAI API Key not configured", { status: 500});
        }

        if (!dataUrl) {
            return new NextResponse("No Image has been uploaded", {status: 400});
        }


        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.",  {status: 403})
        }

        const response = await deepai.callStandardApi('torch-srgan', {
            image: dataUrl,
          });

        if (!isPro) {
            await increaseApiLimit(); 
        }

        return NextResponse.json(response)
    } catch (error) {
        console.log("[SUPERRESOLUTION_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}