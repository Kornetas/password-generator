import React, { useState } from "react";

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
      return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    console.log("Wygenerowane hasło:", password);
    setGeneratedPassword(password);
  };

  return (
    <div>
      <h2>Opcje Generatora</h2>

      <div>
        <label>
          Długość hasła:
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
      <div>
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

      <div>
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
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Małe litery (abc)
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => {
              setIncludeUppercase(!includeUppercase);
              console.log(
                "Przełączanie opcji „uwzględnij cyfry”:",
                !includeUppercase
              );
            }}
          />
          Wielkie litery (ABC)
        </label>
      </div>

      <button onClick={handleGenerate}>Generuj hasło</button>

      <div>
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
        <p>
          {generatedPassword
            ? showPassword
              ? generatedPassword
              : "*".repeat(generatedPassword.length)
            : "Brak hasła"}
        </p>
        {generatedPassword && (
          <>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedPassword);
                setCopied(true); // pokaż komunikat
                setTimeout(() => setCopied(false), 3000); // ukryj po 2 sek
                console.log("Hasło zostało skopiowane do schowka.");
              }}
            >
              Kopiuj hasło
            </button>
            {copied && <p style={{ color: "green" }}>Skopiowano!</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default PasswordGenerator;
