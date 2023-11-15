"use client";
import { APIResource } from 'openai/resource';

import OpenAI from 'openai';
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter} from "next/navigation";
import { useState } from "react";
import { captureRejectionSymbol } from 'events';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import ReactMarkdown from "react-markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';
import TypewriterComponent from 'typewriter-effect';

const ImagePage = () => {
const router = useRouter();
const proModal = useProModal();
const [images, setImages] = useState<string[]>([]);

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: "",
        amount: "1",
        resolution: "512x512"
    }
});

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: { url: string}) => image.url);

            setImages(urls);

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
                                src="/imageBot.png" // Update with your image path
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
                                            "Hey!, I'm your image bot."
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
                                            "Make a request below 👇 and I'll make you an image."
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
                            <FormItem className="col-span-12 lg:col-span-6">
                                <FormControl className="m-0 p-0">
                                
                            <Input 
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            disabled={isLoading}
                            placeholder="A picture of a horse in the swiss alps"
                            {...field}
                            />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="amount"
                        render={( { field }) => (
                            <FormItem className='col-span-12 lg:col-span-2'>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {amountOptions.map((option) => (
                                        <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        >
                                            {option.label}

                                        </SelectItem>
                                       ))} 
                                    </SelectContent>

                                </Select>
                            </FormItem>
                        )}
                        />
                           <FormField 
                        control={form.control}
                        name="resolution"
                        render={( { field }) => (
                            <FormItem className='col-span-12 lg:col-span-2'>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {resolutionOptions.map((option) => (
                                        <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        >
                                            {option.label}

                                        </SelectItem>
                                       ))} 
                                    </SelectContent>

                                </Select>
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
                    <div className="p-20">
                        <Loader />
                    </div>
                )}
                {images.length === 0 && !isLoading && (
                <Empty label="No images generated." />
                )}
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
         {images.map((src) => (
            <Card 
            key={src}
            className="rounded-lg overflow-hidden"
            >
            <div className='relative aspect-square'>
                <Image 
                alt="image"
                fill
                src={src}
                />
                </div>
                <CardFooter className='p-2'>
                    <Button 
                    onClick={() => window.open()}
                    variant="secondary" 
                    className='w-full'>
                        <Download className='h-4 w-4 mr-2' />
                        Download

                    </Button>

                </CardFooter>
            </Card>
         ))}
           </div>
            </div>
            </div>
        </div>
    );
}

export default ImagePage