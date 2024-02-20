import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className='relative isolate px-6 pt-20 lg:px-8'>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-secondary sm:text-6xl'>
              Light control app for the supported Govee Lights
            </h1>
            <p className='mt-8 text-lg leading-8 text-zinc-400'>
              This is the app created for to control the lights made by Govee. I
              do not collect or store any data on my end or on the server, on
              the next page you should set your own API key to get your
              supported light kits and control them. I am only using local
              storage to keep your API key. Due to limitations on Govee&apos;s
              API, functions are limited but enough for the daily usage.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/setkey'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
