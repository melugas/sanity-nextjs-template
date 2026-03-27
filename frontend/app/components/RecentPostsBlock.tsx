import Link from 'next/link'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {sanityFetch} from '@/sanity/lib/live'
import {recentPostsQuery} from '@/sanity/lib/queries'
import {RecentPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import Avatar from '@/app/components/Avatar'
import {dataAttr} from '@/sanity/lib/utils'

/**
 * RecentPostsBlock component for the PageBuilder system.
 * Fetches and displays a configurable number of recent blog posts.
 *
 * Features:
 * - Configurable section title
 * - Configurable post limit (1-12)
 * - Post excerpt with line clamping
 * - Author avatar and name
 * - Formatted publish date
 * - Hover effects
 *
 * @component
 * @example
 * // Used within PageBuilder - not called directly
 * <RecentPostsBlock block={recentPostsBlock} index={1} pageType="page" pageId="abc123" />
 */

type RecentPostsBlockProps = {
  block: ExtractPageBuilderType<'recentPosts'>
  index: number
  pageType: string
  pageId: string
}

export default async function RecentPostsBlock({block}: RecentPostsBlockProps) {
  const {sectionTitle, limit = 3} = block

  const {data: posts} = await sanityFetch({
    query: recentPostsQuery,
    params: {limit: limit - 1}, // GROQ uses 0-based indexing with [0...limit]
  })

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="container">
        <aside className="py-12 sm:py-20">
          <div>
            {sectionTitle && (
              <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl mb-6">
                {sectionTitle}
              </h2>
            )}
            <div className="space-y-6">
              {posts.map((post: RecentPostsQueryResult[number]) => {
                const {_id, title, slug, excerpt, date, author} = post

                return (
                  <article
                    data-sanity={dataAttr({id: _id, type: 'post', path: 'title'}).toString()}
                    key={_id}
                    className="border border-gray-200 rounded-sm p-6 bg-white flex flex-col justify-between transition-colors hover:bg-gray-50 relative"
                  >
                    <Link
                      className="hover:text-brand underline transition-colors"
                      href={`/posts/${slug}`}
                    >
                      <span className="absolute inset-0 z-10" />
                    </Link>
                    <div>
                      <h3 className="text-2xl mb-4">{title}</h3>
                      <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">
                        {excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      {author && author.firstName && author.lastName && (
                        <div className="flex items-center">
                          <Avatar person={author} small={true} />
                        </div>
                      )}
                      <time className="text-gray-500 text-xs font-mono" dateTime={date}>
                        <DateComponent dateString={date} />
                      </time>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
