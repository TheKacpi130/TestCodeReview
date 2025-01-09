# Aplikacja do Zapisywania Danych Osób

Aplikacja jest przykładem programu, który umożliwia generowanie danych o osobach, zapisanie ich do pliku CSV oraz do bazy danych SQLite. Program pozwala również na aktualizację danych w bazie oraz sprawdzenie poprawności zapisanych danych. Jest to aplikacja stworzona na potrzeby zaliczenia przedmiotu "Testowanie i Code Review aplikacji internetowych".

### Autor
Kacper Łukaszewski Nr albumu: 154948

## Założenia Projektu

Aplikacja spełnia wymagania zadania:

1. **Zapis do pliku CSV**:
    - Zapisuje dane o osobach do pliku CSV.
    - Weryfikuje, czy zapisany plik zawiera odpowiednią liczbę wierszy oraz poprawność danych.

2. **Generowanie danych**:
    - Aplikacja generuje dane o osobach z losowymi wartościami (imię, wiek, wzrost, status aktywności).
    - Możliwość generowania dowolnej liczby osób.

3. **Zapis do bazy danych**:
    - Zapisuje dane o osobach do bazy SQLite.
    - Obsługuje operację aktualizacji danych w bazie (np. zmiana imienia osoby).

4. **Testowanie**:
    - Implementacja testów jednostkowych w frameworku Mocha z użyciem biblioteki Chai.
    - Testy weryfikują poprawność zapisu do pliku CSV oraz do bazy danych.


## Instalacja

Aby uruchomić aplikację, musisz mieć zainstalowany Node.js oraz NPM.

1. **Skopiuj projekt**:
   - Sklonuj lub pobierz plik na swoje urządzenie.
    
2. **Zainstaluj zależności**:
   - Otwórz terminal w katalogu projektu i uruchom polecenie:
     npm install
     
3. **Aby uruchomić aplikację, użyj poniższego polecenia**:
   node run.js
   
5. **Aby uruchomić testy jednostkowe, użyj poniższego polecenia**:
   npm test
   
## Szczegółowe informacje:

### `generateRandomPeople(count)`
Generuje losową liczbę osób. Każda osoba ma:
- `name` - losowe imię z predefiniowanej listy,
- `age` - losowy wiek (od 20 do 70 lat),
- `height` - losowy wzrost (od 1.5m do 2.0m),
- `isActive` - losowy status aktywności (prawda/fałsz).

### `savePeopleToCSV(people, filePath)`
Zapisuje dane o osobach do pliku CSV. Każda osoba jest zapisywana w jednej linii w pliku.

### `savePeopleToDB(people, dbPath)`
Zapisuje dane o osobach do bazy danych SQLite. Jeśli tabela `person` nie istnieje, zostaje ona utworzona.

### `updatePersonInDB(id, fieldName, newValue, dbPath)`
Aktualizuje dane osoby o podanym `id` w bazie danych. Można zmienić dowolne pole (np. imię, wiek, status aktywności).

### `Person` (Klasa)
Reprezentuje obiekt osoby, zawierający pola:
- `name` - imię osoby,
- `age` - wiek osoby,
- `height` - wzrost osoby,
- `isActive` - status aktywności osoby.

Klasa posiada metodę `toString()`, która zwraca tekstową reprezentację osoby w formacie CSV.

## Testowanie

Testy zostały zaimplementowane za pomocą frameworków **Mocha** oraz **Chai**.

### Testy obejmują:
1. **Sprawdzanie poprawności zapisu do pliku CSV**:
    - Czy plik nie jest pusty,
    - Czy plik zawiera odpowiednią liczbę linii,
    - Sprawdzenie, czy każda linia odpowiada danym osoby.

2. **Sprawdzanie poprawności typów danych w pliku CSV**:
    - Czy dane w pliku mają oczekiwane typy (np. string, number, boolean).

3. **Sprawdzanie aktualizacji danych w bazie danych**:
    - Czy po aktualizacji pola w bazie, dane są poprawnie zmienione.

