const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('console', msg => console.log('CONSOLE LOG:', msg.type(), msg.text()));
  
  await page.goto('https://temmy-luxury.vercel.app/login', { waitUntil: 'networkidle0' });
  
  // Optionally, let's grab some HTML to see what rendered
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML SNIPPET:', html.substring(0, 500));
  
  await browser.close();
  process.exit(0);
})();
