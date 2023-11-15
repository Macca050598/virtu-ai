"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare, ArrowRight, Music, ImageIcon, VideoIcon, Code, ImagePlus, PlusCircle, SettingsIcon, MailCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },

    {
        label: "Code Generation",
        icon: Code,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        href: "/code"
    },

    {
        label: "Email Marketing Bot",
        icon: MailCheckIcon,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        href: "/emailMarketing"
    },

    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image"
    },

    {
        label: "Advanced Image Generation",
        icon:   ImagePlus, 
        href: "/advancedImage",
        color: "text-pink-700",

    },

    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video"
    },

    {
        label: "Music Generation",
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/music"
    },

  
    {
        label: "Image Quality Enhancer",
        icon:   PlusCircle, 
        href: "/superResolution",
        color: "text-purple-700",
        

    }

   
]


const DashboardPage = () => {
const router = useRouter();
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
    setIsMounted(true);
}, []);


if (!isMounted) {
    return null;
}

return (
    <div>
        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                Chat with the smartest AI - Experience the power 
            </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {tools.map((tool, index) => (
                index % 2 === 0 && (
                    // eslint-disable-next-line react/jsx-key
                    <div className="flex space-x-4">
                        <Card
                            onClick={() => router.push(tool.href)}
                            key={tool.href}
                            className="flex-1 p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Card>
                        {tools[index + 1] && (
                            (() => {
                                const NextIcon = tools[index + 1].icon;
                                return (
                                    <Card
                                        onClick={() => router.push(tools[index + 1].href)}
                                        key={tools[index + 1].href}
                                        className="flex-1 p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                                    >
                                        <div className="flex items-center gap-x-4">
                                            <div className={cn("p-2 w-fit rounded-md", tools[index + 1].bgColor)}>
                                                <NextIcon className={cn("w-8 h-8", tools[index + 1].color)} />
                                            </div>
                                            <div className="font-semibold">
                                                {tools[index + 1].label}
                                            </div>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </Card>
                                );
                            })()
                        )}
                    </div>
                )
            ))}
        </div>
    </div>
)


}

export default DashboardPage;