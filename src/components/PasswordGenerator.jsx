import React, { useState } from "react";

function PasswordGenerator() {
  // przechowuje długość hasła
  const [length, setLength] = useState(12);

  // czy mają być znaki specjalne
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // czy mają być cyfry
  const [includeNumbers, setIncludeNumbers] = useState(true);

  // czy mają być wielkie litery
  const [includeUppercase, setIncludeUppercase] = useState(true);

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

      <button>Generuj hasło</button>

      <div>
        <h3>Wygenerowane hasło</h3>
        <p>********</p>
      </div>
    </div>
  );
}

export default PasswordGenerator;
