import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Error 404 | VIZA MASTER',
  description: 'Route not found',
};

const ErrorPage = () => {
  return (
    <html>
      <body className="h-screen w-full flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <Link
            href="/"
            className=" relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Home
            </span>
          </Link>
        </button>
      </body>
    </html>
  );
};

export default ErrorPage;
