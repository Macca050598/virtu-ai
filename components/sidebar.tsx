"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, MusicIcon, CodeIcon, SettingsIcon, ImagePlus, PlusCircle, MailQuestion } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"]});



const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard, 
        href: "/dashboard",
        color: "text-sky-500",

    },

    {
        label: "Conversation Bot",
        icon:   MessageSquare, 
        href: "/conversation",
        color: "text-violet-500",

    },

    {
        label: "Code Generation Bot",
        icon:   CodeIcon, 
        href: "/code",
        color: "text-emerald-500",

    },

    {
        label: "Email Marketing Bot",
        icon:   MailQuestion, 
        href: "/emailMarketing",
        color: "text-violet-500",

    },

    {
        label: "Image Generation",
        icon:   ImageIcon, 
        href: "/image",
        color: "text-pink-700",

    },

    {
        label: "Advanced Image Generation",
        icon:   ImagePlus, 
        href: "/advancedImage",
        color: "text-pink-700",

    },

    {
        label: "Video Generation",
        icon:   VideoIcon, 
        href: "/video",
        color: "text-orange-700",

    },

    {
        label: "Music Generation",
        icon:   MusicIcon, 
        href: "/music",
        color: "text-green-700",

    },

   

   
    {
        label: "Image Quality Enhancer",
        icon:   PlusCircle, 
        href: "/superResolution",
        color: "text-purple-700",
        

    },

    {
        label: "Settings",
        icon:   SettingsIcon, 
        href: "/settings",
        color: "text-grey-700",
        

    },

    // {
    //     label: "Translate",
    //     icon:   SettingsIcon, 
    //     href: "/translate",
    //     color: "text-orange-700",
        

    // },
];

const comingSoon = [
    {
        label: "Pdf Chatter",
        href:   "/",
        color:  "text-grey-700",
        

    },

    {
        label: "Background remover",
        href:   "/",
        color:  "text-grey-700",
        

    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
};

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false,
}: SidebarProps) => {
    const pathname = usePathname();


    return (

        <div className="space-y-4 py-4 flex flex-col h-full
            bg-[#111827] text-white">
                <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                        fill
                        alt="logo"
                        src="/virtuAILogo.png"
                        />
                        </div>
                        <h1 className={cn ("text-2xl font-bold", montserrat.className)}>
                            VirtuAI
                        </h1>
                </Link>
               
                <div className="space-y-1">
                    {routes.map((route) => (
                    <Link 
                      href={route.href} 
                      key={route.href}
                      className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                      pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                      )}
                      >
                        <div className="flex items-center flex-1">

                        <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                        {route.label}
                        </div>
                    </Link>
                    ))}
                </div>
                </div>
                <FreeCounter 
                isPro={isPro}
                apiLimitCount={apiLimitCount}
                
                />
                 <div className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                    Ai Bots Coming soon...
                </div>
                <div className="space-y-1">
                {comingSoon.map((route) => (
                    <div
                    key={route.href}
                    className={cn(
                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                    )}
                    >
                    <div className="flex items-center flex-1">
                        {/* <route.icon className={cn("h-5 w-5 mr-3", route.color)} /> */}
                        {route.label}
                    </div>
                    </div>
                ))}
                </div>


        </div>
    );
}

export default Sidebar;
