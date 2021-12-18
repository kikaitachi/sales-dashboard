const renderSections = (data) => {
    const contentEl = document.getElementById("content");
    var content = "";
    for (const brand of data) {
        content += `<div class="section">${brand.name}</div>`;
        content += '<div class="sectionContent">';
        for (const item of brand.items) {
            content += '<div class="item">';
            content += `<a href="https://www.amazon.co.uk/gp/product/${item.asin}/?tag=wishinfinit09-21"><img src="${item.imageUrl}" style="height:122px;"></a>`;
            content += '<br/>';
            content += item.name;
            content += '<br/>';
            content += "£";
            content += item.price;
            content += '</div>';
        }
        content += '</div>';
    }
    contentEl.innerHTML = content;
}

const init = () => {
    fetch("shoes.json")
        .then(response => response.json())
        .then(data => renderSections(data));
}
