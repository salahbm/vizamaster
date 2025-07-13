'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

const NoAdminPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Refresh the session and page
    router.refresh();

    // Reset the refreshing state after a short delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative">
      {/* Background gradient */}
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      {/* Error badge */}
      <div className="bg-[#FF6A3D] px-4 py-2 text-3xl rounded rotate-12 text-white mb-6">
        Oops :/
      </div>

      {/* Message */}
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl textGradient font-extrabold text-secondary tracking-widest mb-2">
          Access Denied
        </h1>
        <p className="text-lg mb-6">
          {session?.user?.email ? (
            <>
              <span className="font-medium">{session.user.email}</span> is not
              authorized as an admin.
              <br />
              Please contact your administrator for access.
            </>
          ) : (
            <>You are not authorized to access this area.</>
          )}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#FF6A3D] text-[#FF6A3D] hover:bg-[#FFF8F6] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A3D] focus:ring-opacity-50"
        >
          <RefreshCcw
            size={18}
            className={`${isRefreshing ? 'animate-spin' : ''}`}
          />
          {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
        </button>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          className="relative px-6 py-3 bg-white border border-[#FF6A3D] text-secondary hover:bg-[#FFF8F6] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A3D] focus:ring-opacity-50"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NoAdminPage;
