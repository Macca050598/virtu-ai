"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("da56d478-29ac-4be7-a99e-1322ab4a1e21")
    }, []);

    return null;
}