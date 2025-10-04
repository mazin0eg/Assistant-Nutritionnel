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

-- Tableau des Repas Analyser
CREATE TABLE meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT, 
  image_base64 LONGTEXT NOT NULL, 
  mime_type VARCHAR(50) NOT NULL, 
  calories INT,
  protein INT,
  ingredients JSON, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tableau des Recommandations
CREATE TABLE recommendations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  goal ENUM('ATHLETE','PATIENT','LOSE_WEIGHT','GAIN_WEIGHT') NOT NULL,       
  description TEXT,           
  calories INT,
  protein INT,         
  ingredients JSON, 
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

