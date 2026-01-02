
import React, { useState } from 'react';
import { Search, Star, MessageSquare, Phone, Video, Check } from 'lucide-react';
import { Advisor, SessionType } from '../types';

const MOCK_ADVISORS: Advisor[] = [
  { id: '1', name: 'د. أحمد السالم', specialty: 'استشارات نفسية وتعديل سلوك', rating: 4.8, imageUrl: 'https://picsum.photos/200/200?random=1', bio: 'خبير في التعامل مع القلق الدراسي والمراهقة.', volunteerHours: 45 },
  { id: '2', name: 'أ. سارة المنصور', specialty: 'تطوير الذات والإرشاد التربوي', rating: 4.9, imageUrl: 'https://picsum.photos/200/200?random=2', bio: 'مختصة في المهارات الدراسية والتفوق العلمي.', volunteerHours: 32 },
  { id: '3', name: 'د. ليلى فهد', specialty: 'العلاقات الأسرية والاجتماعية', rating: 4.7, imageUrl: 'https://picsum.photos/200/200?random=3', bio: 'مستشارة تربوية بخبرة تزيد عن ١٠ سنوات.', volunteerHours: 60 },
];

const StudentDashboard: React.FC = () => {
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
      {/* Hero Section */}
      <section className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">أهلاً بك يا بطل!</h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            نحن هنا لندعمك ونسمعك. اختر الموجه المناسب وابدأ رحلة التغيير اليوم بكل خصوصية وأمان.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن تخصص أو اسم موجه..."
              className="w-full pr-12 pl-4 py-4 rounded-2xl text-gray-800 shadow-lg border-none focus:ring-4 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">الموجهون المتاحون</h2>
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
                    alt={advisor.name} 
                    className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-800">{advisor.name}</h3>
                    <p className="text-blue-600 text-sm mb-2">{advisor.specialty}</p>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold">{advisor.rating}</span>
                      <span className="text-gray-400 mr-2">(٥٠ تقييم)</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 text-sm line-clamp-2">{advisor.bio}</p>
                <button 
                  className="w-full mt-6 bg-gray-50 hover:bg-blue-50 text-blue-600 py-3 rounded-xl font-bold transition-colors"
                  onClick={() => setSelectedAdvisor(advisor)}
                >
                  احجز موعداً
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <aside className="space-y-6">
          <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
            <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <ShieldSquareIcon />
              </div>
              نصيحة اليوم
            </h3>
            <p className="text-green-700 text-sm leading-relaxed">
              تذكر أن القلق هو مجرد طاقة زائدة. تنفس بعمق وحاول التركيز على ما يمكنك التحكم فيه الآن.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">خدمات سريعة</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-sm hover:bg-gray-100 transition-colors">
                <span>اختبار القلق الدراسي</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs">متاح</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-sm hover:bg-gray-100 transition-colors">
                <span>دليل التعامل مع الضغوط</span>
                <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded-md text-xs">PDF</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Booking Modal (Simulator) */}
      {selectedAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">حجز استشارة مع {selectedAdvisor.name}</h2>
              <button onClick={resetBooking} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>

            {/* Stepper */}
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
                <h3 className="font-bold text-lg text-gray-700">اختر وسيلة التواصل:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: SessionType.CHAT, label: 'محادثة', icon: <MessageSquare /> },
                    { id: SessionType.VOICE, label: 'صوتي', icon: <Phone /> },
                    { id: SessionType.VIDEO, label: 'فيديو', icon: <Video /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSessionType(t.id)}
                      className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all border-2 ${sessionType === t.id ? 'bg-blue-50 border-blue-600 text-blue-600' : 'border-gray-100 hover:border-blue-200'}`}
                    >
                      {t.icon}
                      <span className="font-medium text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
                <button 
                  disabled={!sessionType}
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
                >
                  التالي
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-gray-700">المقياس الأولي (قبل الجلسة):</h3>
                <div className="bg-blue-50 p-6 rounded-2xl text-sm text-blue-700 mb-4">
                  هذا النموذج يساعد الموجه على فهم حالتك بشكل أفضل قبل البدء.
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">ما هو مستوى شعورك بالقلق حالياً؟</span>
                    <input type="range" className="w-full mt-2 accent-blue-600" min="1" max="10" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>منخفض جداً</span>
                      <span>مرتفع جداً</span>
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">ما هو السبب الرئيسي لطلبك للاستشارة؟</span>
                    <textarea className="w-full mt-2 p-4 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24" placeholder="اكتب هنا باختصار..."></textarea>
                  </label>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                  تأكيد الحجز النهائي
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">تم تأكيد الموعد!</h3>
                <p className="text-gray-500 mb-8">لقد تم إرسال طلبك للموجه {selectedAdvisor.name}. ستصلك رسالة تأكيد عبر المنصة.</p>
                <div className="flex gap-4">
                  <button onClick={resetBooking} className="flex-grow py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold">إغلاق</button>
                  <Link to={`/session/${Math.random().toString(36).substr(2, 9)}`} className="flex-grow py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center">دخول الجلسة الآن</Link>
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

const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
);

import { Link } from 'react-router-dom';

export default StudentDashboard;
