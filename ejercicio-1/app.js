import fs from 'fs';
import { join } from 'path';

// Read the file
const filePath = join(process.cwd(), 'ejercicio-1/hacienda.json');
const data = await fs.promises.readFile(filePath, 'utf-8');
const fileContent = JSON.parse(data);

// Print it to the console
console.log('===Iteration N1===');
console.log(fileContent);

// Print each name
console.log('===Iteration N2===');
fileContent.forEach(person => {
    console.log(person.nombre);
});

// found DNI: '76543210M','98765432K','32109876H' 

async function foundDNI(dnis) {
for(const dni of dnis){
const person = fileContent.find(person => person.dni === dni);
if (person) {
    if (person.notificacionesPendientes) {
        const message = `There are messages from AEAT to ${person.nombre} with ID: ${person.dni}`;
        const filePath = join(process.cwd(), 'ejercicio-1/notificaciones.txt');
        await fs.promises.appendFile(filePath, message + '\r\n','utf-8');
        console.log(message);
    } else {
        console.log(`no messages to ${person.nombre} with ID: ${person.dni}.`);
    }
} else {
    console.log(`No found anybody with ID: ${dni}`);
}
}
}

console.log('===Iteration N3 & N4===');
const dnis = process.argv.slice(2);
if (dnis.length === 0) {
    console.error('Please provide at least one DNI as a command-line argument.');
    process.exit(1);
  }
foundDNI(dnis);
// 