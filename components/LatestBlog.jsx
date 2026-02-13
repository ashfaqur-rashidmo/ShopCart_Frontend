import React from 'react'
import { Title } from './Text'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import dayjs from "dayjs"

const getLatestBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/latest`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
};

const LatestBlog = async() => {
  const blogs = await getLatestBlogs();
 
  return (
    <div className='mb-10 lg:mb-20'>
      <Title>Latest Blog</Title>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5'>

      {blogs?.map((blog)=>(
        <div key={blog?._id} 
        className='rounded-lg overflow-hidden bg-white border border-transparent hover:border-shop_dark_green hoverEffect'>

         {blog?.mainImage && 
         (
         <Link href={`/blog/${blog?.slug}`}>

          <Image 
          src={blog?.mainImage} 
          alt='blogImage' 
          width={500} 
          height={300} 
          className='w-full max-h-80 object-cover'/>
         </Link>
         )}

         <div className='bg-shop_light_bg p-5'>
          <div className='text-xs flex items-center gap-5'>
            <div className='flex items-center relative group cursor-pointer'>

              {blog?.blogcategories?.map((item,index)=>(
                <p key={index} className='font-semibold text-shop_dark_green tracking-wider'>{item?.title}</p>
              ))}
              <span className='absolute left-0 -bottom-1.5 bg-lightColor/20 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect'/>
            </div>
            <p className='flex items-center gap-1 text-lightColor relative group hover:cursor-pointer'>
              <Calendar size={15}/>{" "}
              {dayjs(blog.publishedAt).format("MMMM D","YYYY")}
             <span className='absolute left-0 -bottom-1.5 bg-lightColor/20 inline-block w-full h-0.5 group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect'/>
            </p>
          </div>
          
            <Link href={`/blog/${blog?.slug}`} className='text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect'>{blog?.title}</Link>
          
         </div>
        </div>
      ))}
      
      </div>  
    </div>
  )
}

export default LatestBlog