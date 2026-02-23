'use client'

import {useEffect, useState} from 'react'
// @ts-expect-error - @tgwf/co2 has no TypeScript declarations
import {co2} from '@tgwf/co2'

/**
 * Displays the carbon footprint of the page load based on actual data transferred.
 * Uses CO2.js (https://www.thegreenwebfoundation.org/co2js/) for the calculation.
 */
export default function CarbonFootprint() {
  const [footprint, setFootprint] = useState<{
    bytes: number
    co2Grams: number
  } | null>(null)

  useEffect(() => {
    // Use requestIdleCallback or setTimeout to run after page is fully loaded
    const measure = () => {
      if (typeof window === 'undefined' || !window.performance) return

      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const totalBytes = resources.reduce((total, resource) => {
        const size = resource.transferSize || resource.encodedBodySize || 0
        return total + size
      }, 0)

      if (totalBytes > 0) {
        const emissions = new co2()
        const co2Grams = emissions.perByte(totalBytes, false)
        setFootprint({bytes: totalBytes, co2Grams})
      }
    }

    // Run after load - Performance API may not have complete data until load event
    if (document.readyState === 'complete') {
      measure()
    } else {
      window.addEventListener('load', measure)
      return () => window.removeEventListener('load', measure)
    }
  }, [])

  if (!footprint) return null

  const kb = (footprint.bytes / 1024).toFixed(0)
  const co2Formatted =
    footprint.co2Grams < 0.01 ? '<0.01' : footprint.co2Grams.toFixed(3)

  return (
    <p className="text-xs text-gray-500 font-mono max-w-md text-center">
      Loading this page transferred {kb} kb of data, generating about {co2Formatted}g of CO
      <sub>2</sub>. Calculated with{' '}
      <a
        href="https://www.thegreenwebfoundation.org/co2js/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:underline"
      >
        CO2.js
      </a>
      .
    </p>
  )
}
