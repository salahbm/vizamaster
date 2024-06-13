import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <section className="min-h-screen relative items-center justify-center flex">
      <SignUp />
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
    </section>
  );
};

export default SignUpPage;
