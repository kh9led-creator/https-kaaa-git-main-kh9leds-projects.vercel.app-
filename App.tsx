
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentDashboard from './pages/StudentDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SessionView from './pages/SessionView';
import EthicsModal from './components/EthicsModal';
import AIChatbot from './components/AIChatbot';
import { UserRole } from './types';
import { translations, Language } from './translations';

interface LanguageContextType {
  lang: Language;
  t: any;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('app_lang') as Language) || 'ar');
  const [hasAgreedToEthics, setHasAgreedToEthics] = useState<boolean>(false);

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  useEffect(() => {
    const agreed = localStorage.getItem('agreed_to_ethics');
    if (agreed === 'true') setHasAgreedToEthics(true);
  }, []);

  const handleAgree = () => {
    setHasAgreedToEthics(true);
    localStorage.setItem('agreed_to_ethics', 'true');
  };

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col transition-all duration-300">
          {!hasAgreedToEthics && <EthicsModal onAgree={handleAgree} />}
          
          <Navbar currentRole={role} onRoleChange={setRole} />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/advisor" element={<AdvisorDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/session/:id" element={<SessionView />} />
              <Route path="/" element={<Navigate to={`/${role.toLowerCase()}`} />} />
            </Routes>
          </main>

          <AIChatbot />
          
          <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
            <p>© 2024 {t.brand} - {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
          </footer>
        </div>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
