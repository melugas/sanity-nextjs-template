import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {dataAttr} from '@/sanity/lib/utils'

// Helper function to resolve link href based on linkType
function resolveHref(link: {
  linkType?: string
  pageSlug?: string
  postSlug?: string
  href?: string
}) {
  if (!link) return '/'

  switch (link.linkType) {
    case 'page':
      return link.pageSlug ? `/${link.pageSlug}` : '/'
    case 'post':
      return link.postSlug ? `/posts/${link.postSlug}` : '/'
    case 'href':
      return link.href || '/'
    default:
      return '/'
  }
}

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span
              className="text-lg sm:text-2xl pl-2 font-semibold"
              data-sanity={dataAttr({
                id: settings?._id,
                type: 'settings',
                path: 'title',
              }).toString()}
            >
              {settings?.title || 'Sanity + Next.js'}
            </span>
          </Link>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono"
            >
              {settings?.headerNavigation?.map((navItem: any, index: number) => (
                <li key={navItem._key || index}>
                  <Link
                    href={resolveHref(navItem)}
                    className="hover:underline"
                    target={navItem.openInNewTab ? '_blank' : undefined}
                    rel={navItem.openInNewTab ? 'noopener noreferrer' : undefined}
                    data-sanity={dataAttr({
                      id: settings._id,
                      type: 'settings',
                      path: `headerNavigation[_key=="${navItem._key}"]`,
                    }).toString()}
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}

              {settings?.headerCta && (
                <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                  <Link
                    className="rounded-full flex gap-4 items-center bg-black hover:bg-orange focus:bg-orange py-2 px-4 justify-center sm:py-3 sm:px-6 text-white transition-colors duration-200"
                    href={resolveHref(settings.headerCta)}
                    target={settings.headerCta.openInNewTab ? '_blank' : undefined}
                    rel={settings.headerCta.openInNewTab ? 'noopener noreferrer' : undefined}
                    data-sanity={dataAttr({
                      id: settings._id,
                      type: 'settings',
                      path: 'headerCta',
                    }).toString()}
                  >
                    <span className="whitespace-nowrap">{settings.headerCta.text}</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
