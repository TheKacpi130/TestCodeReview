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
     
3. **Aby uruchomić aplikację, użyj poniższego polecenia:**:
     node run.js
   
5. **Aby uruchomić testy jednostkowe, użyj poniższego polecenia**:
    npm test

