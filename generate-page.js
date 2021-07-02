const puppeteer = require('puppeteer');

const amazonLinks = [
  'https://www.amazon.co.uk/s?k=hotter+shoes&i=shoes&rh=n%3A1769798031%2Cp_89%3AHotter%2Cp_n_size_browse-vebin%3A1919984031%7C1919985031%7C1919986031%7C1919987031%7C1919988031%7C1919989031%7C1919990031&s=price-asc-rank&dc&qid=1601812569&rnid=1918531031&ref=sr_nr_p_n_size_browse-vebin_1',
  'https://www.amazon.co.uk/s?k=irregular+choice&i=shoes&rh=n%3A1769798031%2Cp_89%3AIrregular+Choice%7CPoetic+Licence+by+Irregular+Choice%2Cp_n_size_browse-vebin%3A1919984031%7C1919985031%7C1919986031%7C1919988031%7C1919990031&s=price-asc-rank&dc&crid=QUV5DQUIHI1M&qid=1601886493&rnid=1918531031&sprefix=irregular+c%2Cshoes%2C138&ref=sr_nr_p_n_size_browse-vebin_5',
  'https://www.amazon.co.uk/s?k=skechers&i=shoes&rh=n%3A355005011%2Cn%3A1769609031%2Cp_89%3ASkechers&s=price-asc-rank&dc&qid=1602277081&ref=sr_ex_p_n_size_browse-vebi_0',
  'https://www.amazon.co.uk/s?k=rieker&i=shoes&rh=n%3A1769609031%2Cp_89%3ARieker%2Cp_36%3A-2500&s=price-asc-rank&dc&qid=1619343489&rnid=197571031&ref=sr_nr_p_36_3',
  'https://www.amazon.co.uk/s?k=clarks&i=shoes&rh=n%3A1769609031%2Cp_89%3AClarks%7CClarks+Originals%2Cp_36%3A-2500&s=price-asc-rank&dc&qid=1619343544&rnid=197571031&ref=sr_nr_p_36_5',
  'https://www.amazon.co.uk/s?k=geox&i=shoes&rh=n%3A355005011%2Cn%3A1769609031%2Cp_89%3AGeox%2Cp_36%3A197572031&s=price-asc-rank&dc&qid=1619343598&rnid=355005011&ref=sr_nr_n_1'
];

const amazonLinkNames = ["Hotter", "Irregular Choice", "Skechers", "Rieker", "Clarks", "Geox"];

console.log('<!DOCTYPE html>');
console.log('<html lang="en">');
console.log('<head>');
console.log('<meta charset="UTF-8">');
console.log('<title>Sales dashboad</title>');
console.log('</head>');
console.log('<body>');

for (let i = 0; i < amazonLinks.length; i++) {
	(async() => {
		const browser = await puppeteer.launch({
			executablePath: '/opt/google/chrome/chrome'
		});
		const page = await browser.newPage();
		const link = amazonLinks[i];
		const brand = amazonLinkNames[i];
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
		console.log('<h1 style="border-top: 1px solid black; padding-top: 1rem">' + brand + '</h1>');

		for (let j = 0; j < items.length; j++) {
			const item = items[j];
			console.log('<div style="display: inline-block; width: 30%">');
			console.log(`<a href="https://www.amazon.co.uk/gp/product/${item.asin}"><img src="${item.imageUrl}" style="height:122px;"></a>`);
			console.log('<br/>');
			console.log(item.name);
			console.log('<br/>');
			console.log("£");
			console.log(item.price);
			console.log('</div>');
		}
		console.log('</body>');
		console.log('</html>');
		await browser.close();
	})();
}
