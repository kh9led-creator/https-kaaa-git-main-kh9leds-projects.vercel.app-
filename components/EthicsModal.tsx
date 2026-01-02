
import React from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';
import { useLanguage } from '../App';

interface Props {
  onAgree: () => void;
}

const EthicsModal: React.FC<Props> = ({ onAgree }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl p-8 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.ethics_title}</h2>
          
          <div className="bg-blue-50/50 rounded-2xl p-6 text-start text-gray-600 mb-8 leading-relaxed max-h-96 overflow-y-auto">
            <p className="mb-4">{t.ethics_desc}</p>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                <span>{t.ethics_item1}</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                <span>{t.ethics_item2}</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                <span>{t.ethics_item3}</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                <span>{t.ethics_item4}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onAgree}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl transform active:scale-95"
          >
            {t.ethics_agree}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EthicsModal;
