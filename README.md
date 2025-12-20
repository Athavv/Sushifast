# SushiFast

**Auteurs :** Aathavan Thevakumar et Warrick Mansoibou

Application React moderne pour la promotion et la gestion des menus du restaurant SushiFast.

## Description

SushiFast est une application web développée avec React et Vite permettant aux clients de découvrir les différents menus proposés par le restaurant, avec leurs ingrédients, quantités, saveurs et tarifs.

## Démarrage rapide

### Prérequis

- **Node.js**
- **npm** 

### Installation

1. Cloner le repository :
```bash
git clone https://github.com/Athavv/Sushifast
cd Sushifast
```

2. Installer les dépendances :
```bash
npm install
```

> **En cas d'erreur lors du lancement**, exécutez à nouveau `npm install` pour réinstaller les dépendances.

### Lancement de l'application

#### Mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

## Lien du site

🔗 [Voir le site en ligne](https://athawa-sushifast.vercel.app/)

## Technologies utilisées

- **React**
- **Vite**
- **React Router DOM**
- **React Bootstrap**
- **Bootstrap** 

## Structure du projet

```
src/
├── components/      # Composants réutilisables (Header, Footer, Sidebar, Hero)
├── pages/           # Pages de l'application (Accueil, MenuDetail)
├── styles/          # Fichiers CSS spécifiques
├── utils/           # Utilitaires et services
├── assets/          # Ressources statiques (vidéos, images)
└── App.jsx          # Composant principal
```

## Fonctionnalités

- Affichage de tous les menus avec leurs informations (nom, pièces, image, prix)
- Présentation des saveurs de chaque menu
- Filtrage par saveurs (avocat, coriandre, etc.)
- Liste des aliments d'un menu donné
- Filtrage des menus sans "California Saumon Avocat"
- Calcul du prix total pour les menus < 13 pièces
- Affichage du menu le plus cher et le moins cher
- Recherche de menus
- Filtrage par nombre de pièces
- Interface responsive

## Données

Les données des menus sont stockées dans `public/data/boxes.json` et chargées dynamiquement par l'application.

