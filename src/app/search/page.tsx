import PostCard from '@/app/components/PostCard'
import { searchPosts } from '~/services'

type SearchPageProps = {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = (searchParams.q || "").trim();
  const edges = q ? await searchPosts(q) : [];

  return (
    <div className="divide-y  divide-gray-200 dark:divide-gray-70">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl pb-2 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {q ? `Search results for “${q}”` : 'Search'}
        </h1>

        {!q && (
          <p className="text-gray-600">Type a query in the search bar.</p>
        )}

        {q && edges.length === 0 && (
          <p className="text-gray-600">No results found.</p>
        )}

        <div className="lg:col-span-8 col-span-1">
          {edges.map((edge: any) => (
            <PostCard key={edge.node.slug} post={edge.node} />
          ))}
        </div>
      </div>
    </div>
  )
}


