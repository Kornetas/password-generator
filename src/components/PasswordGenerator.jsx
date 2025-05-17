import React from "react";

function PasswordGenerator() {
  return (
    <div>
      <h2>Opcje Generatora</h2>

      <div>
        <label>
          Długość hasła:
          <input type="range" min="4" max="32" />
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" />
          Znaki specjalne (!@#$%)
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" />
          Numery (123456)
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" />
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
