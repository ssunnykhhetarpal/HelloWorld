import { useState, useEffect } from 'react';
import { Globe, Sparkles, Heart, Clock, Code2, Copy, Check, Compass, Layers, Zap } from 'lucide-react';

interface Greeting {
  phrase: string;
  subtext: string;
  language: string;
  flag: string;
  region: string;
}

const GREETINGS: Greeting[] = [
  { phrase: "Hello, World!", subtext: "The universal origin of every developer journey", language: "English", flag: "🌐", region: "Global" },
  { phrase: "¡Hola, Mundo!", subtext: "Un saludo cálido para toda la comunidad", language: "Spanish", flag: "🇪🇸", region: "Spain & Latin America" },
  { phrase: "Bonjour, le Monde!", subtext: "Une chaleureuse bienvenue dans votre application", language: "French", flag: "🇫🇷", region: "France & Francophonie" },
  { phrase: "こんにちは、世界！", subtext: "新しい冒険がここから始まります", language: "Japanese", flag: "🇯🇵", region: "Japan" },
  { phrase: "你好，世界！", subtext: "探索代码世界的奇妙与精彩", language: "Chinese", flag: "🇨🇳", region: "China" },
  { phrase: "नमस्ते, दुनिया!", subtext: "ज्ञान और नवाचार की एक नई शुरुआत", language: "Hindi", flag: "🇮🇳", region: "India" },
  { phrase: "مرحباً بالعالم!", subtext: "بداية رحلة جديدة في عالم التطوير", language: "Arabic", flag: "🇦🇪", region: "Middle East & North Africa" },
  { phrase: "Hallo, Welt!", subtext: "Der Startpunkt für innovative Ideen", language: "German", flag: "🇩🇪", region: "Germany & DACH" },
  { phrase: "Olá, Mundo!", subtext: "Um grande abraço de boas-vindas", language: "Portuguese", flag: "🇧🇷", region: "Brazil & Portugal" },
  { phrase: "Habari, Dunia!", subtext: "Mwanzo wa safari nzuri ya maendeleo", language: "Swahili", flag: "🇰🇪", region: "East Africa" }
];

const TIMEZONES = [
  { city: 'Tokyo', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { city: 'London', zone: 'Europe/London', flag: '🇬🇧' },
  { city: 'New York', zone: 'America/New_York', flag: '🇺🇸' },
  { city: 'San Francisco', zone: 'America/Los_Angeles', flag: '🇺🇸' },
];

export default function App() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeGreeting = GREETINGS[selectedIdx];

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLikes(prev => prev + 1);
    setHasLiked(true);

    const emojis = ['✨', '💖', '🚀', '🌟', '🎉'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newId = Date.now() + Math.random();

    setFloatingParticles(prev => [...prev, { id: newId, x, y, emoji: randomEmoji }]);

    setTimeout(() => {
      setFloatingParticles(prev => prev.filter(p => p.id !== newId));
    }, 1200);
  };

  const copyGreeting = () => {
    navigator.clipboard.writeText(activeGreeting.phrase);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-600/20 via-sky-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white flex items-center gap-2">
                Hello World
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Online
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center items-center text-center">
        {/* Language selector chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 max-w-2xl">
          {GREETINGS.map((g, idx) => (
            <button
              key={g.language}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/50 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{g.flag}</span>
              <span>{g.language}</span>
            </button>
          ))}
        </div>

        {/* Hero Greeting Display */}
        <div className="relative group w-full max-w-3xl p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl transition-all">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Region: {activeGreeting.region}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent mb-4 leading-tight">
            {activeGreeting.phrase}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto mb-8 font-light">
            {activeGreeting.subtext}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleLike}
              className="relative overflow-visible px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-medium text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Heart className={`w-4 h-4 transition-transform ${hasLiked ? 'fill-white scale-110' : ''}`} />
              <span>Send Cheers</span>
              <span className="px-1.5 py-0.5 text-xs rounded-md bg-white/20 font-mono">
                {likes}
              </span>

              {/* Floating particles inside button */}
              {floatingParticles.map(p => (
                <span
                  key={p.id}
                  style={{ left: p.x, top: p.y }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-lg animate-bounce"
                >
                  {p.emoji}
                </span>
              ))}
            </button>

            <button
              onClick={copyGreeting}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-slate-200 hover:text-white font-medium text-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* World Timezones Strip */}
        <div className="mt-12 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIMEZONES.map(t => {
            const timeStr = currentTime.toLocaleTimeString([], {
              timeZone: t.zone,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            return (
              <div
                key={t.city}
                className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-left hover:border-slate-700/60 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{t.city}</span>
                  <span>{t.flag}</span>
                </div>
                <div className="font-mono text-sm font-semibold text-slate-200">
                  {timeStr}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Vite + React 19</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Tailwind CSS v4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>TypeScript Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Ready for Custom Features</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/80 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500">
        <p>Built with Google AI Studio • Ready to build whatever you imagine next.</p>
      </footer>
    </div>
  );
}
