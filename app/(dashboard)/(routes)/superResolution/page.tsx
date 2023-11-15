"use client";
import { SetStateAction, useState, ChangeEvent } from 'react';
import * as deepai from 'deepai';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import { formSchema } from './constants';
import { Loader } from '@/components/loader';
import ImageCard from '@/components/image-card';
import { useRouter} from "next/navigation";
import TypewriterComponent from 'typewriter-effect';
import Image from 'next/image';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';
import OpenAI from 'openai';
import axios from "axios";

import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";

import { ChatCompletionMessageParam  } from "openai/resources/chat/completions";
import { captureRejectionSymbol } from 'events';
import { Empty } from '@/components/empty';

import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';



const ImageEditorPage = () => {
  const router = useRouter();
  const proModal = useProModal();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [resultUrls, setResultUrls] = useState<string[]>([]);
    const [prompt, setPrompt] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files && event.target.files[0];
      setFile(selectedFile ? selectedFile : null);
    };

 
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          prompt: "", // Assuming this is the default value
      }
  });
   

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
        // Create a new FileReader instance
        const reader = new FileReader();

        // Define the onload callback
        reader.onload = async (event) => {
            if (event.target === null) {
                console.error('Event target is null');
                setLoading(false);
                return;
            }
        
            try {
                // The result property contains the Data URL (Base64 encoded string of the file)
                const dataUrl = event.target.result;
      
                // Check if the result is a string before proceeding
                if (typeof dataUrl === 'string') {
                    // Send a POST request to the API route
                    const response = await fetch('/api/superResolution', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ image: dataUrl }),
                    });

                    // Check the response status for 403 specifically
                    if (response.status === 403) {
                        proModal.onOpen();
                        setLoading(false);
                        return;
                    }
                    
                    // Check for other non-ok responses
                    if (!response.ok) {
                        console.error(`Error: ${response.statusText}`);
                        setLoading(false);
                        return;
                    }

                    // Parse the response data and update the resultUrls state
                    const responseData = await response.json();
                    setResultUrls(prevResultUrls => [responseData.output_url, ...prevResultUrls]);
                } else {
                    console.error('Failed to read the file as a Data URL');
                }
            } catch (error) {
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
                router.refresh();
            }
        };

        // Start reading the file as a Data URL
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error:', error);
        setLoading(false);
    }
};

  
    return (
      <div>
        <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-3">
                        <div className="p-2 w-fit rounded-md bg-violet-500/10">
                            <Image 
                                src="/superResBot.png" // Update with your image path
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
                                            "Hey!, I'm your image resolution bot."
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
                                            "Upload an image below 👇 and I'll increase the quality."
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

       <Form {...form}>            
       <div className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                 {/* Prompt Input */}
                 <FormItem className='col-span-12 lg:col-span-6'>
                    <FormControl className="m-0 p-0">
                        <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Choose an Image:
                    </label>
        {/* File Input */}
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-12 lg:col-span-6 mt-3'>
                <FormControl className="m-0 p-0">
                <div>
        {/* Upload Button */}
                    <Button onClick={handleUpload} disabled={!file || loading} className="w-full">
                      Upload and Process
                    </Button>
                </div>
                    </FormControl>
                </FormItem>
                <div className="space-y-4 mt-4">
                {loading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                </div>
                {resultUrls.map((resultUrl, index) => (
                  <div className='col-span-12' key={index}>
                    {/* <p>Result {index + 1}:</p>
                    <img src={resultUrl} alt={`Processed ${index + 1}`} /> */}
                    <ImageCard imageUrl={resultUrl} />
                  </div>
                ))}
              </div>
            </Form>  {/* if form is being used */}
      </div>
    );
};
  
export default ImageEditorPage;
