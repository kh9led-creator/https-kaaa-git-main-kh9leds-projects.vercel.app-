
import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { User, ShieldCheck, HeartHandshake, Languages } from 'lucide-react';
import { useLanguage } from '../App';

interface Props {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Navbar: React.FC<Props> = ({ currentRole, onRoleChange }) => {
  const { lang, t, setLang } = useLanguage();

  const navItems = [
    { label: t.student, role: UserRole.STUDENT, icon: <User size={20} /> },
    { label: t.advisor, role: UserRole.ADVISOR, icon: <HeartHandshake size={20} /> },
    { label: t.admin, role: UserRole.ADMIN, icon: <ShieldCheck size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {lang === 'ar' ? 'م' : 'A'}
          </div>
          <span className="text-xl font-bold text-gray-800 hidden md:block">{t.brand}</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.role}
                onClick={() => onRoleChange(item.role)}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium whitespace-nowrap ${
                  currentRole === item.role 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all font-bold text-sm"
          >
            <Languages size={20} className="text-blue-500" />
            <span className="hidden xs:inline">{t.lang_toggle}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
