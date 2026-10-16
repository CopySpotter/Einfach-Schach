const fs = require('fs');
const path = require('path');

const sourceDirectory = path.join(__dirname, '..', 'src');
const sourceFilePattern = /\.(?:ts|tsx|js|jsx)$/;
const mojibakePattern = /[ÂÃâ�]/u;
const matches = [];

function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      scan(entryPath);
    } else if (sourceFilePattern.test(entry.name)) {
      const lines = fs.readFileSync(entryPath, 'utf8').split(/\r?\n/);
      lines.forEach((line, index) => {
        if (mojibakePattern.test(line)) {
          matches.push(`${path.relative(process.cwd(), entryPath)}:${index + 1}: ${line}`);
        }
      });
    }
  }
}

scan(sourceDirectory);

if (matches.length > 0) {
  console.error('Possible mojibake found:\n' + matches.join('\n'));
  process.exit(1);
}

console.log('No mojibake markers found in app source files.');
