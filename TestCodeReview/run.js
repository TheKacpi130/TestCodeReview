import fs from "fs";
import { Person, savePeopleToCSV, savePeopleToDB } from "./app.js";

// Funkcja generująca losowych ludzi
function generateRandomPeople(count) {
  // Definicja dostępnych imion i nazwisk
  const names = ["Anna", "Jan", "Maria", "Katarzyna", "Paweł"];
  const surnames = ["Nowak", "Mazur", "Wójcik", "Kwiatek", "Adamczyk"];
  
  const people = [];
  
  for (let i = 0; i < count; i++) {
    // Losowanie imienia i nazwiska
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const age = Math.floor(Math.random() * 60) + 18; // Wiek od 18 do 77
    const height = (Math.random() * 0.6 + 1.5).toFixed(2); // Wzrost od 1.50m do 2.10m
    const isActive = Math.random() > 0.5; // Losowy boolean
    people.push(new Person(`${name} ${surname}`, age, parseFloat(height), isActive));
  }

  return people;
}

// Główna funkcja programu
async function main() {
  try {
    console.log("Generowanie danych...");
    const people = generateRandomPeople(5); // Generuje 5 losowych osób
    console.log(people);

    console.log("Zapisywanie do pliku CSV...");
    savePeopleToCSV(people, "people.csv");

    console.log("Zapisywanie do bazy danych...");
    await savePeopleToDB(people, "people.db");

    console.log("Operacja zakończona pomyślnie!");
  } catch (err) {
    console.error("Błąd:", err);
  }
}

main();
