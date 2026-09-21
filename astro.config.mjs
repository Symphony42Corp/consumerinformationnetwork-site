import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Consumer Information Network — static site.
// Output is fully prerendered HTML in /dist for Replit Static Deployment.
export default defineConfig({
  site: 'https://www.consumerinformationnetwork.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !/\/call$/.test(page) && !/\/auto-insurance$/.test(page) })], // call pages are noindex and never in the sitemap
  redirects: {
    // Legacy Squarespace slugs → canonical long-form slugs (rendered as meta-refresh pages)
    '/auto-insurance-1': '/home-insurance-information-network',
    '/home-insurance': '/home-insurance-information-network',
    '/debt-relief': '/information-networks',
    '/burial-insurance': '/burial-insurance-information-network',
    '/senior-care': '/senior-care-information-network',
  },
});
