"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter} from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam  } from "openai/resources/chat/completions";
import { captureRejectionSymbol } from 'events';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { useProModal } from "@/hooks/use-pro-modal";
import toast from 'react-hot-toast';
import TypewriterComponent from "typewriter-effect";
import Image from "next/image";

const MusicPage = () => {
const router = useRouter();
const proModal = useProModal();
const [music, setMusic] = useState<string>();

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: ""
    }
});

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio)
            form.reset(); //resets the form after
        } catch (error: any) {

            if (error?.response?.status === 403) {
                proModal.onOpen();
              } else {
                toast.error("Something went wrong") }

        } finally {
            router.refresh();
        }
    };

    return (
        <div>
           <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-3">
                        <div className="p-2 w-fit rounded-md bg-violet-500/10">
                            <Image 
                                src="/musicBot.png" // Update with your image path
                                alt="Your Alt Text" 
                                width={200} // Update with your desired size
                                height={200} // Update with your desired size
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">
                                <TypewriterComponent
                                    options={{
                                        strings: [
                                            "Hey!, I'm your music bot."
                                        ],
                                        autoStart: true,
                                        loop: false,
                                        deleteSpeed: 50000000,
                                    }}
                                />
                                 <TypewriterComponent 
                                    options={{
                                        strings: [
                                            "",
                                            "Make a request below 👇 and I'll create you a beat."
                                        ],
                                        autoStart: true,
                                        loop: false,
                                        deleteSpeed: 50000000,
                                    }}
                                />
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                *Please allow upto 60 seconds for your reply*
                            </p>
                        </div>
                    </div>
            <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                        <FormField
                        name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                
                            <Input 
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            disabled={isLoading}
                            placeholder="Piano Solo"
                            {...field}
                            />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}> 
                            Generate
                            </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                {!music && !isLoading && (
                <Empty label="No music generated." />
                )}
             {music && (
                <audio controls className="w-full mt-8">
                    <source src={music} />
                </audio>
             )}
            </div>
            </div>
        </div>
    );
}

export default MusicPage