"use client";

import { Tweet } from "react-tweet";

export default function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-foreground mx-auto mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            From developers worldwide
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl text-lg leading-relaxed sm:text-lg">
            Real feedback from developers and teams experimenting with Extension.js.
          </p>
          <div className="w-full max-w-xl text-left [&_article]:mx-0 [&_article]:text-left [&_article_*]:text-left mt-6">
            <Tweet
              id="1785325069658648996"
              components={{
                MediaImg: ({ alt, ...props }) => (
                  <img
                    {...props}
                    alt={alt}
                    className="hidden"
                    height={1}
                    width={1}
                  />
                ),
              }}
            />
          </div>
          <style>{`
            #testimonials [class*="mediaWrapper"],
            #testimonials [class*="mediaContainer"] {
              display: none !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
