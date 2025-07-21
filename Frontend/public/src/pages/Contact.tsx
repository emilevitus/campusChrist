
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Nous serions ravis de vous rencontrer et de répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prénom</label>
                    <Input placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                    <Input placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <Input type="email" placeholder="votre.email@exemple.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                  <Input type="tel" placeholder="01 23 45 67 89" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sujet</label>
                  <Input placeholder="Objet de votre message" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <Textarea 
                    placeholder="Votre message..." 
                    rows={6}
                  />
                </div>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Informations de contact */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Adresse</h3>
                    <p className="text-slate-600">123 Avenue de la Paix</p>
                    <p className="text-slate-600">75001 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Téléphone</h3>
                    <p className="text-slate-600">01 23 45 67 89</p>
                    <p className="text-slate-600 text-sm">Lun-Ven 9h-17h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">contact@campuschrist.fr</p>
                    <p className="text-slate-600">pasteur@campuschrist.fr</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-3 mr-4">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Horaires d'ouverture</h3>
                    <p className="text-slate-600">Dimanche: 9h - 13h</p>
                    <p className="text-slate-600">Mercredi: 19h - 21h</p>
                    <p className="text-slate-600">Vendredi: 18h - 22h</p>
                  </div>
                </div>
              </div>

              {/* Urgences */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-2">En cas d'urgence</h3>
                <p className="text-red-700 mb-3">
                  Pour les urgences pastorales en dehors des heures d'ouverture:
                </p>
                <p className="font-semibold text-red-900">06 12 34 56 78</p>
                <p className="text-red-600 text-sm">Disponible 24h/24</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte et localisation */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Comment nous trouver</h2>
          <div className="bg-slate-300 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-600">Carte interactive à venir</p>
              <p className="text-sm text-slate-500">123 Avenue de la Paix, 75001 Paris</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Accès et transport</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-2">🚇 Métro</h4>
                <p className="text-slate-600">Ligne 1 - Station Concorde</p>
                <p className="text-slate-600">5 min à pied</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-2">🚌 Bus</h4>
                <p className="text-slate-600">Lignes 21, 27, 39, 68</p>
                <p className="text-slate-600">Arrêt Place Vendôme</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-2">🚗 Parking</h4>
                <p className="text-slate-600">Parking Place Vendôme</p>
                <p className="text-slate-600">2€/heure le dimanche</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
