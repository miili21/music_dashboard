import { Heart, Globe, ArrowUpDown } from "lucide-react";

interface LeftMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function LeftMenu({ activeTab, setActiveTab }: LeftMenuProps) {
  const menuItems = [
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "global", icon: Globe, label: "Global Reach" },
    { id: "sort", icon: ArrowUpDown, label: "Sort Metrics" },
  ];

  return (
    <div className="flex flex-col items-center justify-between py-8 px-3 w-16 h-[85vh] rounded-full border border-white/20 glass-panel relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Top Logo / Accent */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-orange-500 shadow-lg cursor-pointer hover:scale-105 transition">
        <span className="text-white text-xs font-black">PC</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-6 my-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-linear-to-tr from-pink-500/80 to-orange-500/80 text-white scale-110 shadow-[0_0_12px_rgba(236,72,153,0.5)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
              title={item.label}
              id={`left-menu-btn-${item.id}`}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-20 top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-white text-[11px] font-medium tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200 z-50 shadow-xl uppercase font-mono">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Decorative Bottom Dot or Indicator */}
      <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
        <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 opacity-60"></div>
      </div>
    </div>
  );
}
