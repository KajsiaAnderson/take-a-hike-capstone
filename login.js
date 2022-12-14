const registerForm = document.getElementById("register");
const registerToggle = document.getElementById("register_toggle");
const registerDiv = document.getElementById("registerDiv");

const loginForm = document.getElementById("login");
const loginToggle = document.getElementById("login_toggle");
const loginDiv = document.getElementById("loginDiv");
const loginBtn = document.getElementById("login-btn");


const regToggle = () => {
  registerDiv.classList.remove("active");
  loginDiv.classList.add("active");
};

function register (body){
axios.post('/register', body)
  .then(res => {
    Swal.fire("Account registered successfully!");
    registerForm.reset();
    regToggle();
  })
  .catch(err => {console.log(err)
    alert(`${err.response.data.message}`);
  })
}

const registerSubmitHandler= e => {
  e.preventDefault();

  let first_name = document.querySelector('#first_name');
  let last_name = document.querySelector('#last_name');
  let email = document.querySelector('#email');
  let password = document.querySelector('#password');
  let confirm_password = document.querySelector('#confirm_password');

  let errors = []
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  switch(true) {
    case (password.value !== confirm_password.value):
      errors.push({message: "Your passwords need to match."});
      break;
    case (password.value.length < 10):
      errors.push({message: "Password must contain at least 10 characters."});
      break;
    case (!/[0-9]+/g.test(password.value)): 
      errors.push({message: "Password must contain at least one number."});
      break;
    case (!/[a-z]+/g.test(password.value)):
      errors.push({message: "Password must contain at least one lowercase letter."});
      break;
    case (!/[A-Z]+/g.test(password.value)):
      errors.push({message: "Password must contain at least one uppercase letter."});
      break;
    case (!specialChars.test(password.value)):
      errors.push({message: "Password must contain at least one special character."});
      break;
    default:
      true;
      break;
  };
  if (errors.length > 0) {
    alert(`${errors[0].message}`);
    return errors;
  } else if (errors.length == 0) {
    console.log("Password accepted.");
  } else {
    alert("Please choose another password.");
  };

  let bodyObj = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    password: password.value
  };

  register(bodyObj);
}


const registerToggleHandler = e => {
  e.preventDefault();

  registerDiv.classList.remove("active");
  loginDiv.classList.add("active");
};


const loginToggleHandler = e => {
  e.preventDefault();

  loginDiv.classList.remove("active");
  registerDiv.classList.add("active");
};




const loginSubmitHandler = e => {
  e.preventDefault();

  let email = document.querySelector('#loginEmail');
  let password = document.querySelector('#loginPassword');

  let body = {
    email: email.value,
    password: password.value
  };

  axios.post('/login', body)
  .then(res => {
    email.value = ''
    password.value = ''

    if (res.data.length > 0){
      window.localStorage.setItem('email', res.data[0].email)
      location.assign("/myHikes")
      loginBtn.style.display = "none"
    }else{
      Swal.fire("invalid login")
    }
  })
  
}


registerForm.addEventListener('submit', registerSubmitHandler);
registerToggle.addEventListener('click', registerToggleHandler);

loginForm.addEventListener('submit', loginSubmitHandler);
loginToggle.addEventListener('click', loginToggleHandler);