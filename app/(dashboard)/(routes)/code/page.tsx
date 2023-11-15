"use client";
import { APIResource } from 'openai/resource';

import OpenAI from 'openai';
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
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
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import ReactMarkdown from "react-markdown";
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';
import TypewriterComponent from 'typewriter-effect';
import Image from 'next/image';


const CodePage = () => {
const router = useRouter();
const proModal = useProModal();
const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: ""
    }
});

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);

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
                                src="/codingBot.png" // Update with your image path
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
                                            "Hey!, I'm your coding bot."
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
                                            "I'll be your Programmer today. Make a coding request below 👇"
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
                            placeholder="Simple toggle button using react hooks."
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
                {messages.length === 0 && !isLoading && (
                <Empty label="No conversation started." />
                )}
                <div className='flex flex-col gap-y-4'>
                    {messages.map((message) => (
                        <div 
                        key={message.content}
                        className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", 
                        message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                        >
                            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}


                           <ReactMarkdown 
                           components={{
                            pre: ({ node, ...props}) => (
                                <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>

                                    <pre {...props} />
                                </div>
                            ),
                            code: ({node, ...props}) => (
                                <code className='bg-black/10 rounded-lg p2' {...props}/>
                            ) 
                           }}
                           className='text-sm overflow-hidden leading-7'
                           >
                            {message.content || ""}
                            </ReactMarkdown>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default CodePage