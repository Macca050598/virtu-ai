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
import { useRouter} from "next/router";
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

const EmailMarketing = () => {
   
    const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const [selectedEmailType, setSelectedEmailType] = useState<string | null>(null);  // New state for tracking the selected email type

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailPurpose: "",
            tone: "",
            length: "",
            clickThrough: "",
            product: "",
            benefit1: "",
            benefit2: "",
            offer: "",
            email: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: JSON.stringify({
                    emailPurpose: values.emailPurpose,
                    tone: values.tone,
                    length: values.length,
                    clickThrough: values.clickThrough,
                    product: values.product,
                    benefit1: values.benefit1,
                    benefit2: values.benefit2,
                    offer: values.offer,
                    email: values.email
                })
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/emailMarketing", {
                messages: newMessages,
                templateType: selectedEmailType,
            });

            setMessages((current) => [response.data, ...current]);

            form.reset(); //resets the form after
        } catch (error: any) {

            if (error?.response?.status === 403) {
                proModal.onOpen();
              } else {
                toast.error("Something went wrong") }

        } finally {
          
        }
    };

    const renderForm = () => {
        if (selectedEmailType === 'Cold Outreach') {
            return (
                <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                >
                <FormField
                name="emailPurpose"
                render={({ field }) => (
                    <FormItem className="col-span-12">
                        <FormControl className="m-0 p-0">
                            <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        What would you like your email to be about ?
                    </label>
                        
                    <Input 
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    disabled={isLoading}
                    placeholder="I'm writing an email about how digital marketing..."
                    {...field}
                    />
                    </div>
                    </FormControl>
                    </FormItem>
                )}
                />
            <FormField
                    name="tone"
                    render={({ field }) => (
                        <FormItem className="col-span-6">
                            <FormControl className="m-0 p-0">
                            <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please select what tone you would like it written in
                    </label>
                                <select
                                    {...field}
                                    className="rounded-lg border w-full p-2 px-3 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
                                    disabled={isLoading}
                                >
                                    <option value="" disabled>Select tone of email</option>
                                    <option value="Friendly">Friendly</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Informal">Informal</option>
                                    <option value="Formal">Formal</option>
                                    <option value="Enthusiastic">Enthusiastic</option>
                                    <option value="Casual">Casual</option>
                                </select>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                name="length"
                render={({ field }) => (
                    <FormItem className="col-span-6">
                        <FormControl className="m-0 p-0">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        How many words would you like the email to be?
                    </label>
                        
                    <Input 
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    disabled={isLoading}
                    placeholder="50 words"
                    {...field}
                    />
                    </div>
                    </FormControl>
                    </FormItem>
                )}
                />
                {/* <FormField
                name="subjectLineBasis"
                render={({ field }) => (
                    <FormItem className="col-span-6">
                        <FormControl className="m-0 p-0">
                        
                    <Input 
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    disabled={isLoading}
                    placeholder="Subject line basis."
                    {...field}
                    />
                    </FormControl>
                    </FormItem>
                )}
                /> */}
                <FormField
                name="clickThrough"
                render={({ field }) => (
                    <FormItem className="col-span-6">
                        <FormControl className="m-0 p-0">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Choose a call to action
                    </label>
                    <Input 
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    disabled={isLoading}
                    placeholder="E.g. https://mjweb.ltd"
                    {...field}
                    />
                    </div>
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button className="col-span-6 lg:col-span-6 w-full mt-6" disabled={isLoading}> 
                    Generate
                </Button>
            </form>
                </Form>
            );
        }
        else if (selectedEmailType === 'Product Launch') {
            return (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
          <FormField
          name="product"
          render={({ field }) => (
              <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  What is your product ?
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="The product is a fidget spinner that..."
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
             <FormField
          name="benefit1"
          render={({ field }) => (
              <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefit #1 of product
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="Give a benefit of your product to the user"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
             <FormField
          name="benefit2"
          render={({ field }) => (
              <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefit #2 of product
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="Give a benefit of your product to the user"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
             <FormField
          name="offer"
          render={({ field }) => (
              <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  What is your offer ? 
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="i.e. $49/mo for the next 100 purchases"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
      <FormField
              name="tone"
              render={({ field }) => (
                  <FormItem className="col-span-6">
                      <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please select what tone you would like it written in
              </label>
                          <select
                              {...field}
                              className="rounded-lg border w-full p-2 px-3 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
                              disabled={isLoading}
                          >
                              <option value="" disabled>Select tone of email</option>
                              <option value="Friendly">Friendly</option>
                              <option value="Professional">Professional</option>
                              <option value="Informal">Informal</option>
                              <option value="Formal">Formal</option>
                              <option value="Enthusiastic">Enthusiastic</option>
                              <option value="Casual">Casual</option>
                          </select>
                          </div>
                      </FormControl>
                  </FormItem>
              )}
          />
          <FormField
          name="length"
          render={({ field }) => (
              <FormItem className="col-span-6">
                  <FormControl className="m-0 p-0">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  How many words would you like the email to be?
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="50 words"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
          <FormField
          name="clickThrough"
          render={({ field }) => (
              <FormItem className="col-span-6">
                  <FormControl className="m-0 p-0">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose a call to action
              </label>
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="E.g. https://mjweb.ltd"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
          <Button className="col-span-6 lg:col-span-6 w-full mt-6" disabled={isLoading}> 
              Generate
          </Button>
      </form>
          </Form>
            )
        }
        else if (selectedEmailType === 'Follow Up Reminder') {
            return (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
          <FormField
          name="email"
          render={({ field }) => (
              <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the original email you would like to create a reminder for
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="Enter your previous email..."
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
      <FormField
              name="tone"
              render={({ field }) => (
                  <FormItem className="col-span-6">
                      <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please select what tone you would like it written in
              </label>
                          <select
                              {...field}
                              className="rounded-lg border w-full p-2 px-3 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
                              disabled={isLoading}
                          >
                              <option value="" disabled>Select tone of email</option>
                              <option value="Friendly">Friendly</option>
                              <option value="Professional">Professional</option>
                              <option value="Informal">Informal</option>
                              <option value="Formal">Formal</option>
                              <option value="Enthusiastic">Enthusiastic</option>
                              <option value="Casual">Casual</option>
                          </select>
                          </div>
                      </FormControl>
                  </FormItem>
              )}
          />
          <FormField
          name="length"
          render={({ field }) => (
              <FormItem className="col-span-6">
                  <FormControl className="m-0 p-0">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  How many words would you like the email to be?
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="50 words"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
          <Button className="col-span-6 lg:col-span-6 w-full mt-6" disabled={isLoading}> 
              Generate
          </Button>
      </form>
          </Form>
            )
        }
        else if (selectedEmailType === 'Welcome Email') {
            return (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
          <FormField
          name="email"
          render={({ field }) => (
              <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  What are you welcoming users to ?
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="Explain what the reader should expect from joining this email list. i.e. discounts, access to exclusive content"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
      <FormField
              name="tone"
              render={({ field }) => (
                  <FormItem className="col-span-6">
                      <FormControl className="m-0 p-0">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please select what tone you would like it written in
              </label>
                          <select
                              {...field}
                              className="rounded-lg border w-full p-2 px-3 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
                              disabled={isLoading}
                          >
                              <option value="" disabled>Select tone of email</option>
                              <option value="Friendly">Friendly</option>
                              <option value="Professional">Professional</option>
                              <option value="Informal">Informal</option>
                              <option value="Formal">Formal</option>
                              <option value="Enthusiastic">Enthusiastic</option>
                              <option value="Casual">Casual</option>
                          </select>
                          </div>
                      </FormControl>
                  </FormItem>
              )}
          />
          <FormField
          name="length"
          render={({ field }) => (
              <FormItem className="col-span-6">
                  <FormControl className="m-0 p-0">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  How many words would you like the email to be?
              </label>
                  
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="50 words"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
              <FormField
          name="clickThrough"
          render={({ field }) => (
              <FormItem className="col-span-6">
                  <FormControl className="m-0 p-0">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose a call to action
              </label>
              <Input 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              disabled={isLoading}
              placeholder="E.g. https://mjweb.ltd"
              {...field}
              />
              </div>
              </FormControl>
              </FormItem>
          )}
          />
          <Button className="col-span-6 lg:col-span-6 w-full mt-6" disabled={isLoading}> 
              Generate
          </Button>
      </form>
          </Form>
            )
        }
    }

    return (
        <div>
             <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-3">
                        <div className="p-2 w-fit rounded-md bg-violet-500/10">
                            <Image 
                                src="/emailBot.png" // Update with your image path
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
                                            "Hey!, I'm your email marketing bot."
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
                                            "Let's write some email together 👇"
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

            {/* New section for email type selection */}
            <div className="px-10 pb-20">
            <div className="mb-8 space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-center"> Email Types
                    </h2>
                    <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                        Choose what type of email you would like the bot to make... 
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['Cold Outreach', 'Follow Up Reminder' , 'Product Launch', 'Welcome Email' ].map(emailType => (
                        <div key={emailType} className="bg-[#192339] border-none text-white p-4 cursor-pointer" 
                            onClick={() => setSelectedEmailType(emailType)}>
                            <div className="flex items-center gap-x-2">
                                <div className="text-lg">{emailType}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Render the selected form */}
            <div className="px-4 lg:px-8">
                {renderForm()}
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
    );
}

export default EmailMarketing;
