import axios from "axios";

const API_URL = "http://127.0.0.1:8000/membres/api/";

export const getMembres = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    return [];
  }
};

export const addMembre = async (membre) => {
  try {
    const response = await axios.post(API_URL, membre);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l’ajout du membre :", error);
  }
};

export const updateMembre = async (id, membre) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, membre);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du membre :", error);
  }
};

export const deleteMembre = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error("Erreur lors de la suppression du membre :", error);
  }
};