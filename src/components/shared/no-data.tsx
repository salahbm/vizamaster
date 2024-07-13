import Image from 'next/image';
import { useTranslations } from 'next-intl';

const EmptyState: React.FC = () => {
  const t = useTranslations('EmptyState');

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 my-20">
      <Image
        src="/images/no-data.png"
        alt="Empty State"
        width={200}
        height={200}
        className="object-cover"
      />
      <h2 className="text-2xl font-semibold mb-2 textGradient">{t('title')}</h2>
      <p className="text-gray-600 mb-4">
        {t('description')
          .split('\n')
          .map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
      </p>
    </div>
  );
};

export default EmptyState;
