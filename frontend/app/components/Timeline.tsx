import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type TimelineProps = {
  block: ExtractPageBuilderType<'timeline'>
  index: number
  pageType: string
  pageId: string
}

export default function Timeline({block}: TimelineProps) {
  const {sectionTitle, entries = []} = block

  if (!entries || entries.length === 0) {
    return null
  }

  return (
    <section className="container my-12">
      <div className="max-w-4xl mx-auto">
        {sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{sectionTitle}</h2>
        )}

        <div className="space-y-8">
          {entries.map((entry: any, index: number) => {
            const isLast = index === entries.length - 1

            return (
              <div key={entry._key || index} className="relative flex gap-6">
                {/* Image and connecting line */}
                <div className="relative shrink-0">
                  {entry.image?.asset?._ref ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-white">
                      <Image
                        id={entry.image.asset._ref}
                        alt={entry.image.alt || entry.organization || 'Timeline entry'}
                        width={64}
                        height={64}
                        crop={entry.image.crop}
                        mode="cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300" />
                  )}

                  {/* Connecting line */}
                  {!isLast && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h3 className="text-xl font-semibold">{entry.organization}</h3>
                    {(entry.startDate || entry.endDate) && (
                      <span className="text-sm text-gray-500">
                        {entry.startDate}
                        {entry.endDate && (
                          <>
                            {' '}
                            <span className="mx-1">•</span> {entry.endDate}
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {entry.role && (
                    <p className="text-gray-600 font-medium mb-2">{entry.role}</p>
                  )}

                  {entry.description && (
                    <p className="text-gray-600 leading-relaxed">{entry.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
