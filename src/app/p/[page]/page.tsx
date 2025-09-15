import PostCard from '@/app/components/PostCard'
import { Pagination } from '@/app/components'
import { getPaginatedPosts } from '~/services';

type PageProps = { params: { page: string } };

export default async function PagedPosts({ params }: PageProps) {
  const pageParam = Number(params.page);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
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
        <Pagination currentPage={page} totalCount={totalCount} basePath="/p" />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const pageSize = 5;
  // We need total count to compute number of pages. Fetch first page to get aggregate.
  const { totalCount } = await getPaginatedPosts({ page: 1, pageSize });
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}


