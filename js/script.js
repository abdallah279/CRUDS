let nameInp = document.getElementById("nameInp"),
priceInp = document.getElementById("priceInp"),
discountInp = document.getElementById("discountInp"),
categoryInp = document.getElementById("categoryInp"),
amountInp = document.getElementById("amountInp"),
title = document.querySelector('.title'),
addBtn = document.getElementById('btn'),
productsContainer = document.getElementById("productsContainer"),
searchBtn = document.getElementById("searchBtn"),
closeBtn = document.getElementById("close-btn"),
searchInput = document.getElementById("searchInput"),
products = [],
moode = 'create',
idNum;

// Trigger Get Data From Local Storage Function
getProFromLocal();

// Click Btn To create Pro And Store It in Array
addBtn.addEventListener("click", ()=>{
    let name = nameInp.value.trim();
    let price = priceInp.value.trim();
    let discount = discountInp.value.trim();
    let category = categoryInp.value.trim();
    let amount = amountInp.value.trim();
    if(name == "" || price == "" || discount == "" || category == "" || amount == ""){
        alert("Please fill in all fields");
    }else{
        let total = Math.round(+price - (+price / 100) * +discount)
        let pro = {
            name,
            price,
            discount,
            total,
            category,
            amount
        }

        if(moode == "create"){
            products.push(pro);
        }else{
            products[ idNum ] = pro;
            moode = "create";
            title.innerHTML = "Create";
            addBtn.innerHTML = "Add";
        }

        emptyFileds();
        showProduct(products);
        addLocal(products);
        // window.location.reload();
    }
});

amountInp.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        addBtn.click();
    }
});

// Function To Show Product In UI
function showProduct(array){
    productsContainer.innerHTML = '';
    array.forEach((pro, idx) => {
        let row = document.createElement("tr");
        row.innerHTML = `
                            <td>${pro.name}</td>
                            <td>${pro.price}$</td>
                            <td>${pro.discount}%</td>
                            <td>${pro.total}$</td>
                            <td>${pro.category}</td>
                            <td>${pro.amount}</td>
                            <td><img src=${'icons/edit.png'} onclick='editItem(${idx})' id"edit" /> <img src=${'icons/delete.png'} id="delete" onclick="deleteProduct(${idx})" /></td>
                        `;
        productsContainer.appendChild(row);
    });

}

// Empty All Fildes
function emptyFileds(){
    nameInp.value = '';
    priceInp.value = '';
    discountInp.value = '';
    categoryInp.value = '';
    amountInp.value = '';
}

// Add Products To Local storage
function addLocal(arr){
    localStorage.setItem("products", JSON.stringify(arr));
}

// Get Products From Local Storage
function getProFromLocal(){
    let data = localStorage.getItem("products");

    // Check if Theres Tasks In Local Storage
    if(data){
        products = JSON.parse(data);
        showProduct(products);
    }
}

// Remove Product
function deleteProduct(idx){
    products.splice(idx, 1);
    showProduct(products);
    addLocal(products);
    // window.location.reload();
}

// Edit Product
function editItem(idx){
    moode = "edit";
    idNum = idx;
    btn.innerHTML = "Update";
    title.innerHTML = "Update";
    nameInp.value = products[idx].name;
    priceInp.value = products[idx].price;
    discountInp.value = products[idx].discount;
    categoryInp.value = products[idx].category;
    amountInp.value = products[idx].amount;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// Click Search Buuton Or Press on Enter Key To Search
searchBtn.addEventListener("click", searchProduct);
searchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchProduct();
    }
});

// Search About Product
function searchProduct(){
    let searchValue = searchInput.value;

    let filterArr = products.filter(pro =>{
        return pro.name.includes(searchValue);
    });

    if(filterArr.length){
        showProduct(filterArr);
    }else{
        productsContainer.innerHTML = `<h1 class="not-found">Not Found</h1>`
    }
}

// Close Search
closeBtn.addEventListener('click', ()=>{
    searchInput.value = '';
    showProduct(products);
});