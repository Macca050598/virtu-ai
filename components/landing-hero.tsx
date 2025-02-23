"use client";

import { useAuth } from "@clerk/nextjs";
import  Link  from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
                <h1>The most intuative All in One Ai Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                    <TypewriterComponent 
                    options={{
                        strings: [

                            "Increase image resolution",
                            "Chat Bot.",
                            "Image Generation.",
                            "Code Bot.",
                            "Video Generation.",
                            "Music Generation.",
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
            Generate content at 10x speed with our AI-powered app. Designed with user-friendliness in mind, eliminating the complexity of AI.

            </div>
                    <div>
                        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                        <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                            Start Generating For Free
                        </Button>
                        </Link>
                    </div>
                    <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    No Credit Card Required.
                    </div>
        </div>
        
    )
}