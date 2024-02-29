"use client"
import { useEffect, useState } from 'react';
import PostCard from '@/app/components/PostCard'
import { getPosts } from '~/services';

// Define the type of the post object
interface Post {
  title: string;
  node: string;
  // Add other properties as needed
}


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="divide-y  divide-gray-200 dark:divide-gray-70">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
       
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>

        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post?.title} post={post?.node} />
          ))}
        </div>
      </div>

      <ul></ul>
    </div>
  );
}
