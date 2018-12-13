const populateSelect = function(data) {
  const ul = document.querySelector("#talk_list ul");

  const list = data.map(item => 
    // const dateFormat = item.date.slice(0,10);
    `<li>
      <span class="talk-name">${item.title}</span>
      <span class="person">${item.name}</span>
      <span class="date">${item.date.slice(0,10)}</span>
      <span class="time">${item.time}</span>
    </li>`
  );
  list.join("");
  ul.innerHTML = list;
};

requestFunction("GET", "/getTalks", populateSelect);
