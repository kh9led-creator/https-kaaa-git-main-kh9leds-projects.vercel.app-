
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Camera, CameraOff, PhoneOff, Settings, MessageCircle, Maximize2 } from 'lucide-react';
import { useLanguage } from '../App';

const SessionView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?')) {
      navigate('/student');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900 flex flex-col text-white animate-in fade-in duration-700">
      <div className="p-4 sm:p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
             {lang === 'ar' ? 'م' : 'S'}
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base">{t.session_live}</h3>
            <p className="text-[10px] sm:text-xs text-gray-400">{t.session_id}: {id?.substring(0, 8)}</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full font-mono text-lg sm:text-xl">
          {formatTime(duration)}
        </div>
        <button className="p-2 sm:p-3 bg-white/10 rounded-2xl">
          <Settings size={20} />
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center p-4 relative">
        <div className="w-full h-full max-w-6xl rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-gray-800 shadow-2xl relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <img src="https://picsum.photos/1200/800?random=40" className="w-full h-full object-cover opacity-60" alt="Stream" />
            <div className={`absolute bottom-8 ${lang === 'ar' ? 'right-8' : 'left-8'} bg-black/40 px-4 py-2 rounded-xl text-sm`}>
              {lang === 'ar' ? 'د. أحمد السالم' : 'Dr. Ahmed Al-Salem'}
            </div>
          </div>
          <div className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} w-32 sm:w-48 h-48 sm:h-64 bg-gray-900 rounded-2xl sm:rounded-3xl border-2 border-white/20 shadow-xl overflow-hidden`}>
            <img src="https://picsum.photos/400/600?random=50" className="w-full h-full object-cover" alt="Preview" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
          <button onClick={() => setIsMuted(!isMuted)} className={`p-3 sm:p-5 rounded-full ${isMuted ? 'bg-red-500' : 'bg-white/10'}`}>
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button onClick={() => setIsCameraOff(!isCameraOff)} className={`p-3 sm:p-5 rounded-full ${isCameraOff ? 'bg-red-500' : 'bg-white/10'}`}>
            {isCameraOff ? <CameraOff size={24} /> : <Camera size={24} />}
          </button>
          <button onClick={handleEndSession} className="p-3 sm:p-5 bg-red-600 rounded-full hover:scale-110 transition-transform">
            <PhoneOff size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionView;
