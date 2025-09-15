import PostCard from '@/app/components/PostCard'
import { Pagination } from '@/app/components'
import { getPaginatedPosts } from '~/services';

export default async function Home() {
  const page = 1;
  const pageSize = 5;
  const { edges, totalCount } = await getPaginatedPosts({ page, pageSize });

  return (
    <div className="divide-y  divide-gray-200 dark:divide-gray-70">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl pb-2 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>

        <div className="lg:col-span-8 col-span-1">
          {edges.map((edge: any) => (
            <PostCard key={edge.node.slug} post={edge.node} />
          ))}
        </div>
        <Pagination currentPage={page} totalCount={totalCount} basePath="/p" pageSize={5} />
      </div>
    </div>
  );
}
