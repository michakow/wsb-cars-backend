# Backend pod projekt zaliczeniowy

Aplikacja backendowa typu CRUD, napisana w node.js i frameworku express.js łącząca się z bazą danych MongoDB.\
Aplikacja umożliwia odczytywanie, dodawanie, usuwanie oraz aktualizację danych na tabeli Cars oraz dodawanie i odczyt danych na tabeli Users.

# Uruchomienie aplikacji lokalnie

1. Pobranie zależności projektu\
   `npm install`

2. Odpalenie aplikacji\
   `npm run start`

# Endpointy

- GET /users/ -> odczyt listy użytkowników
- POST /users/signup -> rejestracja i dodanie nowego użytkownika
- POST /users/signin -> logowanie w celu otrzymanie tokenu

- GET /cars/ -> odczyt listy samochodów
- GET /cars/:id -> odczyt samochodu o podanym ID
- POST /cars/ -> dodanie nowego samochodu
- PUT /cars/:id -> aktualziacja samochodu o podanym ID 
- DELETE /cars/:id -> usunięcie samochodu o podanym ID
