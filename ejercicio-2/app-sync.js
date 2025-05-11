import fs from 'fs'; // classic module, sync + sin callbacks
import path from 'path';

// Report path
const pathToReportFile = path.join('files', 'informe.txt');

//Clear report if exists
fs.writeFileSync(pathToReportFile, '', 'utf-8');

function readFileCSV(pathToFile){
    // Path to files
    const filePath = path.join('files', pathToFile);

    // Read the file
    const data = fs.readFileSync(filePath, 'utf-8');

    // Split lines
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

    // Print
    console.log('=== Iteration N1: RAW content ===');
    console.log(`File: ${filePath}`);
    console.log(data);
    console.log(lines);

    // Print each name
    console.log('=== Iteration N2 & N3 ===');
    fs.appendFileSync(pathToReportFile, `\nFile read: ${filePath}\n\n`, 'utf-8');
    
    // Parsed lines
    lines.forEach(line => {
        const [name, , duration] = line.split(',');
        const message = `${name?.trim()} ha venido a clase durante ${duration?.trim()} minutos.\n`;
        fs.appendFileSync(pathToReportFile, message, 'utf-8');
        console.log(message);
    });

}

// Read .csv Files
const files = fs.readdirSync('files');

for (const file of files) {
    if (file.endsWith('.csv')) { readFileCSV(file); }
}