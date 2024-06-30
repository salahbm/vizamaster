import Image from 'next/image';
import Link from 'next/link';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 my-20">
      <Image
        src="/images/no-data.png"
        alt="Empty State"
        width={200}
        height={200}
        className="object-cover"
      />
      <h2 className="text-2xl font-semibold mb-2 textGradient">No Data </h2>
      <p className="text-gray-600 mb-4">
        We’re working hard to bring new opportunities. <br /> Check back soon or
        add your first job!
      </p>
    </div>
  );
};

export default EmptyState;
