
import { DollarSign, TrendingUp, TrendingDown, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";

export function Finances() {
  const transactions = [
    { id: 1, type: "Recette", description: "Dîmes et offrandes", amount: 1250, date: "2024-05-28", category: "Dons" },
    { id: 2, type: "Dépense", description: "Électricité", amount: -280, date: "2024-05-27", category: "Charges" },
    { id: 3, type: "Recette", description: "Don spécial - Mission", amount: 500, date: "2024-05-26", category: "Missions" },
    { id: 4, type: "Dépense", description: "Matériel audio", amount: -450, date: "2024-05-25", category: "Équipement" },
    { id: 5, type: "Recette", description: "Offrande spéciale", amount: 300, date: "2024-05-24", category: "Dons" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Finances</h1>
          <p className="text-slate-600 mt-2">Gérez les finances de votre église</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle transaction
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Solde actuel"
          value="24 820 €"
          description="Trésorerie disponible"
          icon={DollarSign}
          trend="up"
          trendValue="+5.2%"
        />
        <StatCard
          title="Recettes ce mois"
          value="15 240 €"
          description="Dons et offrandes"
          icon={TrendingUp}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Dépenses ce mois"
          value="8 950 €"
          description="Charges et frais"
          icon={TrendingDown}
          trend="down"
          trendValue="-3%"
        />
        <StatCard
          title="Bénéfice net"
          value="6 290 €"
          description="Ce mois-ci"
          icon={TrendingUp}
          trend="up"
          trendValue="+18%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Transactions récentes</h2>
            <Button variant="outline" size="sm">Voir tout</Button>
          </div>
          
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'Recette' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'Recette' ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Budget par catégorie</h2>
          
          <div className="space-y-4">
            {[
              { name: "Charges fixes", budgeted: 3000, spent: 2850, color: "blue" },
              { name: "Missions", budgeted: 2000, spent: 1500, color: "green" },
              { name: "Équipement", budgeted: 1500, spent: 450, color: "purple" },
              { name: "Événements", budgeted: 1000, spent: 650, color: "amber" },
            ].map((category, index) => {
              const percentage = (category.spent / category.budgeted) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{category.name}</span>
                    <span className="text-sm text-slate-500">
                      {category.spent}€ / {category.budgeted}€
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`bg-${category.color}-500 h-2 rounded-full transition-all`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {percentage.toFixed(0)}% utilisé
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
