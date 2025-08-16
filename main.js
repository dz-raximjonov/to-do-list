let form = document.getElementById("form");
let data = JSON.parse(localStorage.getItem("storage")) || [];
let lists = document.getElementById("lists");
let none = document.getElementById("none");

let storage = [];

function local(data) {
  localStorage.setItem("storage", JSON.stringify(data));
  console.log(storage);
}
let editId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = form.text.value.trim();

  if (value === "") {
    none.classList.remove("d-none");
    return;
  }

  if (editId !== null) {
    let item = data.find((v) => v.id === editId);
    if (item) {
      item.text = value;
    }
    editId = null;
  } else {
    data = [
      ...data,
      { id: Date.now(), text: value, time: new Date().toLocaleTimeString() },
    ];
  }

  form.text.value = "";
  addUi(data);
  local(data);
  none.classList.add("d-none");
});

function addUi(data) {
  lists.innerHTML = "";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add(
      "text-white",
      "w-100",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "gap-5",
      "rounded-3",
      "p-2",
      "mb-1",
      "bg-primary"
    );
    div.innerHTML = `
        <span> ${element.text} </span>
         <div class="small text-light opacity-75">${element.time}</div>
        <div class="d-flex gap-3">
          <i id="${element.id}" class="fa-solid fa-pen"></i>
          <i  id="${element.id}" class="fa-solid fa-trash-can"></i>
        </div>
    `;
    lists.append(div);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const storage = JSON.parse(localStorage.getItem("storage")) || [];
  addUi(storage);
});

lists.addEventListener("click", (e) => {
  let target = e.target;

  if (target.classList.contains("fa-trash-can")) {
    let id = +target.id;
    data = data.filter((value) => value.id !== id);
    addUi(data);
    local(data);
  } else if (target.classList.contains("fa-pen")) {
    editId = +target.id;
    let item = data.find((value) => value.id === editId);
    document.getElementById("text").value = item.text;
  }
});
