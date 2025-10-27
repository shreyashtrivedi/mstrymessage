// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Autoplay from 'embla-carousel-autoplay';
// import messages from '@/messages.json';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

// export default function Home() {
//   return (
//     <>
//       {/* Main content */}
//       <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
//         <section className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold">
//             Dive into the World of Anonymous Feedback
//           </h1>
//           <p className="mt-3 md:mt-4 text-base md:text-lg">
//             True Feedback - Where your identity remains a secret.
//           </p>
//         </section>

//         {/* Carousel for Messages */}
//         <Carousel
//           plugins={[Autoplay({ delay: 2000 })]}
//           className="w-full max-w-lg md:max-w-xl"
//         >
//           <CarouselContent>
//             {messages.map((message, index) => (
//               <CarouselItem key={index} className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{message.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
//                     <Mail className="flex-shrink-0" />
//                     <div>
//                       <p>{message.content}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {message.received}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </main>

//       {/* Footer */}
//       <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
//         © 2023 True Feedback. All rights reserved.
//       </footer>
//     </>
//   );
// }











import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <h1 className="text-5xl font-bold text-center mb-6">
        Welcome to Next.js!
      </h1>
      <p className="text-xl text-center max-w-xl">
        Get started by editing <code className="bg-gray-100 px-1 rounded">src/app/page.tsx</code>
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <a
          href="https://nextjs.org/docs"
          className="rounded-xl border p-6 hover:bg-gray-100 transition"
          target="_blank"
        >
          <h2 className="text-2xl font-semibold">Docs &rarr;</h2>
          <p className="mt-2 text-gray-600">Find in-depth information about Next.js features and API.</p>
        </a>
        <a
          href="https://nextjs.org/learn"
          className="rounded-xl border p-6 hover:bg-gray-100 transition"
          target="_blank"
        >
          <h2 className="text-2xl font-semibold">Learn &rarr;</h2>
          <p className="mt-2 text-gray-600">Learn about Next.js in an interactive course with quizzes!</p>
        </a>
        <a
          href="https://github.com/vercel/next.js/tree/canary/examples"
          className="rounded-xl border p-6 hover:bg-gray-100 transition"
          target="_blank"
        >
          <h2 className="text-2xl font-semibold">Examples &rarr;</h2>
          <p className="mt-2 text-gray-600">Discover and deploy boilerplate example Next.js projects.</p>
        </a>
      </div>
    </main>
  );
}
