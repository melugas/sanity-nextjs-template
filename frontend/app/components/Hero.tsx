import Link from 'next/link'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

/**
 * Hero component for the PageBuilder system.
 * Renders a hero section with an optional tagline, heading with inline links, and background image.
 *
 * @component
 * @example
 * // Used within PageBuilder - not called directly
 * <Hero block={heroBlock} index={0} pageType="page" pageId="abc123" />
 */

type HeroProps = {
  block: ExtractPageBuilderType<'hero'>
  index: number
  pageType: string
  pageId: string
}

type HeadingLink = {
  _key: string
  text: string
  url?: string
}

export default function Hero({block}: HeroProps) {
  const {tagline, heading, headingLinks = [], backgroundImage} = block

  // Create a function to render the heading with links
  const renderHeading = () => {
    if (!headingLinks || headingLinks.length === 0) {
      return <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black">{heading}</h1>
    }

    // Split the heading by the link texts and interleave links
    let parts: (string | JSX.Element)[] = [heading]

    headingLinks.forEach((link: HeadingLink, index: number) => {
      const newParts: (string | JSX.Element)[] = []
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(link.text)
          splitParts.forEach((textPart, i) => {
            if (textPart) newParts.push(textPart)
            if (i < splitParts.length - 1) {
              newParts.push(
                <Link
                  key={`${link._key}-${i}`}
                  className={`underline ${
                    index === 0
                      ? 'decoration-brand hover:text-brand'
                      : 'decoration-black text-framework'
                  } underline-offset-8 hover:underline-offset-4 transition-all ease-out`}
                  href={link.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </Link>
              )
            }
          })
        } else {
          newParts.push(part)
        }
      })
      parts = newParts
    })

    return (
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black">
        {parts}
      </h1>
    )
  }

  // Determine background style
  const backgroundStyle = backgroundImage?.asset?.url
    ? {backgroundImage: `url(${backgroundImage.asset.url})`}
    : undefined

  const backgroundClass = backgroundImage?.asset?.url
    ? ''
    : 'bg-[url(/images/tile-1-black.png)] bg-size-[5px]'

  return (
    <div className="relative">
      <div className={`relative ${backgroundClass}`} style={backgroundStyle}>
        <div className="bg-gradient-to-b from-white w-full h-full absolute top-0"></div>
        <div className="container">
          <div className="relative min-h-[40vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-30 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
              {tagline && (
                <div className="text-md leading-6 prose uppercase py-1 px-3 bg-white font-mono italic">
                  {tagline}
                </div>
              )}
              {renderHeading()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
