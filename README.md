# Portfolio - Mohamed El-Ghazoui

Portfolio personnel moderne et interactif de **Mohamed El-Ghazoui**, étudiant
ingénieur en Informatique et Réseaux à l'EMSI Rabat.

Le site présente mon profil, mon parcours académique, mes compétences
techniques, mes certifications, mes projets réalisés et mes coordonnées dans
une interface futuriste, responsive et immersive.

## Aperçu

- Hero section avec portrait personnel et téléchargement du CV
- Présentation du profil et du parcours EMSI
- Compétences classées par catégories techniques
- Projets filtrables avec recherche et détails en fenêtre modale
- Timeline des formations et cartes de certifications
- Langues, qualités humaines et centres d'intérêt
- Formulaire de contact fonctionnel avec Web3Forms
- Thèmes visuels, palette de commandes et terminal interactif
- Design responsive adapté aux écrans mobiles et desktop

## Technologies

- [Next.js](https://nextjs.org/) 15 avec App Router
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- CSS personnalisé pour le design, les animations et le responsive
- [Web3Forms](https://web3forms.com/) pour la réception des messages de contact

## Installation

### Prérequis

- Node.js 18.18 ou version supérieure
- npm

### Lancer le projet localement

```bash
git clone <url-du-depot>
cd "Mon projet"
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000) dans le navigateur.

Pour utiliser le port `4173`, comme dans la version locale de démonstration :

```bash
npm run dev -- -H 127.0.0.1 -p 4173
```

Puis ouvrir [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Configuration du formulaire de contact

Le formulaire utilise Web3Forms pour envoyer les messages.

1. Créer un fichier `.env.local` à la racine du projet.
2. Ajouter la clé d'accès Web3Forms :

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Un modèle est disponible dans `.env.example`.

Le fichier `.env.local` est ignoré par Git afin d'éviter de publier la clé de
configuration dans le dépôt.

## Commandes disponibles

```bash
npm run dev
```

Démarre le serveur de développement.

```bash
npm run build
```

Génère la version optimisée de production.

```bash
npm run start
```

Démarre l'application construite en mode production.

```bash
npm run lint
```

Lance la vérification ESLint configurée par Next.js.

## Structure du projet

```text
app/
  globals.css          Styles importés par l'application Next.js
  layout.tsx           Layout racine et métadonnées SEO
  page.tsx             Page principale et données structurées
components/
  ContactForm.tsx      Formulaire de contact et envoi Web3Forms
  Portfolio.tsx        Interface principale et interactions
public/assets/
  CV-EL-GHAZOUI-Mohamed.pdf
  mohamed-el-ghazoui.jpeg
.env.example           Exemple de variable d'environnement
styles.css             Direction visuelle et animations du portfolio
```

## Sections du portfolio

- Accueil
- A propos
- Competences
- Projets
- Formations
- Certifications
- Profil personnel
- Contact

## Contact

- Email : [elghazoui.md@gmail.com](mailto:elghazoui.md@gmail.com)
- LinkedIn : [mohamed-el-ghazoui](https://www.linkedin.com/in/mohamed-el-ghazoui)
- GitHub : [Med-EL-GHAZOUI](https://github.com/Med-EL-GHAZOUI)

## Auteur

**Mohamed El-Ghazoui**  
Etudiant ingenieur en Informatique et Reseaux  
EMSI Rabat, Maroc
