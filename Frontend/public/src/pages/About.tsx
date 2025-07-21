
import { Users, Target, Heart, BookOpen } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">À propos de CampusChrist</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Découvrez notre histoire, notre vision et les valeurs qui nous animent depuis notre création
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Notre histoire</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-xl leading-relaxed mb-6">
                CampusChrist est née en 2016 d'une vision divine reçue par un groupe de jeunes passionnés 
                par l'évangélisation et l'édification de la communauté chrétienne. Ce qui a commencé comme 
                de simples réunions de prière dans un salon s'est transformé en une église dynamique qui 
                impact aujourd'hui des centaines de vies.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Notre nom "CampusChrist" reflète notre cœur pour la jeunesse et notre désir de voir 
                une génération entière transformée par l'amour du Christ. Nous croyons que chaque 
                personne a un potentiel divin à découvrir et à développer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Nos valeurs fondamentales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Amour",
                description: "L'amour de Dieu est au centre de tout ce que nous faisons",
                color: "bg-red-500"
              },
              {
                icon: Users,
                title: "Communauté",
                description: "Nous croyons en la force des relations authentiques",
                color: "bg-blue-500"
              },
              {
                icon: Target,
                title: "Excellence",
                description: "Nous visons l'excellence dans notre service à Dieu",
                color: "bg-green-500"
              },
              {
                icon: BookOpen,
                title: "Vérité",
                description: "La Parole de Dieu est notre fondement et notre guide",
                color: "bg-amber-500"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className={`${value.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe de direction */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Équipe pastorale</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Pasteur Jean-Marc Dubois",
                role: "Pasteur principal",
                description: "Visionnaire et fondateur, passionné par l'évangélisation",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Pasteur Marie Dubois",
                role: "Pasteur associée",
                description: "Spécialisée dans l'accompagnement familial et féminin",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Pasteur David Martin",
                role: "Pasteur jeunesse",
                description: "Responsable des ministères jeunes et campus",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-slate-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
