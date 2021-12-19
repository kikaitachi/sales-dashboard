const selectedCategories = new Set();
const prevAsinToPrice = new Map();
var filtersOpen = false;
var batches = [];

const toggleSelectFilters = () => {
    const filterArrowEl = document.getElementById('filterArrow');
    const filterListEl = document.getElementById('filterList');
    if (filtersOpen) {
        filterArrowEl.classList.remove('up');
        filterArrowEl.classList.add('down');
        filterListEl.style.display = 'none';
    } else {
        filterArrowEl.classList.add('up');
        filterArrowEl.classList.remove('down');
        filterListEl.style.display = 'inline-block';
    }
    filtersOpen = !filtersOpen;
}

const updateCategories = () => {
    const categories = Array.from(selectedCategories);
    categories.sort();
    document.getElementById('activeFilters').innerHTML = categories.join(', ');

    const contentEl = document.getElementById('content');
    var content = "";
    for (const batch of batches) {
        const items = batch.items;
        if (items.length != 0) {
            if (selectedCategories.has(batch.category)) {
                content += `<div class="section">${batch.brand} (${batch.category})</div>`;
                content += '<div class="sectionContent">';
                for (const item of batch.items) {
                    content += `<a class="item" href="https://www.amazon.co.uk/gp/product/${item.asin}?tag=wishinfinit09-21" target="_blank">`;
                    if (prevAsinToPrice.has(item.asin)) {
                        const oldPrice = prevAsinToPrice.get(item.asin)
                        if (oldPrice < item.price) {
                            content += '<div style="background-color: rgba(100, 0, 0, 0.5)">+£' + (item.price - oldPrice).toFixed(2) + ' since yesterday</div>';
                        } else if (oldPrice > item.price) {
                            content += '<div style="background-color: rgba(0, 100, 0, 0.5)">-£' + (oldPrice - item.price).toFixed(2) + ' since yesterday</div>';
                        }
                    } else {
                        content += '<div style="background-color: rgba(0, 100, 100, 0.5)">new today</div>';
                    }
                    content += `<img src="${item.imageUrl}">`;
                    content += `<br/><span>${item.name}</span><br/>`;
                    content += `from <b>£${item.price}</b>`;
                    content += '</a>';
                }
                content += '<div class="item emptyItem"></div>';
                content += '</div>';
            }
        }
    }
    contentEl.innerHTML = content;
}

const toggleCategory = (el, category) => {
    return () => {
        if (selectedCategories.has(category)) {
            selectedCategories.delete(category);
            el.innerHTML = '☐ ' + category;
        } else {
            selectedCategories.add(category);
            el.innerHTML = '☑ ' + category;
        }
        updateCategories();
    };
}

const render = (prevData, data) => {
    batches = data;
    for (const batch of prevData) {
        for (const item of batch.items) {
            prevAsinToPrice.set(item.asin, item.price);
        }
    }

    selectedCategories.add("Baby shoes");
    selectedCategories.add("Men's shoes");
    selectedCategories.add("Women's shoes");

    const categorySet = new Set();
    for (const batch of batches) {
        categorySet.add(batch.category);
    }
    const categories = Array.from(categorySet);
    categories.sort();

    const filterListEl = document.getElementById('filterList');
    for (const category of categories) {
        const categoryEl = document.createElement('div');
        categoryEl.innerHTML = (selectedCategories.has(category) ? '☑' : '☐') + " " + category;
        categoryEl.onclick = toggleCategory(categoryEl, category);
        filterListEl.appendChild(categoryEl);
    }

    const filtersEl = document.getElementById('filters');
    filtersEl.onclick = toggleSelectFilters;

    updateCategories();
}

const init = () => {
    Promise.all([
        fetch("shoes-prev.json").then(response => response.json()),
        fetch("shoes.json").then(response => response.json())
    ]).then(values => render(values[0], values[1]));
}
