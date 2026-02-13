import { Facebook, Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SocialLinks = [
    {
        title: "Facebook",
        href: "https://www.facebook.com",
        icon: <Facebook className='h-5 w-5'/>
    },
    {
        title: "Youtube",
        href: "https://www.youtube.com",
        icon: <Youtube className='h-5 w-5'/>
    },
    {
        title: "Twitter",
        href: "https://www.twitter.com",
        icon: <Twitter className='h-5 w-5'/>
    },
    {
        title: "LinkedIn",
        href: "https://www.LinkedIn.com",
        icon: <Linkedin className='h-5 w-5'/>
    },
    {
        title: "Github",
        href: "https://www.github.com",
        icon: <Github className='h-5 w-5'/>
    },
]

const SocialMedia = ({className}) => {

  return (
    <div>
      <TooltipProvider>
        <div className={cn("flex items-center gap-3.5",className)}>
          {SocialLinks?.map((item)=>(
            <Tooltip key={item?.title}>
               <TooltipTrigger asChild>
                <Link href={item?.href} className={cn("p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect")}>
                {item?.icon}
                </Link>
                </TooltipTrigger>
                <TooltipContent className={cn("bg-white text-darkColor font-semibold")}>
                  {item?.title}
                  </TooltipContent> 
            </Tooltip>
          ))}  
        </div>
        </TooltipProvider>  
    </div>
  )
}

export default SocialMedia