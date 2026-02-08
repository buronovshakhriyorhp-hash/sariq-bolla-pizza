
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(SRC_DIR);
let errorCount = 0;

console.log(`Scanning ${files.length} files for broken imports...`);

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];

        // Skip external libraries (node_modules)
        if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
            continue;
        }

        const absoluteDir = path.dirname(file);
        const resolvedPath = path.resolve(absoluteDir, importPath);

        // Check extensions
        const extensions = ['', '.js', '.jsx', '.json', '.css'];
        let found = false;

        for (const ext of extensions) {
            if (fs.existsSync(resolvedPath + ext)) {
                found = true;
                break;
            }
            // specific check for index files
            if (fs.existsSync(path.join(resolvedPath, 'index' + ext))) {
                found = true;
                break;
            }
        }

        if (!found) {
            console.error(`❌ BROKEN IMPORT in ${path.relative(__dirname, file)}:`);
            console.error(`   Import: "${importPath}"`);
            console.error(`   Resolved to: ${resolvedPath}`);
            errorCount++;
        }
    }
});

if (errorCount === 0) {
    console.log("✅ No broken relative imports found!");
} else {
    console.log(`\nFound ${errorCount} broken imports.`);
}
