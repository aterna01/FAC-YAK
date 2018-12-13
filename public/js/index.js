const populateSelect = function(data) {
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

requestFunction("GET", "/getTalks", populateSelect);

///font end validation
document
  .querySelector(".send-signup")
  .addEventListener("click", function(event) {
    event.preventDefault();
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirm-password");
    if (password.value !== confirmPassword.value) {
      password.style.backgroundColor = "#bd3c59";
      confirmPassword.style.backgroundColor = "#bd3c59";
      console.log("wrong password");
    } else {
      password.style.backgroundColor = "#fff";
      confirmPassword.style.backgroundColor = "#fff";
    }
  });
