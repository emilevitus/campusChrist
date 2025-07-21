
import { Calendar, DollarSign, Home, Settings, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Tableau de bord", url: "/admin", icon: Home },
  { title: "Membres", url: "/admin/members", icon: Users },
  { title: "Événements", url: "/admin/events", icon: Calendar },
  { title: "Finances", url: "/admin/finances", icon: DollarSign },
  { title: "Paramètres", url: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-slate-900 text-white transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">É</span>
            </div>
            <h1 className="font-bold text-lg">ÉgliseAdmin</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-slate-800 rounded transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.title}>
                <Link
                  to={item.url}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon size={20} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Lien vers le site public */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/" 
            className="flex items-center text-slate-300 hover:text-white transition-colors text-sm"
          >
            ← Retour au site public
          </Link>
        </div>
      )}

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
            <div className="text-sm">
              <p className="font-medium">Admin</p>
              <p className="text-slate-400">Administrateur</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
