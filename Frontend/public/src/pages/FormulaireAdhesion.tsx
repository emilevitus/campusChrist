import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

const FormulaireAdhesion = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mot_de_passe: "",
    telephone: "",
    adresse: "",
    date_naissance: "",
    sexe: "",
    statut: "Non Baptisé",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const isPasswordStrong = (password) => {
    const strongRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mot_de_passe") {
      setPasswordError(
        isPasswordStrong(value)
          ? ""
          : "Mot de passe trop faible (8 caractères min, 1 majuscule, 1 chiffre)"
      );
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong(formData.mot_de_passe)) {
      toast({
        title: "Erreur",
        description: "Mot de passe trop faible. Veuillez corriger.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/membres/api/adhesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Demande d’adhésion envoyée avec succès.",
        });

        // Réinitialiser le formulaire
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          mot_de_passe: "",
          telephone: "",
          adresse: "",
          date_naissance: "",
          sexe: "",
          statut: "Non Baptisé",
        });
      } else {
        const err = await response.json();
        toast({
          title: "Erreur",
          description: "Erreur lors de l’envoi : " + JSON.stringify(err),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-700">
            Formulaire d'adhésion
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input name="nom" value={formData.nom} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input name="prenom" value={formData.prenom} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="mot_de_passe">Mot de passe</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-3 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <Label>Téléphone</Label>
              <PhoneInput
                country="ca"
                value={formData.telephone}
                onChange={(value) => setFormData({ ...formData, telephone: value })}
                inputClass="form-control"
              />
            </div>
            <div>
              <Label htmlFor="adresse">Adresse</Label>
              <Input name="adresse" value={formData.adresse} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="date_naissance">Date de naissance</Label>
              <Input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="sexe">Sexe</Label>
              <select
                name="sexe"
                value={formData.sexe}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md p-2"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <Label htmlFor="statut">Statut</Label>
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md p-2"
              >
                <option value="Non Baptisé">Non Baptisé</option>
                <option value="Baptisé">Baptisé</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Envoyer la demande
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaireAdhesion;
