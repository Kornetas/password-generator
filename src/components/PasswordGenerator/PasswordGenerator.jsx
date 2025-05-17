import React, { useState } from "react";
import "./PasswordGenerator.css";
import { downloadToFile } from "../../utils/downloadToFile";

function PasswordGenerator() {
  // przechowuje długość hasła
  const [length, setLength] = useState(12);

  // czy mają być znaki specjalne
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // czy mają być cyfry
  const [includeNumbers, setIncludeNumbers] = useState(true);

  // czy mają być małe litery
  const [includeLowercase, setIncludeLowercase] = useState(true);

  // czy mają być wielkie litery
  const [includeUppercase, setIncludeUppercase] = useState(true);

  // generator hasła
  const [generatedPassword, setGeneratedPassword] = useState("");

  // kontrola widocznosci hasła
  const [showPassword, setShowPassword] = useState(false);

  // powiadomienie "Skopiowano" po kliknięciu kopiuj
  const [copied, setCopied] = useState(false);

  // zaznacz przynajmniej jedną opcję
  const [error, setError] = useState("");

  //ocena siły hasła
  const [passwordStrength, setPasswordStrength] = useState("");

  // funkcja wywoływania po kliknięciu generuj hasło
  const handleGenerate = () => {
    console.log("Kliknięto przycisk GENERUJ");

    const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const NUMBERS = "0123456789";
    const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characterPool = ""; // Zawsze dodajemy małe litery

    if (includeLowercase) characterPool += LOWERCASE;
    if (includeUppercase) characterPool += UPPERCASE;
    if (includeNumbers) characterPool += NUMBERS;
    if (includeSymbols) characterPool += SYMBOLS;

    console.log("Zbiór możliwych znaków:", characterPool);

    // Jeśli nie wybrano żadnych opcji – nie generujemy
    if (characterPool.length === 0) {
      console.warn("Nie wybrano żadnych opcji!");
      setGeneratedPassword("");
      setError("Musisz zaznaczyć przynajmniej jedną opcję!");
      return;
    }

    setError("");

    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    console.log("Wygenerowane hasło:", password);
    setGeneratedPassword(password);

    const strength = evaluateStrength(password);
    setPasswordStrength(strength);
    console.log("Siła hasła:", strength);
  };

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

  const handleDownload = () => {
    downloadToFile(generatedPassword);
  };

  return (
    <div className="password-generator">
      <h2>Generator haseł</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="option-group">
        <label>
          Długość hasła: {length}
          <input
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

      <div className="option-group">
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Małe litery (abc)
        </label>

        <label>
          <input
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

      <button onClick={handleGenerate}>Generuj hasło</button>

      <div className="option-group">
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Pokaż hasło
        </label>
      </div>

      <div>
        <h3>Wygenerowane hasło</h3>
        <p className="password-display">
          {generatedPassword
            ? showPassword
              ? generatedPassword
              : "*".repeat(generatedPassword.length)
            : "Brak hasła"}
        </p>
        {generatedPassword && (
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Siła hasła: {passwordStrength}
          </p>
        )}

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
            {copied && <p className="copy-feedback">Skopiowano!</p>}
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
