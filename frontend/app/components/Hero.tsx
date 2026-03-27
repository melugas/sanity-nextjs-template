import Link from 'next/link'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import ResolvedLink from '@/app/components/ResolvedLink'

/**
 * Hero component for the PageBuilder system.
 * Renders a hero section with eyebrow, headline, subheadline, CTA buttons, and background.
 *
 * Features:
 * - Optional eyebrow text above headline
 * - Headline with optional inline links
 * - Subheadline for supporting text
 * - Up to 2 CTA buttons (primary/secondary styles)
 * - Background image or color
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
  const {
    eyebrow,
    headline,
    subheadline,
    headingLinks = [],
    ctaButtons = [],
    backgroundImage,
    backgroundColor,
  } = block

  // Create a function to render the headline with links
  const renderHeadline = () => {
    if (!headingLinks || headingLinks.length === 0) {
      return <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black">{headline}</h1>
    }

    // Split the headline by the link texts and interleave links
    let parts: (string | JSX.Element)[] = [headline]

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
  const backgroundStyle: React.CSSProperties = {}

  if (backgroundImage?.asset?.url) {
    backgroundStyle.backgroundImage = `url(${backgroundImage.asset.url})`
  } else if (backgroundColor?.hex) {
    backgroundStyle.backgroundColor = backgroundColor.hex
  }

  const backgroundClass = backgroundImage?.asset?.url || backgroundColor?.hex
    ? ''
    : 'bg-[url(/images/tile-1-black.png)] bg-size-[5px]'

  return (
    <div className="relative">
      <div className={`relative ${backgroundClass}`} style={backgroundStyle}>
        <div className="bg-gradient-to-b from-white w-full h-full absolute top-0"></div>
        <div className="container">
          <div className="relative min-h-[40vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-30 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 items-center text-center">
              {eyebrow && (
                <div className="text-md leading-6 prose uppercase py-1 px-3 bg-white font-mono italic">
                  {eyebrow}
                </div>
              )}
              {renderHeadline()}
              {subheadline && (
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl">
                  {subheadline}
                </p>
              )}
              {ctaButtons && ctaButtons.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  {ctaButtons.map((button: any) => (
                    <ResolvedLink
                      key={button._key}
                      link={button.link}
                      className={`rounded-full flex gap-2 font-mono text-sm whitespace-nowrap items-center py-3 px-6 transition-colors duration-200 ${
                        button.style === 'primary'
                          ? 'bg-black hover:bg-blue text-white'
                          : 'bg-white hover:bg-gray-100 text-black border-2 border-black'
                      }`}
                    >
                      {button.label}
                    </ResolvedLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
