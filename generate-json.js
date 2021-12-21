const puppeteer = require('puppeteer');

const amazonLinks = [
	{
		brand: "Hotter",
		category: "Women's shoes",
		url: "https://www.amazon.co.uk/s?k=hotter shoes&i=shoes&rh=n:1769798031,p_89:Hotter,p_n_size_browse-vebin:1919984031|1919985031|1919986031|1919987031|1919988031|1919989031|1919990031&s=price-asc-rank&dc&qid=1601812569&rnid=1918531031&ref=sr_nr_p_n_size_browse-vebin_1",
	}, {
		brand: "Irregular Choice",
		category: "Women's shoes",
		url: "https://www.amazon.co.uk/s?k=irregular choice&i=shoes&rh=n:1769798031,p_89:Irregular Choice|Poetic Licence by Irregular Choice,p_n_size_browse-vebin:1919984031|1919985031|1919986031|1919988031|1919990031&s=price-asc-rank&dc&crid=QUV5DQUIHI1M&qid=1601886493&rnid=1918531031&sprefix=irregular c,shoes,138&ref=sr_nr_p_n_size_browse-vebin_5",
	}, {
		brand: "Skechers",
		category: "Women's shoes",
		url: "https://www.amazon.co.uk/s?k=skechers&i=shoes&rh=n:355005011,n:1769609031,n:1769798031,p_89:Skechers&s=price-asc-rank&dc&qid=1639845465&rnid=355005011&ref=sr_nr_n_1",
	}, {
		brand: "Skechers",
		category: "Men's shoes",
		url: "https://www.amazon.co.uk/s?k=skechers&i=shoes&rh=n:355005011,n:1769609031,n:1769738031,p_89:Skechers&s=price-asc-rank&dc&qid=1639845519&rnid=355005011&ref=sr_nr_n_2",
	}, {
		brand: "Skechers",
		category: "Girls' Shoes",
		url: "https://www.amazon.co.uk/s?k=skechers&i=shoes&rh=n:355005011,n:1769609031,n:1769676031,p_89:Skechers&s=price-asc-rank&dc&qid=1639942924&rnid=355005011&ref=sr_nr_n_3",
	}, {
		brand: "Skechers",
		category: "Boys' Shoes",
		url: "https://www.amazon.co.uk/s?k=skechers&i=shoes&rh=n:355005011,n:1769609031,n:1769617031,p_89:Skechers&s=price-asc-rank&dc&qid=1639942993&rnid=355005011&ref=sr_nr_n_4",
	}, {
		brand: "Skechers",
		category: "Baby shoes",
		url: "https://www.amazon.co.uk/s?k=skechers&i=shoes&rh=n:355005011,n:1769609031,n:1769610031,p_89:Skechers&s=price-asc-rank&dc&qid=1639845558&rnid=355005011&ref=sr_nr_n_5",
	}, {
		brand: "Rieker",
		category: "Women's shoes",
		url: "https://www.amazon.co.uk/s?k=rieker&i=shoes&rh=n:355005011,n:1769609031,n:1769798031,p_89:Rieker,p_36:197572031&s=price-asc-rank&dc&qid=1639845609&rnid=355005011&ref=sr_nr_n_1",
	}, {
		brand: "Rieker",
		category: "Men's shoes",
		url: "https://www.amazon.co.uk/s?k=rieker&i=shoes&rh=n:355005011,n:1769609031,n:1769738031,p_89:Rieker,p_36:197572031&s=price-asc-rank&dc&qid=1639845647&rnid=355005011&ref=sr_nr_n_2",
	}, {
		brand: "Clarks",
		category: "Women's shoes",
		url: "https://www.amazon.co.uk/s?k=clarks&i=shoes&rh=n:355005011,n:1769609031,n:1769798031,p_89:Clarks|Clarks Originals,p_36:197572031&s=price-asc-rank&dc&qid=1639845677&rnid=355005011&ref=sr_nr_n_1",
	}, {
		brand: "Clarks",
		category: "Men's shoes",
		url: "https://www.amazon.co.uk/s?k=clarks&i=shoes&rh=n%3A355005011%2Cn%3A1769609031%2Cn%3A1769738031%2Cp_89%3AClarks%7CClarks+Originals%2Cp_36%3A197572031&s=price-asc-rank&dc&qid=1639845721&rnid=355005011&ref=sr_nr_n_2",
	}, {
		brand: "Clarks",
		category: "Baby shoes",
		url: "https://www.amazon.co.uk/s?k=clarks&i=shoes&rh=n:355005011,n:1769609031,n:1769610031,p_89:Clarks|Clarks Originals,p_36:197572031&s=price-asc-rank&dc&qid=1639845747&rnid=355005011&ref=sr_nr_n_5",
	}, {
		brand: "Geox",
		category: "Women's shoes",
		url: "https://www.amazon.co.uk/s?k=geox&i=shoes&rh=n:355005011,n:1769609031,n:1769798031,p_89:Geox,p_36:197572031&s=price-asc-rank&dc&qid=1639845792&rnid=355005011&ref=sr_nr_n_1",
	}, {
		brand: "Geox",
		category: "Men's shoes",
		url: "https://www.amazon.co.uk/s?k=geox&i=shoes&rh=n:355005011,n:1769609031,n:1769738031,p_89:Geox,p_36:197572031&s=price-asc-rank&dc&qid=1639845834&rnid=355005011&ref=sr_nr_n_2",
	}, {
		brand: "Geox",
		category: "Baby shoes",
		url: "https://www.amazon.co.uk/s?k=geox&i=shoes&rh=n:355005011,n:1769609031,n:1769610031,p_89:Geox,p_36:197572031&s=price-asc-rank&dc&qid=1639845851&rnid=355005011&ref=sr_nr_n_5",
	},
];

const promises = [];

for (const link of amazonLinks) {
	promises.push((async() => {
		const browser = await puppeteer.launch({
			executablePath: '/opt/google/chrome/chrome'
		});
		const page = await browser.newPage();
		await page.goto(link.url, {waitUntil: 'networkidle2'});
		const items = await page.evaluate(() => {
			const items = [];
			[].forEach.call(document.querySelectorAll('[data-component-type="s-search-result"]'), item => {
				const priceEl = item.querySelector('.a-price-whole');
				if (priceEl) {
					const price = parseFloat(priceEl.childNodes[0].nodeValue + '.' + item.querySelector('.a-price-fraction').innerHTML);
					items.push({
						asin: item.dataset.asin,
						imageUrl: item.querySelector('img').src,
						price: price,
						name: item.querySelector('h2').querySelector('span').innerHTML
					});
				}
			});
			return items;
		});

		await browser.close();

		items.sort((a, b) => a.price - b.price);

		return {
			brand: link.brand,
			category: link.category,
			items: items,
		};
	})());
}

Promise.all(promises).then(values => console.log(JSON.stringify(values)));
