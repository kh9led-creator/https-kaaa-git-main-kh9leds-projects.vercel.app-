
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Settings, Plus, Download, MessageSquare, AlertCircle, TrendingUp, Users, Star } from 'lucide-react';
import { useLanguage } from '../App';

const AdminDashboard: React.FC = () => {
  const { lang, t } = useLanguage();
  const issueData = [
    { name: lang === 'ar' ? 'قلق' : 'Anxiety', value: 45 },
    { name: lang === 'ar' ? 'دراسي' : 'Academic', value: 30 },
    { name: lang === 'ar' ? 'أسري' : 'Family', value: 15 },
    { name: lang === 'ar' ? 'آخر' : 'Other', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const weeklyStats = [
    { day: lang === 'ar' ? 'أحد' : 'Sun', sessions: 24 },
    { day: lang === 'ar' ? 'اثن' : 'Mon', sessions: 35 },
    { day: lang === 'ar' ? 'ثلا' : 'Tue', sessions: 28 },
    { day: lang === 'ar' ? 'أرب' : 'Wed', sessions: 42 },
    { day: lang === 'ar' ? 'خمس' : 'Thu', sessions: 31 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t.admin_title}</h1>
          <p className="text-gray-500">{t.admin_desc}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border rounded-2xl text-sm font-bold">
            <Download size={18} />
            {t.export_reports}
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg">
            <Plus size={18} />
            {t.build_metric}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-sm border">
            <h3 className="font-bold text-xl text-gray-800 mb-8 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              {t.weekly_activity}
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-[2rem] border shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">{t.common_issues}</h4>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={issueData} innerRadius={50} outerRadius={70} dataKey="value">
                        {issueData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="bg-white p-6 rounded-[2rem] border shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">{t.critical_alerts}</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-xs text-red-800 font-medium">{lang === 'ar' ? 'طالب يحتاج تدخل عاجل' : 'Urgent student intervention'}</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600" />
              {t.latest_reviews}
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">User {i}</span>
                    <Star size={12} fill="#f59e0b" className="text-yellow-500" />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Very helpful session.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
            <div className="grid grid-cols-1 gap-2">
              <button className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm font-bold text-blue-800">
                <Users size={16} />
                {t.advisor_management}
              </button>
              <button className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm font-bold text-blue-800">
                <Settings size={16} />
                {t.banner_settings}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
