import { useEffect, useState } from "react";
import { Search, Plus, Filter, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import ModifierMembre from "./Modifier_membre";

export function Members() {
  const navigate = useNavigate();
  const [membres, setMembres] = useState([]);
  const [filteredMembres, setFilteredMembres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedMembre, setSelectedMembre] = useState(null);

  const fetchMembres = () => {
    fetch("http://127.0.0.1:8000/membres/api/membres")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données récupérées :", data);
        setMembres(data);
        setFilteredMembres(data);
      })
      .catch((error) => console.error("Erreur récupération membres :", error));
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  useEffect(() => {
    const results = membres.filter((membre) =>
      membre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membre.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membre.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembres(results);
  }, [searchTerm, membres]);

  const handleModifierClick = (membre) => {
    setSelectedMembre(membre);
    setShowForm(true);
  };

  const deleteMembre = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/membres/api/supprimer/${id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Membre supprimé avec succès !");
        fetchMembres();
      } else {
        alert("Erreur lors de la suppression !");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite !");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Gestion des membres</h1>
        <p className="text-slate-600 mt-2">Gérez les informations de votre communauté</p>
      </div>

      {/* Barre d'actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un membre..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button onClick={() => navigate("/admin/Ajout_membre")}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau membre
          </Button>
        </div>
      </div>

      {/* Tableau des membres */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Nom</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Rôle</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Membre depuis</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Statut</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMembres.map((membre) => (
                <tr key={membre.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-600">
                          {membre.nom[0]}{membre.prenom[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{membre.nom} {membre.prenom}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        {membre.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        {membre.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {membre.role || "Membre"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {new Date(membre.date_inscription || membre.date_naissance).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      membre.statut === "Actif"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {membre.statut}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
                            deleteMembre(membre.id);
                          }
                        }}
                      >
                        Supprimer
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleModifierClick(membre)}
                      >
                        Modifier
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulaire de modification si affiché */}
      {showForm && selectedMembre && (
        <ModifierMembre
          membre={selectedMembre}
          onCancel={() => setShowForm(false)}
          onUpdated={() => {
            setShowForm(false);
            fetchMembres();
          }}
        />
      )}
    </div>
  );
}