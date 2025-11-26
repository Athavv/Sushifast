export async function getMenu() {
  try {
    const response = await fetch("../../public/data/boxes.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du menu");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
