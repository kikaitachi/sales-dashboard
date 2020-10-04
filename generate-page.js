const puppeteer = require('puppeteer');

const amazonLinks = [
  'https://www.amazon.co.uk/s?k=hotter+shoes&i=shoes&rh=n%3A1769798031%2Cp_89%3AHotter%2Cp_n_size_browse-vebin%3A1919984031%7C1919985031%7C1919986031%7C1919987031%7C1919988031%7C1919989031%7C1919990031&s=price-asc-rank&dc&qid=1601812569&rnid=1918531031&ref=sr_nr_p_n_size_browse-vebin_1',
  'https://www.amazon.co.uk/s?k=irregular+choice+shoes&i=shoes&rh=n%3A1769798031%2Cp_89%3AIrregular+Choice%2Cp_n_size_browse-vebin%3A1919985031%7C1919986031%7C1919988031%7C1919990031&s=price-asc-rank&dc&qid=1601819630&rnid=1918531031&ref=sr_st_price-asc-rank'
];

console.log('<!DOCTYPE html>');
console.log('<html lang="en">');
console.log('<head>');
console.log('<meta charset="UTF-8">');
console.log('<title>Sales dashboad</title>');
console.log('</head>');
console.log('<body>');
console.log('<table>');

for (let i = 0; i < amazonLinks.length; i++) {
(async() => {
const browser = await puppeteer.launch({
  executablePath: '/opt/google/chrome/chrome'
});
const page = await browser.newPage();
  const link = amazonLinks[i];
  await page.goto(link, {waitUntil: 'networkidle2'});
  //await page.waitForSelector('.a-price-whole', { timeout: 5000 });
  const items = await page.evaluate(() => {
    const items = [];
    [].forEach.call(document.querySelectorAll('[data-component-type="s-search-result"]'), item => {
      const priceEl = item.querySelector('.a-price-whole');
      if (priceEl) {
        const price = parseFloat(priceEl.childNodes[0].nodeValue + '.' + item.querySelector('.a-price-fraction').innerHTML);
        if (price < 30) {
          items.push({
            asin: item.dataset.asin,
            imageUrl: item.querySelector('img').src,
            price: price,
            name: item.querySelector('h2').querySelector('span').innerHTML
          });
        }
      }
    });
    return items;
  });
  console.log(`<!-- Got ${items.length} items from ${link} -->`);
  for (let j = 0; j < items.length; j++) {
  	const item = items[j];
  	console.log('<tr>');
  	console.log('<td>');
  	console.log(`<a href="https://www.amazon.co.uk/gp/product/${item.asin}"><img src="${item.imageUrl}"></a>`);
  	console.log('</td>');
  	console.log('<td>');
  	console.log(item.name);
  	console.log('</td>');
  	console.log('<td>');
  	console.log(item.price);
  	console.log('</td>');
  	console.log('</tr>');
  }
/*console.log('</table>');
console.log('</body>');
console.log('</html>');*/
await browser.close();
})();
}
