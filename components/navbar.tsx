
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { useEffect, useState } from "react";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();


    return (
        <div className="flex items-center p-4">
            <Button variant="ghost" size="icon" className="md:hidden">
            </Button>
           <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Navbar;
