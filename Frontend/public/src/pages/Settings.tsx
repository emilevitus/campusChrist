
import { Bell, Lock, User, Globe, Database, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Settings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-600 mt-2">Configurez votre application de gestion d'église</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { icon: User, label: "Profil", active: true },
              { icon: Bell, label: "Notifications" },
              { icon: Lock, label: "Sécurité" },
              { icon: Globe, label: "Général" },
              { icon: Database, label: "Données" },
              { icon: Mail, label: "Email" },
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Informations du profil</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue="Administrateur" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue="Système" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@eglise.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="06 12 34 56 78" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button>Sauvegarder les modifications</Button>
            </div>
          </div>

          {/* Church Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Informations de l'église</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="churchName">Nom de l'église</Label>
                <Input id="churchName" defaultValue="Église Évangélique de la Ville" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" defaultValue="123 Rue de la Paix, 75001 Paris" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="churchPhone">Téléphone</Label>
                  <Input id="churchPhone" defaultValue="01 23 45 67 89" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="churchEmail">Email</Label>
                  <Input id="churchEmail" type="email" defaultValue="contact@eglise.com" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button>Sauvegarder</Button>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Paramètres système</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Notifications par email</p>
                  <p className="text-sm text-slate-500">Recevoir des notifications pour les nouveaux membres</p>
                </div>
                <Button variant="outline" size="sm">Activé</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Sauvegarde automatique</p>
                  <p className="text-sm text-slate-500">Sauvegarder les données quotidiennement</p>
                </div>
                <Button variant="outline" size="sm">Activé</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Mode maintenance</p>
                  <p className="text-sm text-slate-500">Désactiver l'accès public temporairement</p>
                </div>
                <Button variant="outline" size="sm">Désactivé</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
