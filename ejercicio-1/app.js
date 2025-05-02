import { promises } from 'fs';
import { join } from 'path';

// Read the file
const filePath = join(process.cwd(), 'ejercicio-1/hacienda.json');
const data = await promises.readFile(filePath, 'utf-8');
const fileContent = JSON.parse(data);

// Print it to the console
console.log('===Iteration N1===');
console.log(fileContent);

// Print each name
console.log('===Iteration N2===');
fileContent.forEach(person => {
    console.log(person.nombre);
});

// found DNI 
let dni = "76543210D";
const person = fileContent.find(person => person.dni === dni);

console.log('===Iteration N3===');
if (person) {
    console.log(`Name: ${person.nombre}`);
    if (person.notificacionesPendientes) {
        console.log('There are messages from AEAT.');
    } else {
        console.log('no messages.');
    }
} else {
    console.log(`No found anybody with ID: ${dni}`);
}