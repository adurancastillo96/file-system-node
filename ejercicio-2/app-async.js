import fs from 'fs/promises'; // Modern module only sync/promises
import path from 'path';

// Report path
const pathToReportFile = path.join('files', 'informe.txt');

//Clear report if exists
await fs.writeFile(pathToReportFile, '', 'utf-8');

async function readFileCSV(pathToFile){
    // Path to files
    const filePath = path.join('files', pathToFile);

    // Read the file
    const data = await fs.readFile(filePath, 'utf-8');

    // Split lines
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

    // Print
    console.log('=== Iteration N1: RAW content ===');
    console.log(`File: ${filePath}`);
    console.log(data);
    console.log(lines);

    // Print each name
    console.log('=== Iteration N2 & N3 ===');
    await fs.appendFile(pathToReportFile, `\nFile read: ${filePath}\n\n`, 'utf-8');
    
    // Parsed lines (forEach isn't working properly with await)
    for (const line of lines) {
        const [name, , duration] = line.split(',');
        const message = `${name?.trim()} ha venido a clase durante ${duration?.trim()} minutos.\n`;
        await fs.appendFile(pathToReportFile, message, 'utf-8');
        console.log(message);
    };

}

// Read .csv Files
const files = await fs.readdir('files');

for (const file of files) {
    if (file.endsWith('.csv')) { await readFileCSV(file); }
}