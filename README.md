# 🔐 Generator Haseł – React + Vite

Prosty, nowoczesny generator haseł napisany w React.  
Pozwala wygenerować bezpieczne hasło na podstawie wybranych opcji, skopiować je lub pobrać jako plik `.txt`.

---

## ✨ Funkcje

- Ustawianie długości hasła (4–32 znaki)
- Wybór typów znaków:
  - małe litery
  - wielkie litery
  - cyfry
  - znaki specjalne
- Maskowanie i podgląd hasła
- Ocena siły hasła (Słabe / Średnie / Mocne)
- Kopiowanie hasła do schowka
- Pobieranie hasła jako pliku `.txt`
- Walidacja: przynajmniej jedna opcja musi być zaznaczona
- Stylowanie w czystym CSS
- Responsywny interfejs
- Testy jednostkowe (`Vitest`) dla funkcji generującej hasła

---

## 🛠️ Technologie

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- CSS3
- Vitest (do testów)

---

## ▶️ Uruchomienie projektu lokalnie

```bash
git clone https://github.com/Kornetas/password-generator.git
cd password-generator
npm install
npm run dev
```

## 🧪 Testowanie

Do testów wykorzystano [Vitest](https://vitest.dev/) – szybkie środowisko testowe działające natywnie z Vite.

### Uruchamianie testów

```bash
npm run test
```

Wynik testów pojawi się w terminalu (Vitest CLI).

### Testowane przypadki:

- ✅ Generuje hasło o zadanej długości (`length`)
- ✅ Zwraca pusty string, jeśli nie zaznaczono żadnej opcji (`uppercase`, `lowercase`, `numbers`, `symbols = false`)
- ✅ Zawiera cyfry, jeśli `numbers = true`
- ✅ Zawiera wielkie litery, jeśli `uppercase = true`
- ✅ Zawiera symbole, jeśli `symbols = true`

🧪 **Plik z testami:**  
`src/components/PasswordGenerator/PasswordGenerator.test.js`
