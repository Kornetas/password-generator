// Funkcja: zapisuje tekst (np. hasło) jako plik .txt i uruchamia pobieranie
export function downloadToFile(content, filename = "haslo.txt") {
  // Tworzymy obiekt Blob – reprezentuje dane jako plik tekstowy
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

  // Tworzymy tymczasowy adres URL do naszego pliku
  const url = URL.createObjectURL(blob);

  // Tworzymy niewidoczny <a>, żeby uruchomić pobieranie
  const a = document.createElement("a");
  a.href = url; // ustawiamy adres do blobu
  a.download = filename; // nazwa pliku .txt
  a.click(); // klikamy „sztucznie”, żeby uruchomić pobieranie

  // Sprzątamy po sobie – usuwamy tymczasowy adres URL z pamięci
  URL.revokeObjectURL(url);
}
