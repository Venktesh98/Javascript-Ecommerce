const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

form.addEventListener("submit", (event) => {
  var flag = true;
  event.preventDefault();
  flag = validate();
  console.log(flag);
});
const isEmail = (emailVal) => {
  var atSymbol = emailVal.indexOf("@");
  if (atSymbol < 1) return false;

  var dot = emailVal.lastIndexOf(".");
  if (dot < atSymbol + 2) return false;

  if (dot === emailVal.length - 1) return false;

  return true;
};

const validate = () => {
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();
  const passwordVal = password.value.trim();

  if (usernameVal === " ") {
    setErrorMsg(username, "Username cannot be blank");
    return false;
  } else if (usernameVal.length <= 2) {
    setErrorMsg(username, "Username min 3 character");
    return false;
  } else {
    setSuccessMsg(username);
  }

  if (emailVal === " ") {
    setErrorMsg(email, "Email cannot be blank");
  } else if (!isEmail(emailVal)) {
    setErrorMsg(email, "Not a valid Email");
    return false;
  } else {
    setSuccessMsg(email);
  }

  if (phoneVal === " ") {
    setErrorMsg(phone, "Number cannot be blank");
    return false;
  }

  if (phoneVal.length != 10) {
    setErrorMsg(phone, "Not a valid Number");
    return false;
  } else {
    setSuccessMsg(phone);
  }

  if (passwordVal === " ") {
    setErrorMsg(password, "Password cannot be blank");
    return false;
  } else {
    setSuccessMsg(password);
  }

  if (passwordVal.length < 6) {
    setErrorMsg(password, "Minimum 6 character");
    return false;
  } else {
    setSuccessMsg(password);
  }
};

function setErrorMsg(input, errormsgs) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = errormsgs;
  return false;
}

function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  return true;
}
