
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  className 
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-sm font-medium",
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-slate-600"
              )}>
                {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {trendValue}
              </span>
              <span className="text-sm text-slate-500 ml-1">ce mois</span>
            </div>
          )}
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
