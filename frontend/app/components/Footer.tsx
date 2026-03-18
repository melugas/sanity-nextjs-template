import Link from 'next/link'
import CarbonFootprint from '@/app/components/CarbonFootprint'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {dataAttr} from '@/sanity/lib/utils'

// Helper function to resolve link href based on linkType
function resolveHref(link: {linkType?: string; pageSlug?: string; href?: string}) {
  if (!link) return undefined

  switch (link.linkType) {
    case 'page':
      return link.pageSlug ? `/${link.pageSlug}` : undefined
    case 'href':
      return link.href || undefined
    default:
      return undefined
  }
}

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const copyrightHref = resolveHref(settings?.footerCopyrightLink)
  const copyrightText = settings?.footerCopyright || '© 2026 MU Digital. All rights reserved.'

  return (
    <footer className="bg-gray-50 relative">
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1]" />
      <div className="container relative">
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3
            className="mb-10 text-center text-4xl font-mono leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-2xl"
            data-sanity={dataAttr({
              id: settings?._id,
              type: 'settings',
              path: 'footerHeading',
            }).toString()}
          >
            {settings?.footerHeading || 'MU Digital'}
          </h3>
          <div className="flex flex-col gap-3 items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
            {copyrightHref ? (
              <Link
                href={copyrightHref}
                className="mx-3 hover:underline font-mono"
                data-sanity={dataAttr({
                  id: settings?._id,
                  type: 'settings',
                  path: 'footerCopyright',
                }).toString()}
              >
                {copyrightText}
              </Link>
            ) : (
              <span
                className="mx-3 hover:underline font-mono"
                data-sanity={dataAttr({
                  id: settings?._id,
                  type: 'settings',
                  path: 'footerCopyright',
                }).toString()}
              >
                {copyrightText}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center pb-8 pt-4">
          <CarbonFootprint />
        </div>
      </div>
    </footer>
  )
}
