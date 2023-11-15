export {};
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import * as deepai from 'deepai';
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { TransformOptions } from "react-markdown/lib/react-markdown";

// Ensure the environment variable is set
if (!process.env.DEEP_API_KEY) {
    throw new Error('Missing DEEP_API_KEY environment variable');
}

// Set the DeepAI API key using the environment variable
deepai.setApiKey(process.env.DEEP_API_KEY);

type Models = deepai.Models;
export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { prompt, selectedOption } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!process.env.DEEP_API_KEY) {
            return new NextResponse("DeepAI API Key not configured", { status: 500 });
        }

        if (!selectedOption) {
            return new NextResponse("No style was chosen", { status: 400 });
        }

        if (!prompt) {
            return new NextResponse("You didn't enter a prompt", { status: 400 });
        }

        const model = selectedOption as Models;  // Ensure Models is imported or defined
        const result = await deepai.callStandardApi(model, { text: prompt });

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        if (!isPro) {
            await increaseApiLimit();
        }

        // Assuming the deepai.callStandardApi returns a response with choices and message
        return NextResponse.json(result);

    } catch (error: any) {
        console.error("[IMAGENHANCER_ERROR]", error);

        // Inspect the error to return the correct status code
        if (error instanceof auth) {
            return new NextResponse("Authentication failed", { status: 401 });
        }

        if (error.response && error.response.status) {
            // Return the exact error from DeepAI if available
            return new NextResponse(error.response.data.detail || "Error with DeepAI service", { status: error.response.status });
        }

        return new NextResponse("Internal error", { status: 500 });
    }
}
