import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  LayoutDashboard, 
  Map as MapIcon, 
  LineChart, 
  Droplets, 
  AlertTriangle, 
  HelpCircle, 
  History, 
  Power,
  Plus,
  Minus,
  Navigation,
  FileDown,
  TrendingUp,
  Droplet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface DistrictData {
  id: string;
  name: string;
  purification: number;
  volume: string;
  impact: string;
  status: string;
  pos: { top: string; left: string };
  isAlert?: boolean;
}

const districtsData: Record<string, DistrictData> = {
  'songino-khairkhan': {
    id: 'songino-khairkhan',
    name: 'Сонгинохайрхан',
    purification: 89,
    volume: '12,400 m³',
    impact: 'Хэвийн',
    status: 'Идэвхтэй',
    pos: { top: '30%', left: '25%' },
    isAlert: true
  },
  'bayanzurkh': {
    id: 'bayanzurkh',
    name: 'Баянзүрх',
    purification: 96,
    volume: '18,200 m³',
    impact: 'Эерэг',
    status: 'Идэвхтэй',
    pos: { top: '45%', left: '70%' }
  },
  'khan-uul': {
    id: 'khan-uul',
    name: 'Хан-Уул',
    purification: 98.5,
    volume: '24,500 m³',
    impact: 'Аюулгүй',
    status: 'Идэвхтэй',
    pos: { top: '65%', left: '48%' }
  },
  'bayangol': {
    id: 'bayangol',
    name: 'Баянгол',
    purification: 92,
    volume: '15,100 m³',
    impact: 'Хэвийн',
    status: 'Идэвхтэй',
    pos: { top: '42%', left: '42%' }
  },
  'chingeltei': {
    id: 'chingeltei',
    name: 'Чингэлтэй',
    purification: 88,
    volume: '9,800 m³',
    impact: 'Хэвийн',
    status: 'Идэвхтэй',
    pos: { top: '25%', left: '45%' }
  },
  'sukhbaatar': {
    id: 'sukhbaatar',
    name: 'Сүхбаатар',
    purification: 95,
    volume: '14,200 m³',
    impact: 'Эерэг',
    status: 'Идэвхтэй',
    pos: { top: '18%', left: '55%' }
  }
};

// --- Components ---

