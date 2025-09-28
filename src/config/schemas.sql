-- Base de Données
CREATE DATABASE IF NOT EXISTS nutritrack
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE nutritrack;

-- Tableau Utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_complet VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_h VARCHAR(255) NOT NULL,
  goal ENUM('ATHLETE','PATIENT','LOSE_WEIGHT','GAIN_WEIGHT') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


  CREATE TABLE meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT, -- if tied to a user
  image_base64 LONGTEXT NOT NULL, -- store the Base64 image
  mime_type VARCHAR(50) NOT NULL, -- like "image/jpeg"
  calories INT,
  protein INT,
  ingredients JSON, -- store array of strings
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

