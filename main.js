

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count= document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp ;

console.log(title,price,taxes,ads,discount,total,count,category )

//Language translations:

const translations = {
    en: {
      crud: "CRUD",
      productSystem: "Product Management System",
    title: "Title",
    price: "Price",
    taxes: "Taxes",
    ads: "Ads",
    discount: "Discount",
    total: "Total",
    count: "Count",
    category: "Category",
    create: "Create",
    search: "Search",
    searchByTitle: "Search By Title",
    searchByCategory: "Search By Category",
    deleteAll: "deleteAll",
    id: "ID",
    update: "Update",
    delete: "Delete"
    },
    ar: {
      crud: "CRUD",
productSystem: "نظام إدارة المنتجات",
    title: "العنوان",
    price: "السعر",
    taxes: "الضرائب",
    ads: "الإعلانات",
    discount: "الخصم",
    total: "الإجمالي",
    count: "الكمية",
    category: "الفئة",
    create: "إنشاء",
    search: "بحث",
    searchByTitle: "بحث بالعنوان",
    searchByCategory: "بحث بالفئة",
    deleteAll:"حذف الكل",
    id: "ID",
    update: "تعديل",
    delete: "حذف"
    }
  };
  
  let currentLang = 'en';
  
  document.getElementById('langBtn').onclick = function () {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(currentLang);
    this.textContent = currentLang === 'en' ? 'العربية' : 'English';
    document.body.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.textAlign = currentLang === 'ar' ? 'right' : 'left';
  };
  
  function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      if (el.tagName === 'INPUT') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    });
  }
  

//get total
function gettotal(){
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value) 
        - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'rgb(255, 30, 0)';
    }
}




//Creat product

let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    //count
    if(title.value != '' 
       && price.value != '' 
       && category.value != ''
       && newpro.count <= 100)
       {
        if(mood === 'create'){
            if(newpro.count > 1){
                for(let i = 0; i < newpro.count ; i++){
                     dataProduct.push(newpro);
                }
            }else{
                dataProduct.push(newpro);
            }
        }else{
            dataProduct[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }
    
    
    

    //save local storage
    localStorage.setItem('product' , JSON.stringify(dataProduct));
    
    showData();
}



















//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}






//read

function showData() {
    gettotal();
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        table += `
        <div class="row">
            <div class="cell" data-label="ID">${i+1}</div>
            <div class="cell" data-label="Title">${dataProduct[i].title}</div>
            <div class="cell" data-label="Price">${dataProduct[i].price}</div>
            <div class="cell" data-label="Taxes">${dataProduct[i].taxes}</div>
            <div class="cell" data-label="Ads">${dataProduct[i].ads}</div>
            <div class="cell" data-label="Discount">${dataProduct[i].discount}</div>
            <div class="cell" data-label="Total">${dataProduct[i].total}</div>
            <div class="cell" data-label="Category">${dataProduct[i].category}</div>
            <div class="cell action-cell" data-label="Update">
                <button onclick="updateData(${i})" class="update" data-lang="update">Update</button>
            </div>
            <div class="cell action-cell" data-label="Delete">
                <button onclick="deletData(${i})" class="delete" data-lang="delete">Delete</button>
            </div>
        </div>
    `;
    
    
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>    `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()









//delete

function deletData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}






























//update
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    gettotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;
    scroll({
        top : 0 ,
        behavior:'smooth',
    })
}




















//search
let sreachMood = 'Title';

function getSreachMood(id){
    let sreach = document.getElementById('sreach');
    if(id == 'sreachTitle'){
        sreachMood = 'Title';
    }else{
        sreachMood = 'Category';
    }
    sreach.focus();
    sreach.placeholder = 'Sreach By ' + sreachMood;
    sreach.value = '';
    showData();
}

function searchData(value){
    let table = '';
    for(let i = 0 ; i < dataProduct.length ; i++)
    {
        if(sreachMood == 'Title'){
        
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                  <div class="row">
                     <div class="cell" data-label="ID">${i}</div>
                     <div class="cell" data-label="Title">${dataProduct[i].title}</div>
                     <div class="cell" data-label="Price">${dataProduct[i].price}</div>
                     <div class="cell" data-label="Taxes">${dataProduct[i].taxes}</div>
                     <div class="cell" data-label="Ads">${dataProduct[i].ads}</div>
                     <div class="cell" data-label="Discount">${dataProduct[i].discount}</div>
                     <div class="cell" data-label="Total">${dataProduct[i].total}</div>
                     <div class="cell" data-label="Category">${dataProduct[i].category}</div>
                    <div class="cell action-cell" data-label="Update">
                       <button onclick="updateData(${i})" class="update">Update</button>
                    </div>
                    <div class="cell action-cell" data-label="Delete">
                       <button onclick="deletData(${i})" class="delete">Delete</button>
                    </div>
                  </div>
                `;
            }
        
    }else{
        
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                  <div class="row">
                     <div class="cell" data-label="ID">${i}</div>
                     <div class="cell" data-label="Title">${dataProduct[i].title}</div>
                     <div class="cell" data-label="Price">${dataProduct[i].price}</div>
                     <div class="cell" data-label="Taxes">${dataProduct[i].taxes}</div>
                     <div class="cell" data-label="Ads">${dataProduct[i].ads}</div>
                     <div class="cell" data-label="Discount">${dataProduct[i].discount}</div>
                     <div class="cell" data-label="Total">${dataProduct[i].total}</div>
                     <div class="cell" data-label="Category">${dataProduct[i].category}</div>
                    <div class="cell action-cell" data-label="Update">
                       <button onclick="updateData(${i})" class="update">Update</button>
                    </div>
                    <div class="cell action-cell" data-label="Delete">
                       <button onclick="deletData(${i})" class="delete">Delete</button>
                    </div>
                  </div>
                `;
            }
        
    }
    }
    
    document.getElementById('tbody').innerHTML = table;
}














//clean data
