
import React, { useState } from 'react';
import { Calendar, Users, Clock, Award, FileText, ChevronLeft, Download } from 'lucide-react';

const AdvisorDashboard: React.FC = () => {
  const [hours, setHours] = useState(8.5); // Current simulated hours
  const targetHours = 10;

  const upcomingSessions = [
    { id: '101', student: 'محمد خالد', type: 'محادثة فيديو', time: '١٠:٣٠ ص', date: 'اليوم', quiz: 'قلق مرتفع' },
    { id: '102', student: 'سارة يوسف', type: 'شات كتابي', time: '٠١:١٥ م', date: 'اليوم', quiz: 'صعوبات تعلم' },
    { id: '103', student: 'عبدالله علي', type: 'اتصال صوتي', time: '٠٤:٠٠ م', date: 'غداً', quiz: 'مشاكل أسرية' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">أهلاً بك، د. أحمد</h1>
          <p className="text-gray-500">لديك ٣ جلسات اليوم، نتمنى لك يوماً مثمراً.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
            <Calendar size={18} />
            الجدول الكامل
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all">
            فتح العيادة الافتراضية
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'جلسات اليوم', value: '3', icon: <Calendar />, color: 'blue' },
          { label: 'طلاب تمت خدمتهم', value: '142', icon: <Users />, color: 'green' },
          { label: 'ساعات التطوع', value: hours + ' س', icon: <Clock />, color: 'purple' },
          { label: 'التقييم العام', value: '4.9', icon: <Award />, color: 'yellow' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">الجلسات القادمة</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white p-6 rounded-3xl shadow-sm border hover:border-blue-200 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold">
                      {session.student.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{session.student}</h4>
                      <p className="text-xs text-gray-400">{session.type} • {session.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${session.quiz.includes('مرتفع') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {session.quiz}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-grow py-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100">تحضير الجلسة</button>
                  <button className="flex-grow py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100">عرض القياسات</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gamification & Progress */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <Award className="w-12 h-12 mb-6 text-yellow-300" />
              <h3 className="text-xl font-bold mb-2">رحلة العطاء</h3>
              <p className="text-blue-100 text-sm mb-6">أكمل {targetHours} ساعات لتفعيل زر إصدار شهادة التطوع الموثقة.</p>
              
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-xs font-bold">
                  <span>التقدم الحالي</span>
                  <span>{Math.round((hours/targetHours)*100)}%</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-1000" 
                    style={{ width: `${(hours/targetHours)*100}%` }}
                  />
                </div>
                <p className="text-[10px] text-blue-200">متبقي {(targetHours - hours).toFixed(1)} ساعة فقط!</p>
              </div>

              <button 
                disabled={hours < targetHours}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${hours >= targetHours ? 'bg-yellow-400 text-indigo-900 hover:scale-105' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
              >
                <Download size={20} />
                إصدار الشهادة
              </button>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="bg-white rounded-[2rem] p-6 border shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              آخر التحديثات
            </h3>
            <div className="space-y-4">
              {[
                'تم إضافة مقياس "التنمر المدرسي" الجديد',
                'موعد اجتماع الموجهين الشهري يوم الخميس',
                'تحديث سياسة الخصوصية للجلسات الجماعية',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 group-hover:scale-150 transition-transform" />
                  <p className="text-sm text-gray-600 leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;
