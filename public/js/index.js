const populateSelect = data => {
  const ul = document.querySelector("#talk_list ul");

  const list = data.map(
    item =>
      // const dateFormat = item.date.slice(0,10);
      `<li>
      <span class="talk-name">${item.title}</span>
      <span class="person">${item.name}</span>
      <span class="date">${item.date.slice(0, 10)}</span>
      <span class="time">${item.time}</span>
    </li>`
  );
  list.join("");
  ul.innerHTML = list;
};

const body = document.querySelector("body");
if (body.classList.contains("home")) {
  requestFunction("GET", "/getTalks", populateSelect);
}

const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("signupform");
  e.preventDefault();
  console.dir(e.target);
  const name = e.target[0].value;
  const password = e.target[1].value;
  const confirmPassword = e.target[2].value;
  const formInfo = [name, password, confirmPassword];
  console.log(formInfo);
  if (password === confirmPassword) {
    requestFunction("POST", "/signUp", submitMessage, formInfo);
  } else {
    console.log("Error, password doesnt match");
  }

  console.log(name);
});

const submitMessage = () => {
  const h2 = document.querySelector("#signup-heading");
  h2.textContent = "Sign up form submitted successfully";
  form.reset();
};

///font end validation
// document
//   .querySelector(".send-signup")
//   .addEventListener("click", function(event) {
//     event.preventDefault();
//     const password = document.querySelector("#password");
//     const confirmPassword = document.querySelector("#confirm-password");
//     if (password.value !== confirmPassword.value) {
//       password.style.backgroundColor = "#bd3c59";
//       confirmPassword.style.backgroundColor = "#bd3c59";
//       console.log("wrong password");
//     } else {
//       console.log("submit");
//       password.style.backgroundColor = "#fff";
//       confirmPassword.style.backgroundColor = "#fff";
//     }
//   });
