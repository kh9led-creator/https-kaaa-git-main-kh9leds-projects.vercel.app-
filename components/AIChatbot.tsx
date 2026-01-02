
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { getAIAdvisorResponse } from '../services/gemini';
import { Message } from '../types';
import { useLanguage } from '../App';

const AIChatbot: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([{ 
      role: 'model', 
      text: lang === 'ar' ? 'مرحباً بك! أنا مساعدك الذكي. كيف يمكنني دعمك اليوم؟' : 'Hello! I am your AI assistant. How can I support you today?' 
    }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    const response = await getAIAdvisorResponse(userMessage, lang);
    setMessages(prev => [...prev, { role: 'model', text: response || (lang === 'ar' ? 'خطأ' : 'Error') }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className={`fixed bottom-24 ${lang === 'ar' ? 'right-6' : 'left-6'} w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border`}>
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">{t.ai_bot_title}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.ai_placeholder}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none"
              />
              <button
                onClick={handleSend}
                className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center`}
              >
                <Send size={16} className={lang === 'en' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
