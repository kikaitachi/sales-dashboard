const puppeteer = require('puppeteer');

const amazonLinks = [
  'https://www.amazon.co.uk/s?k=hotter+shoes&i=shoes&rh=n%3A1769798031%2Cp_89%3AHotter%2Cp_n_size_browse-vebin%3A1919984031%7C1919985031%7C1919986031%7C1919987031%7C1919988031%7C1919989031%7C1919990031&s=price-asc-rank&dc&qid=1601812569&rnid=1918531031&ref=sr_nr_p_n_size_browse-vebin_1',
  'https://www.amazon.co.uk/s?k=irregular+choice+shoes&i=shoes&rh=n%3A1769798031%2Cp_89%3AIrregular+Choice%2Cp_n_size_browse-vebin%3A1919985031%7C1919986031%7C1919988031%7C1919990031&dc&qid=1601812708&rnid=1918531031&ref=sr_nr_p_n_size_browse-vebin_4'
];

console.log('<!DOCTYPE html>');
console.log('<html lang="en">');
console.log('<head>');
console.log('<meta charset="UTF-8">');
console.log('<title>Sales dashboad</title>');
console.log('</head>');
console.log('<body>');
console.log('<table>');

(async() => {
const browser = await puppeteer.launch();
const page = await browser.newPage();
for (let i = 0; i < amazonLinks.length; i++) {
  await page.goto(amazonLinks[i], {waitUntil: 'networkidle2'});
  const items = await page.evaluate(() => {
    const items = [];
    [].forEach.call(document.querySelectorAll('[data-component-type="s-search-result"]'), item => {
      const price = item.querySelector('.a-price-whole');
      if (price) {
        items.push({
          asin: item.dataset.asin,
          imageUrl: item.querySelector('img').src,
          price: item.querySelector('.a-price-whole').childNodes[0].nodeValue + '.' + item.querySelector('.a-price-fraction').innerHTML,
          name: item.querySelector('h2').querySelector('span').innerHTML
        });
      }
    });
    return items;
  });
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
}
console.log('</table>');
console.log('</body>');
console.log('</html>');
await browser.close();
})();

