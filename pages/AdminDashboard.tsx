
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Settings, Plus, Download, Filter, MessageSquare, AlertCircle, TrendingUp, Users, Star } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const issueData = [
    { name: 'قلق', value: 45 },
    { name: 'دراسي', value: 30 },
    { name: 'أسري', value: 15 },
    { name: 'آخر', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const weeklyStats = [
    { day: 'الأحد', sessions: 24 },
    { day: 'الاثنين', sessions: 35 },
    { day: 'الثلاثاء', sessions: 28 },
    { day: 'الأربعاء', sessions: 42 },
    { day: 'الخميس', sessions: 31 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم المدير</h1>
          <p className="text-gray-500">مرحباً بك، هنا يمكنك إدارة النظام بالكامل ومتابعة الإحصائيات.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border rounded-2xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Settings size={20} />
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
            <Download size={18} />
            تصدير التقارير
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all">
            <Plus size={18} />
            بناء مقياس جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Left */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                نشاط الجلسات الأسبوعي
              </h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="sessions" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-[2rem] border shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">تصنيف المشاكل الشائعة</h4>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={issueData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {issueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {issueData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-white p-6 rounded-[2rem] border shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">تنبيهات حرجة</h4>
                <div className="space-y-4">
                  {[
                    { text: 'طالب يحتاج تدخل عاجل (أزمة حادة)', time: 'منذ ١٠ دقائق', type: 'error' },
                    { text: 'موجه جديد ينتظر تفعيل الحساب', time: 'منذ ساعة', type: 'warning' },
                    { text: 'اكتمال صيانة نظام الفيديو بنجاح', time: 'منذ ٣ ساعات', type: 'info' },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${alert.type === 'error' ? 'text-red-500' : alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{alert.text}</p>
                        <p className="text-[10px] text-gray-400">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Management */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600" />
              أحدث التقييمات
            </h3>
            <div className="space-y-6">
              {[
                { name: 'فهد س.', advisor: 'د. أحمد', rate: 5, comment: 'تجربة رائعة ساعدتني كثيراً.' },
                { name: 'نورة م.', advisor: 'أ. سارة', rate: 4, comment: 'الجلسة كانت مفيدة لكن الصوت كان يقطع قليلاً.' },
                { name: 'خالد أ.', advisor: 'د. ليلى', rate: 5, comment: 'الموجهة كانت صبورة ومستمعة جيدة.' },
              ].map((review, i) => (
                <div key={i} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-gray-800">{review.name}</span>
                    <div className="flex text-yellow-400">
                      {/* Fixed: Using imported Star from lucide-react to avoid key prop typing issues on custom component */}
                      {Array.from({ length: review.rate }).map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-600 mb-1">الموجه: {review.advisor}</p>
                  <p className="text-xs text-gray-500 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">عرض الكل</button>
          </div>

          <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-4">أدوات المدير السريعة</h3>
            <div className="grid grid-cols-1 gap-2">
              <button className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm text-blue-800 hover:shadow-md transition-all">
                {/* Fixed: Users is now correctly imported from lucide-react */}
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Users size={16} /></div>
                إدارة الموجهين
              </button>
              <button className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm text-blue-800 hover:shadow-md transition-all">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Settings size={16} /></div>
                إعدادات البنرات
              </button>
              <button className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm text-blue-800 hover:shadow-md transition-all">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Download size={16} /></div>
                تصدير تقرير Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
