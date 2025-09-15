import React from "react";
import { useRouter } from "next/navigation";
import {
  PostDetail,
  Loader,
} from "@/app/components";
import { getPosts, getPostDetails } from "~/services"
// import { AdjacentPosts } from "../../sections";

// Fetch data at build time
const Page = async({ params }: { params: { slug: string } }) => {
  const data = await getPostDetails(params.slug);
  // return {
  //   props: {
  //     post: data,
  //   },
  // };

  return (
    <>
      <div className="container justify-center mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-12">
            <PostDetail post={data} />
         
          </div>
        </div>
      </div>
    </>
  );
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
// export async function getStaticPaths() {
//   const posts = await getPosts();
//   return {
//     paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
//     fallback: true,
//   };
// }

export async function generateStaticParams() {
  const posts = await getPosts();
 
  return posts.map((post: any) => post)
}

export default Page;