
import React, { useState } from 'react';
import { Calendar, Users, Clock, Award, FileText, Download } from 'lucide-react';
import { useLanguage } from '../App';

const AdvisorDashboard: React.FC = () => {
  const { lang, t } = useLanguage();
  const [hours] = useState(8.5);
  const targetHours = 10;

  const upcomingSessions = [
    { id: '101', student: lang === 'ar' ? 'محمد خالد' : 'Mohamed Khalid', type: lang === 'ar' ? 'محادثة فيديو' : 'Video Chat', time: '10:30 AM', quiz: lang === 'ar' ? 'قلق مرتفع' : 'High Anxiety' },
    { id: '102', student: lang === 'ar' ? 'سارة يوسف' : 'Sarah Yousef', type: lang === 'ar' ? 'شات كتابي' : 'Text Chat', time: '01:15 PM', quiz: lang === 'ar' ? 'صعوبات تعلم' : 'Study Issues' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{lang === 'ar' ? 'أهلاً بك، د. أحمد' : 'Welcome, Dr. Ahmed'}</h1>
          <p className="text-gray-500">{lang === 'ar' ? `لديك ${upcomingSessions.length} جلسات اليوم` : `You have ${upcomingSessions.length} sessions today`}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg">
            {lang === 'ar' ? 'فتح العيادة الافتراضية' : 'Open Virtual Clinic'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t.sessions_today, value: '2', icon: <Calendar />, color: 'blue' },
          { label: t.served_students, value: '142', icon: <Users />, color: 'green' },
          { label: t.volunteer_hours, value: hours + ' h', icon: <Clock />, color: 'purple' },
          { label: t.overall_rating, value: '4.9', icon: <Award />, color: 'yellow' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
            <div className={`p-3 rounded-2xl bg-blue-50 text-blue-600`}>{stat.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] sm:text-xs font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">{t.upcoming_sessions}</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white p-6 rounded-3xl shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold">{session.student.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{session.student}</h4>
                      <p className="text-xs text-gray-400">{session.type} • {session.time}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">{session.quiz}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-grow py-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold">{t.prepare_session}</button>
                  <button className="flex-grow py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold">{t.view_metrics}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl">
            <Award className="w-12 h-12 mb-6 text-yellow-300" />
            <h3 className="text-xl font-bold mb-2">{t.journey_title}</h3>
            <p className="text-blue-100 text-sm mb-6">{t.journey_desc}</p>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-8">
              <div className="h-full bg-yellow-400" style={{ width: `${(hours/targetHours)*100}%` }} />
            </div>
            <button 
              disabled={hours < targetHours}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${hours >= targetHours ? 'bg-yellow-400 text-indigo-900' : 'bg-white/10 text-white/40'}`}
            >
              <Download size={20} />
              {t.issued_certificate}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;
