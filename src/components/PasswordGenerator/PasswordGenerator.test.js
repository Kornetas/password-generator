import { describe, it, expect } from "vitest";

function generatePassword({
  length = 12,
  uppercase = true,
  numbers = true,
  symbols = true,
  lowercase = true,
}) {
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let characterPool = "";

  if (lowercase) characterPool += LOWERCASE;
  if (uppercase) characterPool += UPPERCASE;
  if (numbers) characterPool += NUMBERS;
  if (symbols) characterPool += SYMBOLS;

  if (!characterPool.length) return "";

  let password = "";

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randIndex];
  }

  return password;
}

describe("generatePassword() - lokalnie w komponencie", () => {
  it("generuje hasło o poprawnej długości", () => {
    const pwd = generatePassword({ length: 16 });
    expect(pwd.length).toBe(16);
  });

  it("zwraca pusty string, jeśli nie zaznaczono żadnej opcji", () => {
    const pwd = generatePassword({
      length: 10,
      uppercase: false,
      numbers: false,
      symbols: false,
      lowercase: false,
    });
    expect(pwd).toBe("");
  });

  it("zawiera cyfry, jeśli numbers = true", () => {
    const pwd = generatePassword({ length: 20, numbers: true });
    expect(/[0-9]/.test(pwd)).toBe(true);
  });
});
