"use client";
import { ChangeEvent, useState } from 'react';
import * as deepai from 'deepai';
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import { formSchema } from './constants';
import { Loader } from '@/components/loader';
import TypewriterComponent from 'typewriter-effect';
import { useRouter} from "next/navigation";
import Image from 'next/image';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';


type Models = deepai.Models;


const transformationOptions = [
    { label: 'Text to Image', value: 'text2img' },
    { label: 'Stable Diffusion', value: 'stable-diffusion' },
    { label: 'Cute Creature Generator', value: 'cute-creature-generator' },
    { label: 'Fantasy World Generator', value: 'fantasy-world-generator' },
    { label: 'Cyberpunk Generator', value: 'cyberpunk-generator' },
    { label: 'Anime Portrait Generator', value: 'anime-portrait-generator' },
    { label: 'Old Style Generator', value: 'old-style-generator' },
    { label: 'Renaissance Painting Generator', value: 'renaissance-painting-generator' },
    { label: 'Abstract Painting Generator', value: 'abstract-painting-generator' },
    { label: 'Impressionism Painting Generator', value: 'impressionism-painting-generator' },
    { label: 'Surreal Graphics Generator', value: 'surreal-graphics-generator' },
    { label: '3D Objects Generator', value: '3d-objects-generator' },
    { label: 'Origami 3D Generator', value: 'origami-3d-generator' },
    { label: 'Hologram 3D Generator', value: 'hologram-3d-generator' },
    { label: '3D Character Generator', value: '3d-character-generator' },
    { label: 'Watercolor Painting Generator', value: 'watercolor-painting-generator' },
    { label: 'Pop Art Generator', value: 'pop-art-generator' },
    { label: 'Contemporary Architecture Generator', value: 'contemporary-architecture-generator' },
    { label: 'Future Architecture Generator', value: 'future-architecture-generator' },
    { label: 'Watercolor Architecture Generator', value: 'watercolor-architecture-generator' },
    { label: 'Fantasy Character Generator', value: 'fantasy-character-generator' },
    { label: 'Steampunk Generator', value: 'steampunk-generator' },
    { label: 'Logo Generator', value: 'logo-generator' },
    { label: 'Pixel Art Generator', value: 'pixel-art-generator' },
    { label: 'Street Art Generator', value: 'street-art-generator' },
    { label: 'Surreal Portrait Generator', value: 'surreal-portrait-generator' },
    { label: 'Anime World Generator', value: 'anime-world-generator' },
    { label: 'Fantasy Portrait Generator', value: 'fantasy-portrait-generator' },
    { label: 'Comics Portrait Generator', value: 'comics-portrait-generator' },
    { label: 'Cyberpunk Portrait Generator', value: 'cyberpunk-portrait-generator' }
];

const ImageEditorPage = () => {
    const router = useRouter();
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);
    const [resultUrls, setResultUrls] = useState<string[]>([]);
    const [prompt, setPrompt] = useState('');
    const [selectedOption, setSelectedOption] = useState(transformationOptions[0].value);

    

    const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
    };

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleProcess = async () => {
        if (!prompt || !selectedOption) return;
    
        setLoading(true);
        try {
            const model = selectedOption as Models;
            const result = await deepai.callStandardApi(model, {
                text: prompt,
            });
            setResultUrls(prevResultUrls => [result.output_url, ...prevResultUrls]);

               // Check the response status for 403 specifically
               if (result.status === 403) {
                proModal.onOpen();
                setLoading(false);
                return;
            }
        } catch (error: any) {
            console.error(error); // Log the error to understand its structure
    
            if (axios.isAxiosError(error) && error.response) {
                // If it's an axios error, it will have a response object
                if (error.response.status === 403) {
                    proModal.onOpen();
                } else {
                    toast.error(error.response.data.message || "Something went wrong");
                }
            } else {
                // If it's not an axios error or doesn't have a response, log a general error
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "", // Assuming this is the default value
        }
    });
    

    const isLoading = form.formState.isSubmitting;

    return (
        <div>
            <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-3">
                        <div className="p-2 w-fit rounded-md bg-violet-500/10">
                            <Image 
                                src="/advancedImage.png" // Update with your image path
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
                                            "Hey!, I'm your advanced image bot."
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
                                            "Let's make some cool images together."
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
      
        <Form {...form}>  {/* if form is being used, otherwise omit this line and its closing tag */}
            <div className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                 {/* Prompt Input */}
                 <FormItem className='col-span-12 lg:col-span-5'>
                    <FormControl className="m-0 p-0">
                        <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enter a prompt:
                    </label>
                        <Input
                            className="w-full p-2 border rounded"
                            disabled={isLoading}
                            placeholder="A cat sat on a wall"
                            value={prompt}
                            onChange={handlePromptChange}
                        />
                        </div>
                    </FormControl>
                </FormItem>

                {/* Transformation Options Dropdown */}
                <FormItem className='col-span-12 lg:col-span-4'>
                <FormControl className="m-0 p-0">
                <div>
                    {/* Label */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Choose style of your picture
                    </label>
                    <select value={selectedOption} onChange={handleOptionChange} className="w-full p-2 border rounded">
                        {transformationOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </FormControl>
        </FormItem>
    
               
                 
                {/* Process Button */}
                
                <FormItem className="col-span-12 lg:col-span-3 w-full flex items-center mt-5">
                    <Button className="w-full" disabled={!prompt || loading} onClick={handleProcess}>
                        Process
                    </Button>
                </FormItem>
    
                
                {loading &&    <div className="col-span-12 p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>}
                {resultUrls.map((resultUrl, index) => (
                    <div className="col-span-12" key={index}>
                        <p>Result {index + 1}:</p>
                        <img src={resultUrl} alt={`Generated ${index + 1}`} />
                    </div>
                ))}
            </div>
        </Form>  {/* if form is being used */}
    </div>
    
    );
};

export default ImageEditorPage;
