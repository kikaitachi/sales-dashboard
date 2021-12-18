const selectedCategory = 'Shoes (women)';

const renderSections = (data) => {
    const contentEl = document.getElementById("content");
    var content = "";
    for (const batch of data) {
        const items = batch.items;
        if (items.length != 0) {
            //if (brand.category == selectedCategory) {
            content += `<div class="section">${batch.brand}</div>`;
            content += '<div class="sectionContent">';
            for (const item of batch.items) {
                content += `<a class="item" href="https://www.amazon.co.uk/gp/product/${item.asin}?tag=wishinfinit09-21">`;
                content += `<img src="${item.imageUrl}">`;
                content += `<br/><span>${item.name}</span><br/>`;
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
