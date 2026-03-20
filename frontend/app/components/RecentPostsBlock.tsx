import {ExtractPageBuilderType} from '@/sanity/lib/types'

type RecentPostsBlockProps = {
  block: ExtractPageBuilderType<'recentPosts'>
  index: number
  pageType: string
  pageId: string
}

export default function RecentPostsBlock({block}: RecentPostsBlockProps) {
  const {sectionTitle, limit = 3} = block

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="container">
        <aside className="py-12 sm:py-20">
          <div>
            {sectionTitle && <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl">{sectionTitle}</h2>}
            <p className="text-gray-600 mt-4">
              Recent Posts block configured to show {limit} posts. (Data fetching will be implemented when integrated into a specific page)
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
