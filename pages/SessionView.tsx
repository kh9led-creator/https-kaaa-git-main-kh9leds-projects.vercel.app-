
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Camera, CameraOff, PhoneOff, Settings, MessageCircle, Maximize2 } from 'lucide-react';

const SessionView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (confirm('هل أنت متأكد من إنهاء الجلسة؟')) {
      navigate('/student');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900 flex flex-col text-white animate-in fade-in duration-700">
      {/* Top Bar */}
      <div className="p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">م</div>
          <div>
            <h3 className="font-bold">جلسة استشارية مباشرة</h3>
            <p className="text-xs text-gray-400">المعرف: {id?.substring(0, 8)}</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full font-mono text-xl tracking-wider">
          {formatTime(duration)}
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-grow flex items-center justify-center p-4 gap-4 relative">
        <div className="w-full h-full max-w-6xl rounded-[3rem] overflow-hidden bg-gray-800 shadow-2xl relative">
          {/* Main Remote Video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCameraOff ? (
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-4xl font-bold">م</div>
            ) : (
              <img src="https://picsum.photos/1200/800?random=40" className="w-full h-full object-cover opacity-80" alt="Remote Stream" />
            )}
            <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium">
              د. أحمد السالم (الموجه)
            </div>
          </div>

          {/* Local Picture-in-Picture */}
          <div className="absolute top-8 left-8 w-48 h-64 bg-gray-900 rounded-3xl border-2 border-white/20 shadow-xl overflow-hidden group">
            <img src="https://picsum.photos/400/600?random=50" className="w-full h-full object-cover" alt="Local Preview" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Maximize2 size={24} />
            </div>
          </div>
        </div>

        {/* Floating Controls Area (Mobile Optimized) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-5 bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-5 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
          
          <button 
            onClick={() => setIsCameraOff(!isCameraOff)}
            className={`p-5 rounded-full transition-all ${isCameraOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isCameraOff ? <CameraOff size={28} /> : <Camera size={28} />}
          </button>

          <button className="p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all hidden md:flex">
            <MessageCircle size={28} />
          </button>

          <button 
            onClick={handleEndSession}
            className="p-5 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
          >
            <PhoneOff size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionView;
