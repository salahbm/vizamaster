'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const NoAdminPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative">
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="bg-[#FF6A3D] px-2 text-3xl rounded rotate-12  text-white">
        Oops :/
      </div>
      <h1 className="text-2xl textGradient text-center font-extrabold text-white tracking-widest">
        You are not an admin,
        <br /> Please contact your administrator <br />
        to get access to this page
      </h1>
      <button className="mt-5" onClick={() => signOut()}>
        <Link
          href="/"
          className=" relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-white border border-current text-secondary">
            Go Home
          </span>
        </Link>
      </button>
    </div>
  );
};

export default NoAdminPage;
