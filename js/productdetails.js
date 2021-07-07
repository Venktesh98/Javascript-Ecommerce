// let flag = 0;
let cart = JSON.parse(localStorage.getItem("shoppingCart"));

const productDetails = () => {
  const getProduct = localStorage.getItem("product");
  const parseProduct = JSON.parse(getProduct);

  card = `<div class="zoom-image-div">
            <img src=${parseProduct.image} class="product_image" alt="...">
          </div>`;

  productBody = `<div id="prodouct-details"> 
            <h2 class="product-name mt-5">${parseProduct.name}</h2>
            <p class="product-company">By ${parseProduct.company_name}</p>
            <strong><p class="product-price">$${parseProduct.price}</p></strong>
            <p class="product-description">${parseProduct.description}</p>
            <button class="btn-sm add-to-cart" onclick="addToCart(event,'${parseProduct.id}','${parseProduct.name}'); openNav()">Add to Cart</button>
          </div>`;

  productContent = `<span class="navbar-brand mt-3 mb-3 home-content">Home / ${parseProduct.name}</span>`;

  document.getElementById("product-content").innerHTML = productContent;
  document.getElementById("display-card").innerHTML = card;
  document.getElementById("product-body").innerHTML = productBody;
};

// CART FUNCTIONALITY
// let cart = JSON.parse(localStorage.getItem("shoppingCart"));
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

let shoppingCart = (function () {
  function Item(id, name, price, count, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
    this.image = image;
  }
  let cartObj = {};

  cartObj.addItemToCart = (id, name, price, count, image) => {
    // checks the value exists or not in array i.e returns boolean value
    let isItemExists = cart.some((item) => item.id === id);

    if (isItemExists) {
      incrementCart(id); // increments the item
    } else {
      if (cart === null) {
        cart = [];
      } else {
        let newCartItem = new Item(id, name, price, count, image); // invokes the function constructor
        cart.push(newCartItem); // Pushes into the cart
      }
      saveCart();
    }
  };
  
  cartObj.totalCount = () => {
    let cartCount = 0;
    cart.map((cartItemValue) => {
      cartCount += cartItemValue.count;
    });
    return cartCount;
  };
  return cartObj;
})();

// Increment cart i.e +1
const incrementCart = (id) => {
  id = parseInt(id);
  let newCart = []; // using coz JS is refrence type not value type i.e not a good idea of manipulating original array directly

  newCart = cart.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        count: item.count + 1,
      };
    }
    return item;
  });

  // Javascript Refrence Example
  // console.log(cart);
  // console.log(newCart);
  cart = newCart;
  saveCart();
  displayCart();
};

// Decrement Cart i.e -1
const decrementCart = (id) => {
  id = parseInt(id);
  let newDecrementCart = [];

  newDecrementCart = cart
    .map((item) => {
      if (item.id === id) {
        return {
          ...item,
          count: item.count - 1,
        };
      }
      return item;
    })
    .filter((decrementValue) => {
      return decrementValue.count !== 0;
    });

  cart = newDecrementCart;
  saveCart();
  displayCart();
};

// delete single item
const deleteItem = (id) => {
  id = parseInt(id);
  let newDeleteCart = [];
  newDeleteCart = cart.filter((deleteItem) => deleteItem.id !== id);
  cart = newDeleteCart;

  saveCart();
  displayCart();
};

// Add to cart
const addToCart = async (event) => {
  event.preventDefault();
  let pid, pname, price, quantity, image;
  let getProducts = localStorage.getItem("product");
  let parseProduct = JSON.parse(getProducts);

  pid = parseProduct.id;
  pname = parseProduct.name;
  price = parseProduct.price;
  quantity = parseProduct.qty;
  image = parseProduct.image;

  shoppingCart.addItemToCart(pid, pname, price, quantity, image);
  displayCart();
};

// clear items
const clearCart = () => {
  cart = [];
  saveCart();
  displayCart();
};

// Total Cart value
const totalCart = () => {
  let value = 0;
  let newItem;
  cart.map((item) => {
    newItem = parseFloat(item.price);
    value += newItem * item.count;
  });
  return value.toFixed(2);
};

// Display Cart
const displayCart = () => {
  let cartArray = JSON.parse(localStorage.getItem("shoppingCart"));
  let sideDrawer = "";

  if (cartArray.length > 0) {
    cartArray.map((inCartData) => {
      document.getElementById("no-items").style.display = "none"; // hides the imogi of no items

      sideDrawer += `<div class="product-drawer-page drawer-page">
                  <div class="image-div">
                      <img src="${inCartData.image}" class="product_image_thumb">
                  </div>
                  <div class="product-div">
                      <div class="product-details">
                          <p class="product-details-data">${inCartData.name}</p>
                          <p>Price $${inCartData.price}</p>
                          <p class="remove" onclick="deleteItem('${inCartData.id}')">remove</p>
                      </div>
                  </div>
                  <div class="quantity-div quantity-data">
                      <p class="increment-cart" onclick="incrementCart('${inCartData.id}')">&Hat;</p>
                      <p>${inCartData.count}</p>
                      <p class="decrement-cart" onclick="decrementCart('${inCartData.id}')">&#8964;</p>
                  </div>
            </div>`;
    });
  }
  else {  
    document.getElementById("no-items").style.display = "block";  // shows the imogi
  }
  document.getElementById("displayCartItems").innerHTML = sideDrawer;
  document.getElementById("total-cart").innerHTML = totalCart();
  document.getElementById("total-cart-count").innerHTML =
    shoppingCart.totalCount();
};
document.getElementById("total-cart-count").innerHTML =
  shoppingCart.totalCount(); // to set badge on products.html and index.html

// Opens Navbar
function openNav() {
  document.getElementById('backdrops').style.display ="block";
  document.getElementById("mySidenav").style.width = "300px";
  displayCart();
}

// Closes Navbar
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById('backdrops').style.display ="none";
}
