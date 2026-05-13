const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/lib/components');

const replaceInFile = (srcName, destName) => {
  let content = fs.readFileSync(path.join(srcDir, srcName), 'utf-8');
  content = content.replace(/RAM/g, 'JEEP');
  content = content.replace(/Ram/g, 'Jeep');
  content = content.replace(/ram/g, 'jeep');
  content = content.replace(/#880D00/g, '#424D07'); // RAM_DEFAULT to Jeep Olive
  content = content.replace(/#BA0000/g, '#5A690A'); // RAM_HOVER to Jeep Hover
  fs.writeFileSync(path.join(srcDir, destName), content);
};

replaceInFile('RamBrandHub.svelte', 'JeepBrandHub.svelte');
replaceInFile('RamPremiumLanding.svelte', 'JeepPremiumLanding.svelte');
