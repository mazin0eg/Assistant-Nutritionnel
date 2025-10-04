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
├── package.json
├── README.md
├── tailwind.config.js
├── public/
│   └── output.css
├── src/
│   ├── app.js
│   ├── input.css
│   ├── assets/
│   │   └── Food_Picture_1.jpg
│   ├── config/
│   │   ├── database.js
│   │   └── schemas.sql
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── meal.controller.js
│   │   └── meals.controller.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── renderInLayout.js
│   │   └── validate.js
│   ├── models/
│   │   ├── meal.model.js
│   │   └── users.model.js
│   ├── router/
│   │   ├── ai.routes.js
│   │   ├── auth.routes.js
│   │   ├── router.js
│   ├── services/
│   │   ├── gemini.service.js
│   ├── validators/
│   │   └── auth.validators.js
│   ├── view/
│   │   ├── index.ejs
│   │   ├── auth/
│   │   │   ├── login.ejs
│   │   │   └── register.ejs
│   │   ├── layouts/
│   │   │   └── main.ejs
│   │   ├── meals/
│   │   │   ├── meal-analyse.ejs
│   │   │   ├── meal-details.ejs
│   │   │   ├── meal-recommandation.ejs
│   │   │   └── mon-historique.ejs
│   │   ├── profile/
│   │   └── reports/
├── uploads/
│   └── ... (fichiers uploadés)
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
