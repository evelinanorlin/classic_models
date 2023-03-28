const contentContainer = document.getElementById('content');
const startBtn = document.getElementById('startBtn');
const productsBtn = document.getElementById('productsBtn');
const contactBtn = document.getElementById('contactBtn');
const categories = await createCategories();
const offices = await createOffices();

startBtn.addEventListener('click', renderStart)
productsBtn.addEventListener('click', renderProducts)
contactBtn.addEventListener('click', renderContact)

function renderStart(){
  contentContainer.innerHTML = `
  <h2>Välkommen till Classic models webbshop!</h2>
  <p>Här kan du köpa all möjlig skit som du inte behöver!</p>`
}

function renderProducts(){
  contentContainer.innerHTML = `
  <h2>Produkter</h2>`;

  categories.map(category => {
    contentContainer.innerHTML += `
    <button class="categoryBtn" id="${category}">${category}</button>`;
  })
  contentContainer.innerHTML += `<div id="products"></div>`;

  let products = document.getElementById('products')
  let categoryBtn = document.querySelectorAll('.categoryBtn');
  categoryBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let category = {
        "productLine": e.target.id
      };

      fetch('http://localhost:3000/products/productsbycategory', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category)
      })
        .then(res => res.json())
        .then(data => {
          products.innerHTML = ``;
          data.map(data => {
            products.innerHTML += `
            <h3>${data.productName}</h3>`;
          })
        })
    })
  })
}

function renderContact(){
  contentContainer.innerHTML = `
  <h2>Kontakt</h2>
  <h3>Våra kontor</h3>
  <div id="offices" class="offices"></div>
  <div id="officeInfo"></div>`
  
  let officesContainer = document.getElementById('offices');
  let employeesContainer = document.getElementById('officeInfo');

  offices.map(office => {
    officesContainer.innerHTML += `
    <div>
    <h4>${office.city}</h4>
    <p><b>Phone:</b> ${office.phone}</p>
    <p>${office.addressLine1}<br>${office.addressLine2}<br>${office.postalCode} ${office.state}</p>
    <button class="contactBtn" id=${office.officeCode}>Kontakta kontoret</button>
    </div>`; 
  })

  let contactBtn = document.querySelectorAll('.contactBtn');

  contactBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let officeId = {
        "officeCode": e.target.id
      }

      fetch('http://localhost:3000/offices/employees', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(officeId)
      })
        .then(res => res.json())
        .then(data => {
          employeesContainer.innerHTML = ``;
          data.map(employee => {
            employeesContainer.innerHTML += `
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <h4>${employee.jobTitle}</h4>
            <p>${employee.email}</p>
            <hr>`; 
          })
        })


    })
  })
}

async function createCategories(){
  return fetch('http://localhost:3000/products/categories')
    .then(res => res.json())
    .then(data => {
      let categoryList = [];

      data.map(data => {
        categoryList.push(data.productLine)
      })
      return categoryList
    })
}

async function createOffices(){
  return fetch('http://localhost:3000/offices')
    .then(res => res.json())
    .then(data => {
      return data
    })
}


renderStart()