
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the requirements file
const requirementsPath = path.join(__dirname, 'requirements.txt');
const content = fs.readFileSync(requirementsPath, 'utf8');

// Parse the dependencies (ignoring comments and empty lines)
const dependencies = content
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(line => line.trim());

// Install all dependencies
console.log('Installing GrowthSim dependencies...');
try {
  execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  console.log('\nAll dependencies installed successfully!');
  console.log('\nYou can now run the application with:');
  console.log('  npm run dev');
} catch (error) {
  console.error('Failed to install dependencies:', error);
  process.exit(1);
}
