const fs = require('fs');
const readLine = require('readline');
const client = require('https');

function updateProgress(progress, total) {
    let current = 0;
    current += progress;
    const percentage = Math.floor((current / total) * 100);
    const bar = '#'.repeat(percentage) + '-'.repeat(100 - percentage);
    process.stdout.write(`[${bar}] ${percentage}%\n`);
}

function countLines(file) {
    console.log(`Counting lines in ${file}...`);
    return new Promise((resolve, reject) => {
        let index = 0;
        const filestream = fs.createReadStream(file, 'utf8');
        const rl = readLine.createInterface({
            input: filestream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            index++;
        });

        rl.on('close', () => {
            filestream.close();
            resolve(index);
        });        
    });
}

function downloadFiles(file, total) {
    console.log('Downloading...');
    return new Promise((resolve, reject) => {
        let index = 1;
        const filestream = fs.createReadStream(file, 'utf8');
        const rl = readLine.createInterface({
            input: filestream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            if(line.length > 0) {
                console.log(`Downloading ${line}...`);
                // Download file
                const file = fs.createWriteStream(`./downloads/${index}.png`);
                client.get(line, response => {
                    response.pipe(file);
                });
            }
            updateProgress(index, total);
            index++;
        });

        rl.on('close', () => {
            filestream.close();
            console.log('Download complete');
        });
    });
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log("Usage: node app.js <file>");
    return;
}

let lines = countLines(args[0]);

lines.then((total) => {
    console.log(`Total lines: ${total}`);
    return total;
}).then((total) => {
    downloadFiles(args[0], total);
});




