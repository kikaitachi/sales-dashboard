const selectedCategory = 'Shoes (women)';

const renderSections = (data) => {
    const contentEl = document.getElementById("content");
    var content = "";
    for (const brand of data) {
        const items = brand.items;
        if (items.length != 0) {
            //if (brand.category == selectedCategory) {
            content += `<div class="section">${brand.name}</div>`;
            content += '<div class="sectionContent">';
            for (const item of brand.items) {
                content += `<a class="item" href="https://www.amazon.co.uk/gp/product/${item.asin}?tag=wishinfinit09-21">`;
                content += `<img src="${item.imageUrl}">`;
                content += `<div>${item.name}</div>`;
                content += `from <b>£${item.price}</b>`;
                content += '</a>';
            }
            content += '</div>';
        }
    }
    contentEl.innerHTML = content;
}

const init = () => {
    fetch("shoes.json")
        .then(response => response.json())
        .then(data => renderSections(data));
}
