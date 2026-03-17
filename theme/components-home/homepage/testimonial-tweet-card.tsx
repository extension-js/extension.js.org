'use client'

import {Tweet} from 'react-tweet'

import {
  CardBody,
  CardContainer,
  CardItem
} from '../../components/ui/three-d-card'

export default function TestimonialTweetCard() {
  return (
    <CardContainer containerClassName="w-full py-0" className="w-full max-w-xl">
      <CardBody className="h-auto w-full">
        <CardItem translateZ={36} className="w-full">
          <div className="testimonial-tweet-card mt-6 w-full text-left [&_article]:mx-0 [&_article]:text-left [&_article_*]:text-left">
            <Tweet
              id="1785325069658648996"
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
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}
