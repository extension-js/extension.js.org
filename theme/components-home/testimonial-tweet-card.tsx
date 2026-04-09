'use client'

import {Tweet} from 'react-tweet'

import {CardBody, CardContainer, CardItem} from '../components/ui/three-d-card'

const TESTIMONIAL_TWEET_ID = '1785325069658648996'
const TESTIMONIAL_TWEET_URL = `https://x.com/i/status/${TESTIMONIAL_TWEET_ID}`

export default function TestimonialTweetCard() {
  return (
    <CardContainer containerClassName="w-full py-0" className="w-full max-w-xl">
      <CardBody className="h-auto w-full">
        <CardItem translateZ={36} className="w-full">
          <a
            href={TESTIMONIAL_TWEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testimonial-tweet-link
            className="text-foreground focus-visible:ring-ring mt-6 block w-full cursor-pointer rounded-xl text-left !no-underline outline-none hover:!no-underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:!no-underline"
          >
            <span className="sr-only">Open this post on X</span>
            <div className="testimonial-tweet-card pointer-events-none w-full text-left [&_article]:mx-0 [&_article]:text-left [&_article_*]:text-left">
              <Tweet
                id={TESTIMONIAL_TWEET_ID}
                components={{
                  MediaImg: ({alt, ...props}) => (
                    <img
                      {...props}
                      alt={alt}
                      className="hidden"
                      height={1}
                      width={1}
                    />
                  )
                }}
              />
            </div>
          </a>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}
