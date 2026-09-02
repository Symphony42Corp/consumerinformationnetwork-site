// Generates .replit for Replit Static Deployment with clean-URL rewrites for every built page.
import { readdirSync, writeFileSync } from 'node:fs';
const pages = readdirSync('dist').filter((f) => f.endsWith('.html') && f !== 'index.html' && f !== '404.html').map((f) => f.replace(/\.html$/, ''));
let out = `[deployment]\ndeploymentTarget = "static"\npublicDir = "dist"\n\n`;
for (const p of pages) {
  out += `[[deployment.rewrites]]\nfrom = "/${p}"\nto = "/${p}.html"\n\n[[deployment.rewrites]]\nfrom = "/${p}/"\nto = "/${p}.html"\n\n`;
}
writeFileSync('.replit', out);
console.log(`.replit written with ${pages.length * 2} rewrites`);
