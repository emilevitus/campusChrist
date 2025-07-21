
import { Calendar, MapPin, Clock, Users, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bienvenue à
            <span className="block text-amber-400">CampusChrist</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Une communauté de foi dynamique où chacun peut grandir spirituellement et découvrir sa destinée en Christ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg">
              Rejoindre un culte
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg">
              Découvrir notre communauté
            </Button>
          </div>
        </div>
      </section>

      {/* Prochains événements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Prochains événements</h2>
            <p className="text-xl text-slate-600">Rejoignez-nous pour ces moments spéciaux</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Culte dominical",
                date: "Dimanche 2 juin",
                time: "10h00",
                location: "Auditorium principal",
                description: "Message inspirant et temps de louange",
                color: "bg-blue-600"
              },
              {
                title: "Soirée jeunes",
                date: "Vendredi 7 juin",
                time: "19h30",
                location: "Salle communautaire",
                description: "Temps de partage et d'adoration pour les 18-35 ans",
                color: "bg-green-600"
              },
              {
                title: "École du dimanche",
                date: "Dimanche 2 juin",
                time: "9h00",
                location: "Salles d'enfants",
                description: "Enseignement biblique adapté aux enfants",
                color: "bg-amber-600"
              }
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${event.color} p-4 text-white`}>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <div className="flex items-center mt-2 text-sm opacity-90">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-slate-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <p className="text-slate-700 mb-4">{event.description}</p>
                  <Button className="w-full">S'inscrire</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques de la communauté */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Notre communauté</h2>
            <p className="text-xl text-slate-600">Des chiffres qui témoignent de la grâce de Dieu</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Membres actifs"
              value="450+"
              description="Familles engagées"
              icon={Users}
              trend="up"
              trendValue="+25"
            />
            <StatCard
              title="Événements par mois"
              value="15"
              description="Cultes et activités"
              icon={Calendar}
              trend="neutral"
              trendValue="0"
            />
            <StatCard
              title="Groupes de maison"
              value="12"
              description="Communautés locales"
              icon={Heart}
              trend="up"
              trendValue="+3"
            />
            <StatCard
              title="Années d'existence"
              value="8"
              description="Au service de Dieu"
              icon={BookOpen}
              trend="up"
              trendValue="+1"
            />
          </div>
        </div>
      </section>

      {/* Vision et mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Notre vision</h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                CampusChrist est une église dynamique qui croit en la transformation des vies par l'amour de Jésus-Christ. 
                Nous aspirons à être une communauté où chaque personne peut découvrir sa destinée divine et grandir dans la foi.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Amour inconditionnel</h4>
                    <p className="text-slate-600">Accueillir chacun avec l'amour du Christ</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Communauté authentique</h4>
                    <p className="text-slate-600">Créer des relations profondes et durables</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-2 mr-4 mt-1">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Croissance spirituelle</h4>
                    <p className="text-slate-600">Accompagner chacun dans son parcours de foi</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">✝️</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Verset de la semaine</h3>
                <blockquote className="text-lg italic text-slate-700 mb-4">
                  "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, 
                  afin de vous donner un avenir et de l'espérance."
                </blockquote>
                <cite className="text-blue-600 font-semibold">Jérémie 29:11</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à nous rejoindre ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Que vous soyez en recherche spirituelle ou déjà engagé dans la foi, 
            il y a une place pour vous dans notre communauté.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Planifier une visite
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
