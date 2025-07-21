
import { Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-600 mt-2">Vue d'ensemble de votre communauté</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Membres actifs"
          value="324"
          description="Total des membres"
          icon={Users}
          trend="up"
          trendValue="+12"
        />
        <StatCard
          title="Événements ce mois"
          value="8"
          description="Événements programmés"
          icon={Calendar}
          trend="neutral"
          trendValue="0"
        />
        <StatCard
          title="Dons collectés"
          value="15 240 €"
          description="Ce mois-ci"
          icon={DollarSign}
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Participation moyenne"
          value="85%"
          description="Aux événements"
          icon={TrendingUp}
          trend="up"
          trendValue="+5%"
        />
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[
              { type: "member", text: "Marie Dubois a rejoint la communauté", time: "Il y a 2h" },
              { type: "event", text: "Service dominical programmé", time: "Il y a 4h" },
              { type: "donation", text: "Don de 250€ reçu", time: "Il y a 1j" },
              { type: "member", text: "Nouveau groupe de prière créé", time: "Il y a 2j" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === "member" ? "bg-green-500" :
                  activity.type === "event" ? "bg-blue-500" : "bg-amber-500"
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.text}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Événements à venir</h2>
          <div className="space-y-4">
            {[
              { title: "Service dominical", date: "Dimanche 2 juin", time: "10h00", attendees: 150 },
              { title: "Étude biblique", date: "Mercredi 5 juin", time: "19h30", attendees: 35 },
              { title: "Groupe de jeunes", date: "Vendredi 7 juin", time: "18h00", attendees: 25 },
              { title: "Réunion de prière", date: "Samedi 8 juin", time: "9h00", attendees: 20 },
            ].map((event, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-900">{event.title}</h3>
                    <p className="text-sm text-slate-600">{event.date} à {event.time}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {event.attendees} inscrits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
