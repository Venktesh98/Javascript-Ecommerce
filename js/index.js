const featuredProducts = async () => {
  let userLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  if (!userLoggedIn) {
    document.getElementById("cart-badge-icon").style.display = "none";
    document.getElementById("login-icon").style.display = "block";
  } else {
    document.getElementById("cart-badge-icon").style.display = "block";
    document.getElementById("login-icon").style.display = "none";
  }

  const getFeaturedProducts = await renderProducts();
  getFeaturedProducts.map((featureProduct) => {
    let card = "";
    if (featureProduct.featured === true) {
      card = `<div class="card ml-4 mb-4" style="width: 18rem" id="card">
        <img src="${featureProduct.image}" class="card-img-top" alt="..." id="img-card" />
            <div class="card-body">
            <p class="card-text" id=card-text-name >
                ${featureProduct.name}
            </p>
            <p class="card-text" id=card-text >
                $${featureProduct.price}
            </p>
            </div>
        </div>`;
    }
    document.getElementById("featuredProduct").innerHTML += card;
  });
};

const loadData = () => {
  if (JSON.parse(localStorage.getItem("loggedIn")) == true) {
    window.location.href = "../pages/products.html";
  } else {
    alert("Login First");
    window.location.href = "../pages/login.html";
  }
};

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
