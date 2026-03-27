import {getPageQuery, recentPostsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import PageBuilder from '@/app/components/PageBuilder'

export default async function Page() {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home'},
  })

  if (!page) {
    return (
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Homepage Not Found</h1>
          <p className="text-gray-600 mb-8">
            No homepage content found in Sanity Studio. Create a page with slug "home" to display content here.
          </p>
          <a
            href="/studio"
            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    )
  }

  // Fetch posts if there are any recentPosts blocks on the page
  let posts = null
  if (page.pageBuilder?.some((block) => block._type === 'recentPosts')) {
    // Find the maximum limit from all recentPosts blocks
    const maxLimit =
      page.pageBuilder
        .filter((block) => block._type === 'recentPosts')
        .reduce((max, block) => Math.max(max, (block as any).limit || 3), 3) || 3

    const {data} = await sanityFetch({
      query: recentPostsQuery,
      params: {limit: maxLimit - 1},
    })
    posts = data
  }

  return <PageBuilder page={page} posts={posts} />
}
