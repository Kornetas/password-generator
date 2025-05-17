import React, { useState } from "react";
import "./PasswordGenerator.css";
import { downloadToFile } from "../../utils/downloadToFile";

function PasswordGenerator() {
  // ustawienia długości hasła (domyślnie 12 znaków)
  const [length, setLength] = useState(12);

  // checkboxy: czy dołączyć określone typy znaków
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);

  // generator hasła
  const [generatedPassword, setGeneratedPassword] = useState("");

  // czy hasło ma być widoczne (czy tylko gwiazdki)
  const [showPassword, setShowPassword] = useState(false);

  // powiadomienie "Skopiowano" po kliknięciu kopiuj
  const [copied, setCopied] = useState(false);

  // komunikat błędu jeśli nie zaznaczono żadnej opcji
  const [error, setError] = useState("");

  // siła hasła (Słabe / Średnie / Mocne)
  const [passwordStrength, setPasswordStrength] = useState("");

  // główna funkcja generująca hasło na podstawie opcji
  const handleGenerate = () => {
    console.log("Kliknięto przycisk GENERUJ");

    const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const NUMBERS = "0123456789";
    const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characterPool = ""; // tu zbieramy zestaw znaków

    // dokładamy do puli znaki na podstawie checkboxów
    if (includeLowercase) characterPool += LOWERCASE;
    if (includeUppercase) characterPool += UPPERCASE;
    if (includeNumbers) characterPool += NUMBERS;
    if (includeSymbols) characterPool += SYMBOLS;

    console.log("Zbiór możliwych znaków:", characterPool);

    // Jeśli nie wybrano żadnych opcji – nie generujemy hasła
    if (characterPool.length === 0) {
      console.warn("Nie wybrano żadnych opcji!");
      setGeneratedPassword("");
      setError("Musisz zaznaczyć przynajmniej jedną opcję!");
      return;
    }

    setError(""); // usuwamy poprzedni błąd (jeśli był)

    let password = "";

    // losujemy kolejne znaki z characterPool
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    console.log("Wygenerowane hasło:", password);
    setGeneratedPassword(password);

    // ocena siły hasła (na podstawie reguł punktowych)
    const strength = evaluateStrength(password);
    setPasswordStrength(strength);
    console.log("Siła hasła:", strength);
  };

  // logika oceny siły hasła (punktacja za różne typy znaków)
  const evaluateStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "Słabe";
    if (score === 2 || score === 3) return "Średnie";
    if (score === 4) return "Mocne";

    return "";
  };

  // funkcja zapisująca hasło do pliku .txt (używa utilsa)
  const handleDownload = () => {
    downloadToFile(generatedPassword);
  };

  return (
    <div className="password-generator">
      <h2>Generator haseł</h2>
      {error && <p className="error-message">{error}</p>}

      {/* suwaczek do ustawiania długości */}
      <div className="option-group">
        <label>
          Długość hasła: {length}
          <input
            name="length"
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => {
              setLength(parseInt(e.target.value));
              console.log("Zmieniono długość:", e.target.value);
            }}
          />
        </label>
      </div>

      {/* checkboxy do wyboru typów znaków */}
      <div className="option-group">
        <label>
          <input
            name="lower_case"
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Małe litery (abc)
        </label>

        <label>
          <input
            name="upper_case"
            type="checkbox"
            checked={includeUppercase}
            onChange={() => {
              setIncludeUppercase(!includeUppercase);
              console.log(
                "Przełączanie opcji „uwzględnij wielkie litery”:",
                !includeUppercase
              );
            }}
          />
          Wielkie litery (ABC)
        </label>

        <label>
          <input
            name="numbers"
            type="checkbox"
            checked={includeNumbers}
            onChange={() => {
              setIncludeNumbers(!includeNumbers);
              console.log(
                "Przełączanie opcji „uwzględnij cyfry”:",
                !includeNumbers
              );
            }}
          />
          Numery (123456)
        </label>

        <label>
          <input
            name="symbols"
            type="checkbox"
            checked={includeSymbols}
            onChange={() => {
              setIncludeSymbols(!includeSymbols);
              console.log(
                "Przełączanie opcji „uwzględnij symbole”:",
                !includeSymbols
              );
            }}
          />
          Znaki specjalne (!@#$%)
        </label>
      </div>

      {/* przycisk do generowania hasła */}
      <button onClick={handleGenerate}>Generuj hasło</button>

      {/* checkbox: pokaż / ukryj hasło */}
      <div className="option-group">
        <label>
          <input
            name="show_password"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Pokaż hasło
        </label>
      </div>

      {/* wyświetlanie hasła */}
      <div>
        <h3>Wygenerowane hasło</h3>
        <p className="password-display">
          {generatedPassword
            ? showPassword
              ? generatedPassword
              : "*".repeat(generatedPassword.length)
            : "Brak hasła"}
        </p>

        {/* informacja o sile hasła */}
        {generatedPassword && (
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Siła hasła: {passwordStrength}
          </p>
        )}

        {/* przyciski: kopiuj i pobierz */}
        {generatedPassword && (
          <>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedPassword);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
                console.log("Hasło zostało skopiowane do schowka.");
              }}
            >
              Kopiuj hasło
            </button>

            {/* komunikat że skopiowano */}
            {copied && <p className="copy-feedback">Skopiowano!</p>}

            {/* przycisk do pobrania hasła do pliku */}
            {generatedPassword && (
              <button onClick={handleDownload}>Pobierz hasło txt</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PasswordGenerator;
