// Generates .replit for Replit Static Deployment with clean-URL rewrites for every built page.
import { readdirSync, writeFileSync } from 'node:fs';
const pages = readdirSync('dist').filter((f) => f.endsWith('.html') && f !== 'index.html' && f !== '404.html').map((f) => f.replace(/\.html$/, ''));
// Workspace preview only: the Run button serves dist/ with clean URLs. Static Deployment ignores this.
let out = `modules = ["nodejs-20"]
run = ["npx", "--yes", "serve@14", "dist", "-l", "5000", "-n"]

[[ports]]
localPort = 5000
externalPort = 80

[deployment]
deploymentTarget = "static"
publicDir = "dist"

`;
for (const p of pages) {
  out += `[[deployment.rewrites]]\nfrom = "/${p}"\nto = "/${p}.html"\n\n[[deployment.rewrites]]\nfrom = "/${p}/"\nto = "/${p}.html"\n\n`;
}
writeFileSync('.replit', out);
console.log(`.replit written with ${pages.length * 2} rewrites`);