const Sidebar = () => (
  <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 rounded-r-3xl bg-slate-50/90 backdrop-blur-2xl shadow-xl z-40 hidden md:flex flex-col p-6 space-y-2">
    <div className="mb-8 px-2">
      <h3 className="text-primary font-headline font-bold text-lg">Систем хариуцагч</h3>
      <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Улаанбаатар сектор</p>
    </div>
    <nav className="space-y-1 flex-1">
      <NavItem icon={<LayoutDashboard size={20} />} label="Хяналтын самбар" />
      <NavItem icon={<MapIcon size={20} />} label="Сүлжээний зураг" active />
      <NavItem icon={<LineChart size={20} />} label="Хэрэглээний шинжилгээ" />
      <NavItem icon={<Droplets size={20} />} label="Дэд бүтэц" />
      <NavItem icon={<AlertTriangle size={20} />} label="Сэрэмжлүүлэг" />
    </nav>
    <div className="pt-4 border-t border-outline-variant/20 space-y-1">
      <button className="w-full bg-error text-white font-bold py-3 rounded-xl shadow-lg shadow-error/20 hover:opacity-90 active:scale-95 transition-all text-xs mb-4">
        Яаралтай зогсолт
      </button>
      <div className="space-y-1">
        <button className="flex items-center gap-3 px-4 py-2 text-slate-500 text-xs font-medium hover:text-primary transition-all w-full text-left">
          <HelpCircle size={14} /> Тусламж
        </button>
        <button className="flex items-center gap-3 px-4 py-2 text-slate-500 text-xs font-medium hover:text-primary transition-all w-full text-left">
          <History size={14} /> Архив
        </button>
      </div>
    </div>
  </aside>
);

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 hover:translate-x-1 font-body text-sm font-medium ${active ? 'bg-primary text-white shadow-lg' : 'text-slate-600 hover:bg-slate-200'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const Navbar = () => (
  <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm h-20 flex justify-between items-center px-8">
    <div className="flex items-center gap-8">
      <div className="text-2xl font-black text-primary uppercase tracking-tighter font-headline">Aqueduct</div>
      <nav className="hidden lg:flex items-center gap-8 ml-8">
        <a href="#" className="text-slate-500 font-medium font-headline hover:text-primary transition-colors">Үндсэн</a>
        <a href="#" className="text-primary border-b-2 border-primary font-bold font-headline py-1 transition-colors">Сүлжээний зураг</a>
        <a href="#" className="text-slate-500 font-medium font-headline hover:text-primary transition-colors">Шинжилгээ</a>
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
        <input 
          className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-primary text-sm" 
          placeholder="Дүүрэг хайх..." 
          type="text"
        />
      </div>
      <button className="p-2 text-slate-500 hover:text-primary transition-all rounded-full hover:bg-slate-100">
        <Bell size={20} />
      </button>
      <button className="p-2 text-slate-500 hover:text-primary transition-all rounded-full hover:bg-slate-100">
        <Settings size={20} />
      </button>
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
        <img 
          alt="User profile" 
          src="https://picsum.photos/seed/user/100/100" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </header>
);

const DistrictMarker = ({ data, active, onClick }: { data: DistrictData; active: boolean; onClick: () => void; key?: string }) => {
  return (
    <motion.div 
      className="absolute cursor-pointer z-20"
      style={{ top: data.pos.top, left: data.pos.left, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div 
            key="active"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-10 h-10 bg-primary rounded-full ring-8 ring-primary/10 flex items-center justify-center shadow-2xl"
          >
            <Droplet className="text-white" size={18} fill="currentColor" />
          </motion.div>
        ) : (
          <motion.div 
            key="inactive"
            className="relative"
          >
            <div className={`w-4 h-4 ${data.purification > 90 ? 'bg-primary' : 'bg-primary/60'} rounded-full ring-4 ring-primary/20 shadow-md`} />
            {data.isAlert && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse border-2 border-white" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [selectedId, setSelectedId] = useState('khan-uul');
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  const selectedDistrict = districtsData[selectedId];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-primary overflow-hidden">
      <Navbar />
      <Sidebar />
      
      <main className="ml-0 md:ml-64 pt-20 h-screen relative flex flex-col overflow-hidden">
        {/* Background Map */}
        <div className="absolute inset-0 map-container flex items-center justify-center overflow-hidden pointer-events-none">
          <img 
            className="w-[120%] h-[120%] object-contain opacity-20 select-none max-w-none grayscale" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW4UiYm_IVeLjTcZ0rkp3tWV0MkKoyYv6lRO7NOTKetgdWpZqrrAl5oY5gqfPm2oIBS86zke0iBwBIIDgEA-rC8IBF2ncy9DvR8v5rrcr-joFvrRmq-eMk36HW64HHJ42R7wGLwhczyXRXYRaono5caw4-Ey-X9BsmzqRDhR2w8PkZ925Qd6nbdfalr6Am8IWHZz2x6SYrZAAV-RxZXsc-EPlJyOhacUiGMDTYOLOMNS2GmOjScOVl3WTcYzAwtmB5fcvsiYUEDbo" 
            alt="Ulaanbaatar Map"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Global Stats Floating Overlay */}
        <div className="absolute top-8 left-8 right-8 pointer-events-none z-10 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="pointer-events-auto">
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tight">Улаанбаатар хотын ус цэвэршүүлэлт</h1>
            <p className="text-on-surface-variant font-medium mt-1">Нийт 9 дүүргийн бодит цагийн мэдээлэл</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto glass-panel p-5 rounded-2xl shadow-xl min-w-[200px]"
          >
            <div className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest mb-1">Нийт цэвэршүүлэлт</div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-headline font-extrabold text-primary">94.2%</span>
              <span className="text-green-600 text-sm font-bold flex items-center mb-1.5 gap-1">
                <TrendingUp size={16} /> 1.2%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Interactive Map Layer */}
        <div className="flex-1 relative z-0" onClick={(e) => {
          if (e.target === e.currentTarget) setShowRightSidebar(!showRightSidebar);
        }}>
          {Object.values(districtsData).map((district) => (
            <DistrictMarker 
              key={district.id} 
              data={district} 
              active={selectedId === district.id}
              onClick={() => setSelectedId(district.id)}
            />
          ))}

          {/* Selected District Details Card */}
          <AnimatePresence mode="wait">
            {selectedDistrict && (
              <motion.div 
                key={selectedId}
                initial={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
                animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
                className="absolute z-30 pointer-events-auto"
                style={{ top: `calc(${selectedDistrict.pos.top} + 40px)`, left: selectedDistrict.pos.left }}
              >
                <div className="w-80 bg-primary text-white p-6 rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden relative">
                  {/* Decorative mesh gradient highlight */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 blur-3xl -mr-16 -mt-16" />
                  
                  <div className="flex justify-between items-center mb-4 relative">
                    <h4 className="font-headline font-extrabold text-xl">{selectedDistrict.name}</h4>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {selectedDistrict.status}
                    </span>
                  </div>

                  <div className="space-y-6 relative">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-headline font-extrabold">{selectedDistrict.purification}%</div>
                      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedDistrict.purification}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-5">
                      <div className="space-y-1">
                        <div className="text-[10px] opacity-60 uppercase font-black tracking-widest">Эзлэхүүн</div>
                        <div className="text-base font-bold">{selectedDistrict.volume}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] opacity-60 uppercase font-black tracking-widest">Байгаль орчин</div>
                        <div className="text-base font-bold text-blue-200">{selectedDistrict.impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend & Zoom Controls */}
        <div className="absolute bottom-10 left-10 flex items-end gap-6 z-20 pointer-events-none">
          <div className="pointer-events-auto glass-panel p-6 rounded-[2rem] w-64">
            <h5 className="text-[10px] font-black text-primary mb-5 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-3 bg-primary rounded-full"></span>
              Дүүргийн үзүүлэлт
            </h5>
            <div className="space-y-4">
              <LegendItem color="bg-primary" label="90%+ Цэвэршилт" />
              <LegendItem color="bg-blue-400" label="70-90% Цэвэршилт" />
              <LegendItem color="bg-orange-400" label="Засвартай" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 pointer-events-auto">
            <ControlButton icon={<Plus size={20} />} />
            <ControlButton icon={<Minus size={20} />} />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white p-4 rounded-2xl shadow-xl mt-2 flex items-center justify-center"
            >
              <Navigation size={20} className="rotate-45" fill="currentColor" />
            </motion.button>
          </div>
        </div>

        {/* Right Sidebar - District List */}
        <AnimatePresence>
          {showRightSidebar && (
            <motion.div 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute top-32 right-8 w-80 h-[calc(100%-12rem)] z-10 hidden lg:block"
            >
              <div className="glass-panel h-full p-6 rounded-[2.5rem] flex flex-col">
                <h3 className="font-headline font-extrabold text-primary text-xl mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  Дүүргийн жагсаалт
                </h3>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar px-1">
                  {Object.values(districtsData).map((district) => (
                    <motion.button
                      key={district.id}
                      onClick={() => setSelectedId(district.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-5 rounded-2xl transition-all border ${selectedId === district.id ? 'bg-primary text-white border-primary shadow-xl' : 'bg-white/50 border-white hover:bg-white/80'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-sm">{district.name}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${selectedId === district.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {district.purification > 90 ? 'Хэвийн' : 'Идэвхтэй'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${selectedId === district.id ? 'bg-white/20' : 'bg-slate-200'}`}>
                          <div 
                            className={`h-full transition-all duration-1000 ${selectedId === district.id ? 'bg-white shadow-[0_0_8px_white]' : 'bg-primary'}`} 
                            style={{ width: `${district.purification}%` }} 
                          />
                        </div>
                        <span className={`text-xs font-black ${selectedId === district.id ? 'text-white' : 'text-primary'}`}>
                          {district.purification}%
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-outline-variant/30">
                  <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                    <FileDown size={18} /> Тайлан татах
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl flex justify-around items-center py-4 px-6 z-50 shadow-[0_-12px_24px_rgba(0,0,0,0.05)] border-t border-slate-100">
        <MobileNavItem icon={<LayoutDashboard size={22} />} label="Үндсэн" />
        <MobileNavItem icon={<MapIcon size={22} />} label="Газрын зураг" active />
        <MobileNavItem icon={<LineChart size={22} />} label="Шинжилгээ" />
        <MobileNavItem icon={<Settings size={22} />} label="Тохиргоо" />
      </nav>
    </div>
  );
}

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-3.5 h-3.5 rounded-full ${color} shadow-sm border border-white/50`} />
    <span className="text-xs font-semibold text-on-surface-variant">{label}</span>
  </div>
);

const ControlButton = ({ icon }: { icon: React.ReactNode }) => (
  <motion.button 
    whileHover={{ scale: 1.05, backgroundColor: '#002452', color: '#ffffff' }}
    whileTap={{ scale: 0.95 }}
    className="bg-white/80 backdrop-blur-md text-primary p-4 rounded-2xl shadow-lg border border-white transition-colors"
  >
    {icon}
  </motion.button>
);

const MobileNavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button className={`flex flex-col items-center gap-1 ${active ? 'text-primary' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);
