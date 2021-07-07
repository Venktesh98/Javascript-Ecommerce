let flag = 0;
// localStorage.removeItem("priceFilter");
const displayAllProducts = async () => {
  let getResult = await renderProducts();
  let card = "";
  getResult.map((showProduct) => {
    card += cardDisplayData(showProduct);
  });
  document.getElementById("display").innerHTML = card;
  searchProducts();
};

const cardDataset = async (productId) => {
  let getProducts = await renderProducts();
  let productName = getProducts[productId - 1];
  localStorage.setItem("product", JSON.stringify(productName));
  window.location.href = "../pages/productdetails.html";
};

// Card Display
const cardDisplayData = (showProduct) => {
  let card =
    '<div class="card ml-4 mb-4" style="width: 18rem" id="card" onclick="cardDataset(\'' +
    showProduct.id +
    "')\">" +
    `<img src="${showProduct.image}" class="card-img-top" alt="..." id="img-card" />
          <div class="card-body">
            <p class="card-text" id=card-text-name >
                ${showProduct.name}
            </p>
            <p class="card-text" id=card-text >
                $${showProduct.price}
            </p>
          </div>
        </div>`;
  return card;
};

// FILTER ACCORDING TO THE COMPANY NAME
const filterByCompanyName = async (id) => {
  const filterProductsByCompanyName = await renderProducts();
  let companyName = document.getElementById(id).innerHTML.trim();
  let companyCard = "";
  let getAllProducts, getCompanyFilteredProducts;

  // filters if price filter is applied
  if (JSON.parse(localStorage.getItem("isPriceFilter")) === true) {
    let getPriceFilterProducts = JSON.parse(
      localStorage.getItem("priceFilter")
    );
    getCompanyFilteredProducts = getPriceFilterProducts.filter(
      (product) => product.company_name === companyName
    );
  } else {
    // filter according to name if price filter isn't applied
    getCompanyFilteredProducts = filterProductsByCompanyName.filter(
      (filterProducts) => filterProducts.company_name === companyName
    );
  }

  companyName !== "All"
    ? (getAllProducts = getCompanyFilteredProducts)
    : (getAllProducts = filterProductsByCompanyName);

  getAllProducts.map((item) => {
    companyCard += cardDisplayData(item);
  });
  document.getElementById("display").innerHTML = companyCard;
};

const searchProducts = async () => {
  let filteredProducts;
  let renderAllProducts = await renderProducts(); // axios data
  let getSearchId = document.getElementById("searchInput").value;

  let lowerCaseInputValue = getSearchId.toLowerCase();

  // searches the product according to the price filter
  if (JSON.parse(localStorage.getItem("isPriceFilter")) === true) {
    let getPriceFilterProducts = JSON.parse(
      localStorage.getItem("priceFilter")
    );
    filteredProducts = getPriceFilterProducts.filter((product) => {
      return product.name.toLowerCase().includes(lowerCaseInputValue);
    });
  }
  // filters all product
  else {
    filteredProducts = renderAllProducts.filter((product) => {
      return product.name.toLowerCase().includes(lowerCaseInputValue);
    });
  }

  let card = "";
  filteredProducts.map((item) => {
    card += cardDisplayData(item);
  });
  document.getElementById("display").innerHTML = card;
};

// Filter according to the price
const filterByPrice = async () => {
  let sliderRange = document.getElementById("range-input").value;

  let renderAllProducts = await renderProducts();
  let priceFilter = renderAllProducts.filter(
    (item) => parseInt(item.price) <= sliderRange
  );

  localStorage.setItem("isPriceFilter", "true");
  localStorage.setItem("priceFilter", JSON.stringify(priceFilter));
  let card = "";

  priceFilter?.map((item) => {
    card += cardDisplayData(item);
  });
  document.getElementById("display").innerHTML = card;

  if (parseInt(sliderRange) <= 10) {
    localStorage.setItem("isPriceFilter", "false");
    localStorage.removeItem("priceFilter");
    displayAllProducts();
  }
  document.getElementById("filter-price-value").innerHTML = sliderRange;
};

// Axios Call
const renderProducts = () => {
  const fetchResult = axios
    .get("http://localhost:3000/products")
    .then((response) => {
      responseResult = response.data;
      return responseResult;
    })
    .catch((error) => {
      console.log(error);
    });

  return fetchResult;
};
