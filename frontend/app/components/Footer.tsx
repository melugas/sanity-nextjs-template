import CarbonFootprint from '@/app/components/CarbonFootprint'

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1]" />
      <div className="container relative">
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="mb-10 text-center text-4xl font-mono leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-2xl">
            MU Digital
          </h3>
          <div className="flex flex-col gap-3 items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
            <a href="" className="mx-3 hover:underline font-mono">
              &copy; 2026 MU Digital. All rights reserved.
            </a>
          </div>
        </div>
        <div className="flex justify-center pb-8 pt-4">
          <CarbonFootprint />
        </div>
      </div>
    </footer>
  )
}
