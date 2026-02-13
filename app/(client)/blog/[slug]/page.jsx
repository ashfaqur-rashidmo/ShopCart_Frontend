import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const getLatestBlogs = async () => {
  const res = await fetch(
    "http://localhost:5000/api/blogs/latest",
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
};


const BlogPage = async ({ params }) => {

  const latestBlogs = await getLatestBlogs();
  const {slug} = await params;
  const res = await fetch(
    `http://localhost:5000/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Blog not found</div>;
  }

  const data = await res.json();
  const blog = data.data;

  if (!blog) return <div>Blog not found</div>;

  return (
   <section className='max-w-7xl mx-auto px-4 py-10'>
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>

      {/* left blog content */}
      <div className='lg:col-span-8'>

        <div className='rounded-xl overflow-hidden mb-6'>
          <Image 
           src={blog.mainImage}
           alt={blog.title}
           width={1200}
           height={600}
           className='w-full sm:h-[380px] object-cover'
          />
        </div>

        <div className='flex gap-4 text-sm text-gray-500 mb-3'>
         <span className='font-semibold text-shop_dark_green tracking-wider'>
          {blog.blogCategories?.[0]}
         </span>

         <span>Admin</span>
         <span>{new Date(blog.publishedAt).toDateString()}</span>
        </div>

         {/* Title */}
        <h1 className='text-2xl sm:text-3xl font-bold mb-4'>{blog.title}</h1>
        {/* body */}
        <p className='text-gray-700 leading-7 text-sm sm:text-base'>{blog.body}</p>
      </div>

      {/* right sidebar content */}
      <aside className='lg:col-span-4 space-y-6'>

        {/* categories */}
        <div className='border rounded-xl p-5'>
          <h3 className='font-semibold mb-4'>Blog Categories</h3>

          <ul>
          {blog.blogCategories?.map((category, index) => (
            <li key={index} className='flex justify-between'>
              <span>{category}</span>
              <span>(1)</span>
            </li>
          ))}
          </ul>
        </div>

        {/* recent blogs */}
  <div className='border rounded-xl p-5'>
  <h3 className='font-semibold mb-4'>Recent Blogs</h3>

  <div className='space-y-4'>
    {latestBlogs.map((item) => (
      <Link
        key={item._id}
        href={`/blog/${item.slug}`}
        className='flex gap-4 items-center group'
      >
        <Image
          src={item.mainImage}
          alt={item.title}
          width={80}
          height={80}
          className='object-cover rounded-md transition-transform duration-300 group-hover:scale-105'
        />

        <p className='text-sm font-medium line-clamp-2 group-hover:text-shop_dark_green transition'>
          {item.title}
        </p>
      </Link>
    ))}
  </div>
</div>

      </aside>
      </div>
      </section>
  );
};

export default BlogPage;
