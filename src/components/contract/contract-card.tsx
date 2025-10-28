import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ContractCard({
  title,
  country,
  onClick,
}: {
  title: string;
  country: string;
  onClick: () => void;
}) {
  const t = useTranslations('Contracts');
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl p-8 aspect-[3/3.5] transition-all duration-300 hover:border-purple-500 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center space-y-5">
        {/* Icon */}
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <FileText className="w-8 h-8 text-orange-600" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            {t('title')}
          </h3>
          <p className="text-sm text-gray-500">
            {t(`${country?.toLowerCase()}`)}
          </p>
        </div>

        {/* Action hint */}
        <div className="pt-2">
          <span className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors">
            {t('clickToView')}
          </span>
        </div>
      </div>
    </article>
  );
}
