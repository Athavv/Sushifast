export async function getMenu() {
  try {
    const response = await fetch("/data/boxes.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du menu");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement du menu:", error);
    return [];
  }
}

export async function getMenuById(id) {
  try {
    const menus = await getMenu();
    return menus.find((m) => String(m.id) === String(id)) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du menu:", error);
    return null;
  }
}
