import fs from 'fs';

let fileName = 'MyCollection';
let filePath = `./db/my_collection/${fileName}.txt`;
let myCollection;

function extractCardNames(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data
        .split(/\r?\n/)
        .map(line => {
        // Regex: remove o número inicial e pega o que vem até o primeiro parêntese
            const match = line.match(/^\d+\s+(.*?)\s+\(/);
            return match ? match[1].trim() : null;
        })
        .filter(name => name !== null);
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return [];
  }
};

myCollection = extractCardNames(filePath);

export { myCollection };