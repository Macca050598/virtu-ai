import * as z from "zod";

export const formSchema = z.object({
    emailPurpose: z.string().min(0, {
        message: "",
    }),
    tone: z.string().min(0, {
        message: "",
    }),
    length: z.string().min(0, {
        message: "",
    }),
    clickThrough: z.string().min(0, {
        message: "",
    }),
    product: z.string().min(0, {
        message: "",
    }),
    benefit1: z.string().min(0, {
        message: "",
    }),
    benefit2: z.string().min(0, {
        message: "",
    }),
    offer: z.string().min(0, {
        message: "",
    }),
    email: z.string().min(0, {
        message: "",
    }),
});