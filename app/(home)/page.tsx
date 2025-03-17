import Link from 'next/link';
import { Button } from '@heroui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Learn Python</span>{' '}
                <span className="block text-indigo-600 xl:inline">the fun way!</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                An interactive learning platform designed specifically for kids to learn Python programming through engaging lessons and fun challenges.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/register" passHref>
                      <Button color="primary" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/lessons" passHref>
                      <Button color="secondary" className="w-full">
                        View Lessons
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <img
                  className="w-full"
                  src="/images/hero-image.jpg"
                  alt="Kids learning Python"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why learn with PythonChik?
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Interactive Lessons</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Learn by doing with our interactive code editor designed for kids.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fun Challenges</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Solve puzzles and complete projects to earn badges and track your progress.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Kid-Friendly</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Age-appropriate content with colorful visuals and simple explanations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}