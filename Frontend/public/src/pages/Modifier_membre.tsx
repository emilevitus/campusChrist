import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Membre {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  date_naissance?: string;
  sexe?: string;
  statut?: string;
}

interface Props {
  membre: Membre;
  onCancel: () => void;
  onUpdated: () => void;
}

const ModifierMembre: React.FC<Props> = ({ membre, onCancel, onUpdated }) => {
  const [formData, setFormData] = useState(membre);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/membres/api/modifier/${formData.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast({
          title: "Modifié avec succès",
          description: "Les informations du membre ont été mises à jour.",
        });
        onUpdated();
      } else {
        toast({
          title: "Erreur",
          description: "Échec de la modification.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur serveur",
        description: "Impossible de modifier ce membre.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Modifier : {formData.nom} {formData.prenom}
      </h2>
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
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Téléphone</Label>
          <Input name="telephone" value={formData.telephone} onChange={handleChange} />
        </div>
        <div>
          <Label>Adresse</Label>
          <Input name="adresse" value={formData.adresse || ""} onChange={handleChange} />
        </div>
        <div>
          <Label>Date de naissance</Label>
          <Input
            type="date"
            name="date_naissance"
            value={formData.date_naissance || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Sexe</Label>
          <select
            name="sexe"
            value={formData.sexe || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Choisir --</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div>
          <Label>Statut</Label>
          <select
            name="statut"
            value={formData.statut || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="Non Baptisé">Non Baptisé</option>
            <option value="Baptisé">Baptisé</option>
          </select>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModifierMembre;