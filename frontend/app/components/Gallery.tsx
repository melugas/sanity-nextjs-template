import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

/**
 * Gallery component for the PageBuilder system.
 * Displays a collection of images in grid, masonry, or carousel layout.
 *
 * @component
 * @example
 * // Used within PageBuilder - not called directly
 * <Gallery block={galleryBlock} index={2} pageType="page" pageId="abc123" />
 */

type GalleryProps = {
  block: ExtractPageBuilderType<'gallery'>
  index: number
  pageType: string
  pageId: string
}

export default function Gallery({block}: GalleryProps) {
  const {sectionTitle, images = [], layout = 'grid', columns = 3} = block

  if (!images || images.length === 0) {
    return null
  }

  // Grid layout with configurable columns
  if (layout === 'grid') {
    const gridCols = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

    return (
      <section className="container my-12">
        <div className="max-w-6xl mx-auto">
          {sectionTitle && (
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{sectionTitle}</h2>
          )}
          <div className={`grid ${gridCols} gap-6`}>
            {images.map((item: any) => (
              <div key={item._key} className="group">
                {item.image?.asset?._ref && (
                  <div className="relative aspect-square overflow-hidden rounded-sm">
                    <Image
                      id={item.image.asset._ref}
                      alt={item.image.alt || item.caption || 'Gallery image'}
                      width={600}
                      height={600}
                      crop={item.image.crop}
                      mode="cover"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {item.caption && (
                  <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Masonry layout
  if (layout === 'masonry') {
    return (
      <section className="container my-12">
        <div className="max-w-6xl mx-auto">
          {sectionTitle && (
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{sectionTitle}</h2>
          )}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {images.map((item: any) => (
              <div key={item._key} className="group break-inside-avoid mb-6">
                {item.image?.asset?._ref && (
                  <div className="relative overflow-hidden rounded-sm">
                    <Image
                      id={item.image.asset._ref}
                      alt={item.image.alt || item.caption || 'Gallery image'}
                      width={600}
                      height={600}
                      crop={item.image.crop}
                      mode="cover"
                      className="w-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {item.caption && (
                  <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Carousel layout - simple horizontal scroll
  if (layout === 'carousel') {
    return (
      <section className="container my-12">
        <div className="max-w-6xl mx-auto">
          {sectionTitle && (
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{sectionTitle}</h2>
          )}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6 pb-4">
              {images.map((item: any) => (
                <div key={item._key} className="group flex-shrink-0 w-80">
                  {item.image?.asset?._ref && (
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <Image
                        id={item.image.asset._ref}
                        alt={item.image.alt || item.caption || 'Gallery image'}
                        width={600}
                        height={600}
                        crop={item.image.crop}
                        mode="cover"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {item.caption && (
                    <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return null
}
