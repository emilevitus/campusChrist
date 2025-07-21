
import { Clock, MapPin, Users, Music, Baby, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Nos services</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Découvrez nos différents moments de culte et activités communautaires
          </p>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Culte dominical */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 rounded-full p-3 mr-4">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Culte dominical</h2>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-slate-700">
                  <Clock className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="font-semibold">Dimanche 10h00 - 12h00</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <span>Auditorium principal - 123 Avenue de la Paix</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Users className="w-5 h-5 mr-3 text-blue-600" />
                  <span>Tous âges bienvenus</span>
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Notre service principal de la semaine avec louange dynamique, 
                prédication inspirante et temps de communion fraternelle. 
                Venez comme vous êtes !
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Planifier ma visite
              </Button>
            </div>

            {/* Culte du mercredi */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 rounded-full p-3 mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Culte du mercredi</h2>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-slate-700">
                  <Clock className="w-5 h-5 mr-3 text-green-600" />
                  <span className="font-semibold">Mercredi 19h30 - 21h00</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <MapPin className="w-5 h-5 mr-3 text-green-600" />
                  <span>Salle communautaire</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Users className="w-5 h-5 mr-3 text-green-600" />
                  <span>Atmosphère intime</span>
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Un moment plus intime d'étude biblique approfondie, 
                de prière collective et de partage personnel. 
                Parfait pour grandir spirituellement.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Me joindre au groupe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ministères spécialisés */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Ministères spécialisés</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Baby,
                title: "Ministère enfants",
                age: "0-12 ans",
                time: "Dimanche 10h00",
                description: "École du dimanche avec enseignement adapté, jeux et activités créatives",
                color: "bg-pink-500"
              },
              {
                icon: GraduationCap,
                title: "Ministère jeunes",
                age: "13-25 ans",
                time: "Vendredi 19h30",
                description: "Soirées dynamiques avec louange moderne, enseignement pratique et fellowship",
                color: "bg-orange-500"
              },
              {
                icon: Users,
                title: "Groupes de maison",
                age: "Tous âges",
                time: "Samedi 19h00",
                description: "Communautés locales pour partage, prière et croissance spirituelle",
                color: "bg-purple-500"
              }
            ].map((ministry, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className={`${ministry.color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                  <ministry.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{ministry.title}</h3>
                <div className="flex items-center text-slate-600 mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{ministry.age}</span>
                </div>
                <div className="flex items-center text-slate-600 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{ministry.time}</span>
                </div>
                <p className="text-slate-700 mb-4">{ministry.description}</p>
                <Button variant="outline" className="w-full">
                  En savoir plus
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires et infos pratiques */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Informations pratiques</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Horaires des services</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium">Culte dominical</span>
                    <span className="text-slate-600">10h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium">École du dimanche</span>
                    <span className="text-slate-600">10h00 - 11h30</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium">Culte du mercredi</span>
                    <span className="text-slate-600">19h30 - 21h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Soirée jeunes</span>
                    <span className="text-slate-600">Vendredi 19h30</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Adresse et contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">123 Avenue de la Paix</p>
                      <p className="text-slate-600">75001 Paris, France</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 h-5 text-blue-600 mr-3 text-center">📞</span>
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 h-5 text-blue-600 mr-3 text-center">✉️</span>
                    <span>contact@campuschrist.fr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
