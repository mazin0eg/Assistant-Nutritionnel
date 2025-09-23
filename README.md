# NutriTrack – Assistant Nutritionnel Personnalisé

## 📖 Contexte du projet
NutriTrack est une application web dont l'objectif est d'accompagner les utilisateurs avec un **plan nutritionnel sur mesure**, en tenant compte de leur profil :

- **Pathologies chroniques**  
  - Diabète : gestion des glucides et index glycémique  
  - Hypertension : limitation sodium  
  - Obésité : équilibre calorique progressif  

- **Athlètes**  
  - Ajustement selon discipline (endurance vs force)  
  - Suivi protéines / glucides / lipides  
  - Recommandations récupération (protéines rapides, électrolytes)  

- **Perte de poids**  
  - Déficit calorique contrôlé  
  - Prévention des carences (fibres, vitamines)  

- **Prise de masse**  
  - Surplus calorique adapté  
  - Suivi strict protéines et lipides de qualité  

### Fonctionnalités principales
1. **Analyse des repas par image**  
   - Reconnaissance des aliments consommés (IA Vision : LangChain + Gemini Flash 1.5)  
   - Estimation calories et nutriments  
   - Détection automatique d’écarts selon profil  

2. **Recommandations dynamiques**  
   - Athlètes : conseils pré/post entraînement, hydratation  
   - Patients chroniques : alertes médicales (ex. excès sel/sucre)  
   - Perte/prise de poids : ajustement repas suivant  

3. **Rapports hebdomadaires**  
   - Patients : suivi médical (écarts glycémiques, excès sodium)  
   - Athlètes : progression nutritionnelle vs performance  
   - Perte/prise de poids : évolution poids, IMC, masse musculaire estimée  

---

## 🛠️ Technologies utilisées
- **Backend :** Node.js + Express.js  
- **Templates :** EJS (Server-Side Rendering)  
- **Base de données :** PostgreSQL (requêtes SQL brutes, sans ORM)  
- **IA Vision :** LangChain orchestrant le modèle Gemini Flash 1.5  
- **CSS Framework :** Tailwind CSS  
- **Architecture :** n-tiers (UI/API, Service/Métier, Persistance)  

---

## 📂 Structure du projet
Voici l’arborescence prévue du projet :

```
nutritrack/
├─ src/
│  ├─ ui/                         # Couche UI/API
│  │  ├─ app.js                   # Point d'entrée Express
│  │  ├─ routes/                  # Définition des endpoints HTTP
│  │  │  ├─ auth.routes.js
│  │  │  ├─ profile.routes.js
│  │  │  ├─ meals.routes.js
│  │  │  └─ reports.routes.js
│  │  ├─ controllers/             # Logique d'orchestration (API Layer)
│  │  │  ├─ auth.controller.js
│  │  │  ├─ profile.controller.js
│  │  │  ├─ meals.controller.js
│  │  │  └─ reports.controller.js
│  │  ├─ views/                   # Templates EJS (UI visuelle)
│  │  │  ├─ layouts/main.ejs
│  │  │  ├─ auth/login.ejs
│  │  │  ├─ auth/register.ejs
│  │  │  ├─ profile/edit.ejs
│  │  │  ├─ meals/new.ejs
│  │  │  ├─ meals/show.ejs
│  │  │  └─ reports/weekly.ejs
│  │  └─ middlewares/             # Middlewares Express (UI concern)
│  │     └─ auth.js
│  │
│  ├─ services/                   # Couche Métier (Business Layer)
│  │  ├─ auth.service.js           # Login, Register, Tokens
│  │  ├─ profile.service.js        # Gestion profil
│  │  ├─ meals.service.js          # Gestion repas
│  │  ├─ reports.service.js        # Génération des rapports
│  │  ├─ nutrition.service.js      # Calculs et recommandations nutritionnelles
│  │  └─ vision.service.js         # IA (LangChain + Gemini)
│  │
│  ├─ persistence/                 # Couche Persistance (DB Layer)
│  │  ├─ pool.js                   # Connexion PostgreSQL
│  │  └─ repositories/             # Requêtes SQL (Repositories)
│  │     ├─ user.repository.js
│  │     ├─ profile.repository.js
│  │     ├─ meal.repository.js
│  │     └─ report.repository.js
│  │
│  ├─ utils/                       # Fonctions utilitaires (communes)
│  │  ├─ validators.js
│  │  └─ calc.js
│  │
│  └─ config/                      # Fichiers de config
│     └─ env.js
│
├─ public/                         # Fichiers statiques (CSS, JS client, uploads)
├─ scripts/
│  └─ schema.sql                   # Script SQL (PostgreSQL)
├─ fixtures/
│  └─ meal-analysis.sample.json    # Exemple JSON de sortie IA (mock)
├─ docs/                           # Documentation (diagrammes, exports Figma)
│  └─ class-diagram.png
├─ tailwind.config.js
├─ postcss.config.js
├─ .env.example
├─ README.md
└─ package.json
```

---

## 📊 Données & JSON attendu de l’IA
L’IA (LangChain + Gemini) renverra un JSON structuré de cette forme :

```json
{
  "items": [
    { "label": "Poulet grillé", "qty_g": 150, "kcal": 240, "prot_g": 32, "carb_g": 0, "fat_g": 10, "sodium_mg": 300, "ig_estim": 0 },
    { "label": "Riz blanc cuit", "qty_g": 180, "kcal": 230, "prot_g": 4, "carb_g": 50, "fat_g": 1, "sodium_mg": 2, "ig_estim": 70 }
  ],
  "totals": {
    "kcal": 470,
    "prot": 36,
    "carb": 50,
    "fat": 11,
    "sodium": 302,
    "ig": 45
  },
  "notes": [
    "IG global modéré grâce aux fibres.",
    "Sodium correct pour un repas standard."
  ]
}
```

Ce format est le **contrat d’échange** entre l’IA, la base de données et l’UI.

---

## 📑 Livrables attendus
- **Code Source :** Lien GitHub de l’application  
- **Planification :** Lien du projet JIRA  
- **Documentation Technique :** README (ce fichier) + fichiers complémentaires  
- **Maquette Figma :** Lien vers le prototype des écrans  
- **Diagramme de classe :** Schéma des entités (UML / Draw.io / Figma)  

---

## 🚀 Démarrage rapide
1. Cloner le repo :  
   ```bash
   git clone https://github.com/your-org/nutritrack.git
   cd nutritrack
   ```
2. Installer les dépendances :  
   ```bash
   npm install
   ```
3. Configurer l’environnement :  
   ```bash
   cp .env.example .env
   ```
   Remplir les variables :  
   - `DATABASE_URL`  
   - `GEMINI_API_KEY`  
   - `UPLOAD_DIR`  
4. Initialiser la base :  
   ```bash
   psql -U user -d nutritrack -f scripts/schema.sql
   ```
5. Lancer en dev :  
   ```bash
   npm run dev
   ```

---

## 👥 Auteurs & Organisation
- **Responsable GitHub :** …  
- **Responsable JIRA & Diagramme de classe :** …  
- **Figma & Architecture technique :** …  

---
