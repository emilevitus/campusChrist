import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ProfilMembre: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    date_naissance: "",
    sexe: "",
    statut: "",
  });

  useEffect(() => {
    const membreStocke = localStorage.getItem("membreConnecte");
    const membre = membreStocke ? JSON.parse(membreStocke) : null;

    if (membre && membre.id) {
      // Tu pourrais ici aussi faire un fetch pour rafraîchir ses infos depuis l’API
      setFormData(membre);
      setIsLoading(false);
    } else {
      toast({
        title: "Non connecté",
        description: "Veuillez vous connecter pour accéder à votre profil.",
        variant: "destructive",
      });
      navigate("/connexion");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/membres/${formData.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Profil mis à jour",
          description: "Vos informations ont été sauvegardées.",
        });
        localStorage.setItem("membreConnecte", JSON.stringify(formData));
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le profil.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur réseau",
        description: "Une erreur s’est produite.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10 text-blue-600">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg rounded-xl">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-bold text-center text-blue-700">Mon Profil</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nom</Label>
              <Input name="nom" value={formData.nom} onChange={handleChange} required />
            </div>
            <div>
              <Label>Prénom</Label>
              <Input name="prenom" value={formData.prenom} onChange={handleChange} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input name="telephone" value={formData.telephone} onChange={handleChange} />
            </div>
            <div>
              <Label>Adresse</Label>
              <Input name="adresse" value={formData.adresse} onChange={handleChange} />
            </div>
            <div>
              <Label>Date de naissance</Label>
              <Input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} />
            </div>
            <div>
              <Label>Sexe</Label>
              <select name="sexe" value={formData.sexe} onChange={handleChange} className="w-full border rounded-md p-2">
                <option value="">-- Choisissez --</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <Label>Statut</Label>
              <select name="statut" value={formData.statut} onChange={handleChange} className="w-full border rounded-md p-2">
                <option value="Non Baptisé">Non Baptisé</option>
                <option value="Baptisé">Baptisé</option>
              </select>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Retour à l’accueil
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilMembre;