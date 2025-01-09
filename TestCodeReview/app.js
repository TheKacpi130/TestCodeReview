import fs from "fs";
import sqlite3 from "sqlite3";

class Person {
  constructor(name, age, height, isActive) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.isActive = isActive;
  }
  // Funkcja zmeinia obiekt osoby na tekst w formacie CSV
  toString() {
    return `${this.name},${this.age},${this.height},${this.isActive}`;
  }
}
// Zapisuj dane osób do pliku CSV
function savePeopleToCSV(people, filePath) {
  const csvLines = people.map(p => p.toString()).join("\n");
  fs.writeFileSync(filePath, csvLines, "utf8");
}
// Zapisuj dane osób do bazy danych
function savePeopleToDB(people, dbPath = "people.db") {
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, height REAL, isActive BOOLEAN)"
    );

    const stmt = db.prepare("INSERT INTO person (name, age, height, isActive) VALUES (?, ?, ?, ?)");
    people.forEach(person => {
      stmt.run(person.name, person.age, person.height, person.isActive);
    });
    stmt.finalize();
  });

  return new Promise(resolve => {
    db.close(resolve);
  });
}
// Funkcja do aktualizacji danych osoby w bazie danych
function updatePersonInDB(id, fieldName, newValue, dbPath = "people.db") {
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    const query = `UPDATE person SET ${fieldName} = ? WHERE id = ?`;
    db.run(query, [newValue, id], function (err) {
      if (err) reject(err);
      resolve(this.changes > 0);
    });
    db.close();
  });
}
// Funkcja generująca losowe osoby
function generateRandomPeople(count) {
  const names = ["Alice", "Bob", "Charlie", "Diana"];
  return Array.from({ length: count }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const age = Math.floor(Math.random() * 50) + 20;
    const height = (Math.random() * 0.5 + 1.5).toFixed(2);
    const isActive = Math.random() < 0.5;
    return new Person(name, age, parseFloat(height), isActive);
  });
}

export { Person, savePeopleToCSV, savePeopleToDB, updatePersonInDB, generateRandomPeople };
