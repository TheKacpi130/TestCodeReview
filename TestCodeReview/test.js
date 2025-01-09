import { expect } from "chai";
import fs from "fs";
import sqlite3 from "sqlite3";
import { Person, savePeopleToCSV, savePeopleToDB, updatePersonInDB, generateRandomPeople } from "./app.js";

describe("Aplikacja zapisująca dane", () => {
  const csvFilePath = "test.csv";
  const dbPath = "test.db";
  
  // Hook wykonywany po każdym teście
  afterEach(async () => {
    if (fs.existsSync(dbPath)) {
      try {
        const db = new sqlite3.Database(dbPath);
  
        // Zamknięcie bazy danych
        await new Promise((resolve, reject) => {
          db.close(err => {
            if (err) return reject(err);
            resolve();
          });
        });
  
        // Krótkie opóźnienie przed usunięciem pliku
        await new Promise(resolve => setTimeout(resolve, 200));
  
        // Usunięcie pliku bazy danych
        fs.unlinkSync(dbPath);
      } catch (err) {
        console.error("Błąd podczas zamykania lub usuwania pliku bazy danych:", err);
      }
    }
  
    // Usunięcie pliku CSV
    if (fs.existsSync(csvFilePath)) {
      try {
        fs.unlinkSync(csvFilePath);
      } catch (err) {
        console.error("Błąd podczas usuwania pliku CSV:", err);
      }
    }
  });
  // Test, który sprawdza zapisanie wielu osób do pliku CSV
  it("zapisuje osoby do pliku CSV z wieloma liniami", () => {
    const people = generateRandomPeople(5);
    savePeopleToCSV(people, csvFilePath);

    // Odczytanie pliku CSV i podzielenie go na linie
    const lines = fs.readFileSync(csvFilePath, "utf8").trim().split("\n");

    expect(lines).to.have.lengthOf(5);
    people.forEach((person, index) => {
      expect(lines[index]).to.equal(person.toString());
    });
  });

  // Test, który sprawdza typy danych w pliku CSV
  it("sprawdza typy danych w pliku CSV", () => {
    const people = generateRandomPeople(3); // Generowanie 3 losowych osób
    savePeopleToCSV(people, csvFilePath); // Zapisanie osób do pliku CSV

    const lines = fs.readFileSync(csvFilePath, "utf8").trim().split("\n");
    lines.forEach(line => {
      const [name, age, height, isActive] = line.split(",");
      
      // Sprawdzanie, czy wartości mają odpowiednie typy
      expect(name).to.be.a("string");
      expect(parseInt(age, 10)).to.be.a("number");
      expect(parseFloat(height)).to.be.a("number");
      expect(["true", "false"]).to.include(isActive);
    });
  });

  // Test, który sprawdza aktualizację danych w bazie danych.
  it("aktualizuje dane w bazie i sprawdza zmiany", async () => {
    const people = generateRandomPeople(2);
    await savePeopleToDB(people, dbPath);

    const updatedName = "Updated Name";
    const updateResult = await updatePersonInDB(1, "name", updatedName, dbPath);

    expect(updateResult).to.be.true;

    // Otwieramy bazę danych i sprawdzamy, czy imię zostało zaktualizowane
    const db = new sqlite3.Database(dbPath);
    db.get("SELECT * FROM person WHERE id = 1", (err, row) => {
      if (err) throw err;
      expect(row.name).to.equal(updatedName); // Sprawdzenie, czy zaktualizowane imię jest poprawne
      db.close();
    });
  });
});
