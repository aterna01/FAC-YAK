// populate talks list
const populateSelect = data => {
  const ul = document.querySelector("#talk_list ul");
  const list = data.map(
    item =>
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


// HOME PAGE
// run on GET
const body = document.querySelector("body");
if (body.classList.contains("home")) {
  requestFunction("GET", "/getTalks", populateSelect);
}





// SIGNUP / LOGIN PAGE
// if (body.classList.contains("signup-login")) {
//   const signupForm = document.querySelector(".signup-form");
//   signupForm.addEventListener("submit", e => {
//     e.preventDefault();

//     // form info
//     const name = e.target[0].value;
//     const password = e.target[1];
//     const confirmPassword = e.target[2];
//     const formInfo = [name, password, confirmPassword];

//     // if password matches, run post request
//     if (password.value === confirmPassword.value) {
//       requestFunction("POST", "/signUp", submitMessage, formInfo);
//     } else {
//       failMessage(e);
//       // add error class to password fields
//       password.classList.add('error-red');
//       confirmPassword.classList.add('error-red');
//     }

//   });
// }




// success and fail messages
// const submitMessage = () => {
//   const h2 = document.querySelector("#signup-heading");
//   h2.textContent = "Sign up form submitted successfully";
//   form.reset();
// };

// const failMessage = (e) => {
//   const h2 = document.querySelector("#signup-heading");
//   h2.textContent = "Error - passwords do not match";
// };