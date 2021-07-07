const signUp = (event) => {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let phoneNumber = document.getElementById("phone").value;

  let allUsers = {
    username: username,
    email: email,
    password: CryptoJS.MD5(password).toString(),
    phoneNumber: phoneNumber,
  };

  let userData = JSON.parse(localStorage.getItem("users"));
  if (userData == null) {
    userData = [];
  }

  if (username && email && phoneNumber && password) {
    userData.push(allUsers);
    localStorage.setItem("users", JSON.stringify(userData));
    localStorage.setItem("loggedIn", "true");
    alert("Registration completed, kindly log in");
    window.location.href = "../pages/login.html";
  }
  event.preventDefault();
  reset();
};

// login functionality
const loginData = (event) => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let finalUser = JSON.parse(localStorage.getItem("users"));
  // let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  if (finalUser == null) {
    alert("No User Exists");
  }

  let loginFormData = finalUser.filter(
    (user) =>
      user.username === username &&
      user.password === CryptoJS.MD5(password).toString()
  );


  if (loginFormData.length > 0) {
    localStorage.setItem("loggedIn", "true");
    alert(`Welcome, you are now logged in`);
    window.location.href = "../pages/products.html";
  } else {
    alert("please check your credentials or Signup");
  }
  reset();
};

const logout = () => {
  alert('Logged out')
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("shoppingCart", JSON.stringify([]));
  window.location.href = "../index.html";
};

const reset = () => {
  document.getElementById("form").reset();
};
