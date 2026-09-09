// Generates .replit for Replit Static Deployment with clean-URL rewrites for every built page,
// including nested routes (e.g. /auto-insurance/call → /auto-insurance/call.html).
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!f.startsWith('_')) walk(p); continue; }
    if (!f.endsWith('.html')) continue;
    const rel = relative('dist', p).split('\\').join('/').replace(/\.html$/, '');
    if (rel !== 'index' && rel !== '404') pages.push(rel);
  }
})('dist');
// Replit matches rewrites exactly unless "*" is present; deeper paths are listed first anyway.
pages.sort((a, b) => (b.split('/').length - a.split('/').length) || a.localeCompare(b));
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
console.log(`.replit written with ${pages.length * 2} rewrites (${pages.filter((p) => p.includes('/')).length} nested)`);
