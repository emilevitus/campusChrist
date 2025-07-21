
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">CampusChrist</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Une communauté de foi dynamique où chacun peut grandir spirituellement 
              et découvrir sa destinée en Christ. Rejoignez-nous dans cette aventure de foi !
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-slate-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">123 Avenue de la Paix<br />75001 Paris</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">01 23 45 67 89</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">contact@campuschrist.fr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horaires des cultes */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Horaires des cultes</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400">Dimanche</h4>
                <p className="text-slate-300">10h00 - 12h00</p>
                <p className="text-sm text-slate-400">Culte principal</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-400">Mercredi</h4>
                <p className="text-slate-300">19h30 - 21h00</p>
                <p className="text-sm text-slate-400">Étude biblique</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400">Vendredi</h4>
                <p className="text-slate-300">19h30 - 21h30</p>
                <p className="text-sm text-slate-400">Soirée jeunes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 CampusChrist. Tous droits réservés. Fait avec ❤️ pour la gloire de Dieu.
          </p>
        </div>
      </div>
    </footer>
  );
}
