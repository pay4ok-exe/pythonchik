import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" passHref>
              <span className="text-2xl font-bold text-white">PythonChik</span>
            </Link>
            <p className="mt-2 text-gray-300">
              Making Python learning fun and accessible for kids
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/lessons" passHref>
                    <span className="text-base text-gray-300 hover:text-white">
                      Lessons
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/playground" passHref>
                    <span className="text-base text-gray-300 hover:text-white">
                      Playground
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/about" passHref>
                    <span className="text-base text-gray-300 hover:text-white">
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" passHref>
                    <span className="text-base text-gray-300 hover:text-white">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} PythonChik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}