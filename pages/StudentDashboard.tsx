
import React, { useState } from 'react';
import { Search, Star, MessageSquare, Phone, Video, Check, X } from 'lucide-react';
import { Advisor, SessionType } from '../types';
import { useLanguage } from '../App';
import { Link } from 'react-router-dom';

// Fixed: Correctly typed MOCK_ADVISORS using the updated Advisor interface with localization support
const MOCK_ADVISORS: Advisor[] = [
  { id: '1', name: 'Dr. Ahmed Al-Salem', nameAr: 'د. أحمد السالم', specialty: 'Psychology', specialtyAr: 'استشارات نفسية وتعديل سلوك', rating: 4.8, imageUrl: 'https://picsum.photos/200/200?random=1', bio: 'Expert in anxiety.', bioAr: 'خبير في التعامل مع القلق الدراسي والمراهقة.', volunteerHours: 45 },
  { id: '2', name: 'Sarah Al-Mansour', nameAr: 'أ. سارة المنصور', specialty: 'Self-Development', specialtyAr: 'تطوير الذات والإرشاد التربوي', rating: 4.9, imageUrl: 'https://picsum.photos/200/200?random=2', bio: 'Specialist in study skills.', bioAr: 'مختصة في المهارات الدراسية والتفوق العلمي.', volunteerHours: 32 },
  { id: '3', name: 'Dr. Layla Fahd', nameAr: 'د. ليلى فهد', specialty: 'Family Relations', specialtyAr: 'العلاقات الأسرية والاجتماعية', rating: 4.7, imageUrl: 'https://picsum.photos/200/200?random=3', bio: 'Experienced counselor.', bioAr: 'مستشارة تربوية بخبرة تزيد عن ١٠ سنوات.', volunteerHours: 60 },
];

const StudentDashboard: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<SessionType | null>(null);

  const resetBooking = () => {
    setSelectedAdvisor(null);
    setStep(1);
    setSessionType(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.welcome_student}</h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">{t.hero_desc}</p>
          <div className="relative max-w-md">
            <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} />
            <input
              type="text"
              placeholder={t.search_placeholder}
              className={`w-full ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl text-gray-800 shadow-lg border-none focus:ring-4 focus:ring-blue-400 outline-none`}
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">{t.available_advisors}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_ADVISORS.map((advisor) => (
              <div 
                key={advisor.id} 
                className="bg-white p-6 rounded-3xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedAdvisor(advisor)}
              >
                <div className="flex gap-4 items-start">
                  <img 
                    src={advisor.imageUrl} 
                    alt={lang === 'ar' ? (advisor.nameAr || advisor.name) : advisor.name} 
                    className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-grow">
                    {/* Fixed: Removed 'as any' casts and used safe conditional access for localization */}
                    <h3 className="font-bold text-lg text-gray-800">{lang === 'ar' ? (advisor.nameAr || advisor.name) : advisor.name}</h3>
                    <p className="text-blue-600 text-sm mb-2">{lang === 'ar' ? (advisor.specialtyAr || advisor.specialty) : advisor.specialty}</p>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold">{advisor.rating}</span>
                      <span className="text-gray-400 mr-2">({lang === 'ar' ? '٥٠ تقييم' : '50 Reviews'})</span>
                    </div>
                  </div>
                </div>
                {/* Fixed: Removed 'as any' casts and used safe conditional access for localization */}
                <p className="mt-4 text-gray-600 text-sm line-clamp-2">{lang === 'ar' ? (advisor.bioAr || advisor.bio) : advisor.bio}</p>
                <button 
                  className="w-full mt-6 bg-gray-50 hover:bg-blue-50 text-blue-600 py-3 rounded-xl font-bold transition-colors"
                >
                  {t.book_now}
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
            <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <ShieldSquareIcon />
              {t.advice_of_day}
            </h3>
            <p className="text-green-700 text-sm leading-relaxed">
              {lang === 'ar' ? 'تذكر أن القلق هو مجرد طاقة زائدة. تنفس بعمق وحاول التركيز على ما يمكنك التحكم فيه الآن.' : 'Remember that anxiety is just excess energy. Breathe deeply and focus on what you can control now.'}
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">{t.quick_services}</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-sm hover:bg-gray-100 transition-colors">
                <span>{lang === 'ar' ? 'اختبار القلق الدراسي' : 'Study Anxiety Test'}</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs">{lang === 'ar' ? 'متاح' : 'Available'}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {selectedAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {lang === 'ar' ? `حجز استشارة مع ${selectedAdvisor.nameAr || selectedAdvisor.name}` : `Book session with ${selectedAdvisor.name}`}
              </h2>
              <button onClick={resetBooking} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-grow flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-grow h-1 mx-2 rounded-full ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-gray-700">{lang === 'ar' ? 'اختر وسيلة التواصل:' : 'Choose communication method:'}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: SessionType.CHAT, label: lang === 'ar' ? 'محادثة' : 'Chat', icon: <MessageSquare /> },
                    { id: SessionType.VOICE, label: lang === 'ar' ? 'صوتي' : 'Voice', icon: <Phone /> },
                    { id: SessionType.VIDEO, label: lang === 'ar' ? 'فيديو' : 'Video', icon: <Video /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSessionType(t.id)}
                      className={`p-4 sm:p-6 rounded-2xl flex flex-col items-center gap-3 transition-all border-2 ${sessionType === t.id ? 'bg-blue-50 border-blue-600 text-blue-600' : 'border-gray-100 hover:border-blue-200'}`}
                    >
                      {t.icon}
                      <span className="font-medium text-xs sm:text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
                <button 
                  disabled={!sessionType}
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold disabled:bg-gray-300"
                >
                  {lang === 'ar' ? 'التالي' : 'Next'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-gray-700">{lang === 'ar' ? 'المقياس الأولي:' : 'Initial Metric:'}</h3>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">{lang === 'ar' ? 'ما هو مستوى شعورك بالقلق حالياً؟' : 'Anxiety level?'}</span>
                    <input type="range" className="w-full mt-2 accent-blue-600" min="1" max="10" />
                  </label>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold"
                >
                  {lang === 'ar' ? 'تأكيد الحجز النهائي' : 'Confirm Booking'}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{lang === 'ar' ? 'تم تأكيد الموعد!' : 'Confirmed!'}</h3>
                <div className="flex gap-4 mt-8">
                  <button onClick={resetBooking} className="flex-grow py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold">{lang === 'ar' ? 'إغلاق' : 'Close'}</button>
                  <Link to={`/session/demo`} className="flex-grow py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center">
                    {lang === 'ar' ? 'دخول الجلسة الآن' : 'Join Session Now'}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ShieldSquareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export default StudentDashboard;
