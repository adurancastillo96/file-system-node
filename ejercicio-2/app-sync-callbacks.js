import fs from 'fs'; // classic module, sync + callbacks
import path from 'path';

// Report path
const pathToReportFile = path.join('files', 'informe.txt');

//Clear report if exists
fs.writeFile(pathToReportFile, '', 'utf-8', writeData);

function writeData(err) {
    if (err) {
        console.error('ERROR: ', err);
        return;
    }

    // Read folder: files
    fs.readdir('files', readdirData);

    function readdirData(err, files) {
        if (err) {
            console.error('ERROR reading directory: ', err);
            return;
        }

        // Filter only .csv files
        files.forEach(file => {
            if (file.endsWith('.csv')) { readFileCSV(file); }
        });
    }
}

function readFileCSV(pathToFile){
    // Path to files
    const filePath = path.join('files', pathToFile);

    // Read the file
    fs.readFile(filePath, 'utf-8', readFileData);

    function readFileData(err, data) {
        if (err) {
            console.error(`ERROR reading file ${filePath}: `, err);
            return;
        }

        // Split lines
        const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
        
        // Print
        console.log('=== Iteration N1: RAW content ===');
        console.log(`File: ${filePath}`);
        console.log(data);
        console.log(lines);

        // Prepare full report Block
        console.log('=== Iteration N2 & N3 ===');
        let output = `\nFile read: ${filePath}\n\n`;
        
        lines.forEach(line => {
            const [name, , duration] = line.split(',');
            const message = `${name?.trim()} ha venido a clase durante ${duration?.trim()} minutos.\n`;
            output += message;
            console.log(message);
        });

        //Append full block to report
        fs.appendFile(pathToReportFile, output, 'utf-8', err => {
            if (err) {
                console.error('ERROR writing in the report:', err);
            }
        });
    }
}

