const populateSelect = function(data) {
  const ul = document.querySelector("#talks_list");
  // console.log(data);
  let list = data.map(item => {
    console.log(item);
  });
  //   item => `<li"${item.lunch.toLowerCase()}"> ${item.lunch} </option>`
  // );
  // list.join("");
  // ul.innerHTML = list;
};

requestFunction("GET", "/getTalks", populateSelect);
