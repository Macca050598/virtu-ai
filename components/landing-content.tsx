import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TooltipProvider } from "./ui/tooltip";
import PricingTable from "./pricing-table";
import FancyTestimonialsSlider from "./fancy-testimonial-slider";

 
  const testimonials = [
  {
      img: TestimonialImg01,
      quote: "This app speeds up marketing work so much for me, really happy!",
      name: "Mark",
      role: "Digital Marketer"
  },
  {
     img: TestimonialImg01,
      quote: "Using this app has greatly improved my business efficiency. Highly recommend!",
      name: "John",
      role: "Business Owner"
  },
  {
    img: TestimonialImg01,
      quote: "The design features in this app are intuitive and have greatly enhanced my workflow.",
      name: "Sarah",
      role: "Designer"
  },
  {
    img: TestimonialImg01,
      quote: "This app has become an essential tool in my development process. Love it!",
      name: "Alex",
      role: "Developer"
  },
  {
    img: TestimonialImg01,
      quote: "As a freelancer, this app has helped me stay organized and save time. Fantastic!",
      name: "Emily",
      role: "Freelancer"
  },
  {
    img: TestimonialImg01,
      quote: "I use this app for educational purposes and it has been incredibly helpful for my students.",
      name: "Mike",
      role: "Teacher"
  },
  {
    img: TestimonialImg01,
      quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
      name: 'Jessie J',
      role: 'Acme LTD'
  },
  {
    img: TestimonialImg01,
      quote: "Having the power to capture user feedback is revolutionary. Even if a participant abandons the sign-up process midway, their valuable input remains intact.",
      name: 'Nick V',
      role: 'Malika Inc.'
  },
  {
    img: TestimonialImg01,
      quote: "The functionality to capture responses is a true game-changer. Even if a user becomes fatigued during sign-up and abandons the process, their information remains stored.",
      name: 'Amelia W',
      role: 'Panda AI'
  }
]


const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For small side projects.',
      quota: 10,
      features: [
        {
          text: '5 pages per PDF',
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '4MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For larger projects with higher needs.',
      quota: '£10 per month',
      features: [
        {
          text: '25 pages per PDF',
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '16MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
  ]

  export const metadata = {
    title: 'Fancy Testimonials Slider - Cruip Tutorials',
    description: 'Page description',
  }
  
  import TestimonialImg01 from '@/public/virtuAiLogo.png'
 


export const LandingContent = () => {
    return (
        <>
           <div>
            <div className="relative isolate" id="about">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }} 
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calculate(50%-30rem)] sm:w-[72.1875rem]" 
                    />
                </div>
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                    <div className="-m-2 rounded-xl bg-grey-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <Image 
                        src='/Dashboard.png'
                        alt='Product Preview'
                        width={1700}
                        height={950} 
                        quality={100}
                        className="rounded-md p-2 sm:p-8 md:p-8 shadow-2xl ring-1 ring-gray-900/10"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div 
  aria-hidden="true" 
  className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
>
  <div 
    style={{
      clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
    }} 
    className="relative left-1/2 transform -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 w-full max-w-[36.125rem] sm:max-w-[72.1875rem]" 
  />
</div>


           </div>

            <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
                <div className="mb-12 px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">

                        </h2>
                    </div>
                </div>

            </div>


            <h2 className="text-center text-4xl text-white font-extrabold mb-10" id="price">
                Pricing
            </h2>
            <PricingTable />       


          <div className="px-10 pb-20 pt-60" id="testimonials">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div 
              aria-hidden="true" 
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div 
                style={{
                  clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                }} 
                className="relative left-1/2 transform -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 w-full max-w-[36.125rem] sm:max-w-[72.1875rem]" 
              />
            </div>

            <FancyTestimonialsSlider testimonials={testimonials} />

            </div>          

    
        </>

    
        
    );
};

export default LandingContent;