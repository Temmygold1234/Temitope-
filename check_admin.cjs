const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  page.on('console', msg => {
    console.log('CONSOLE LOG:', msg.type(), msg.text());
  });

  await page.goto('http://localhost:3000/admin/categories', { waitUntil: 'networkidle0' });
  await browser.close();
})();
