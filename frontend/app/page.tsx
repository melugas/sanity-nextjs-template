import type {Metadata} from 'next'
import Head from 'next/head'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {PageOnboarding} from '@/app/components/Onboarding'

/**
 * Homepage - renders the "about" page from Sanity
 */
export default async function Page() {
  const [{data: page}] = await Promise.all([
    sanityFetch({query: getPageQuery, params: {slug: 'about'}}),
  ])

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Please create an &quot;About&quot; page in the Sanity Studio with slug &quot;about&quot; to use as the
            homepage.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title>{page.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{page.heading}</h1>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}
