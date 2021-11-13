let submit = document.querySelector(".submit");
let pName = document.getElementById("pname");
let pDesc = document.getElementById("pdesc");
let pSize = document.getElementById("psize");

let propertiesElement = document.querySelector(".properties");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let property = new Property(pName.value, pDesc.value, pSize.value);
  addProperty(property);
});

function addProperty(property) {
  let card = document.createElement("div");
  card.classList.add("card");

  if (property.name && property.size) {
    card.innerHTML = `<h4 >Name : ${property.name}</h4>
        <p>Description : ${property.description}</p>
        <p>Size : ${property.size}</p>
        <button class="del">Delete</button><br/>`;

    propertiesElement.appendChild(card);
    let clear = card.querySelector(".del");
    clear.addEventListener("click", () => {
      card.remove();
    });
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementsByClassName("properties")[0].style.display = "initial";
    document.querySelector("#addPropertyButton").style.display = "initial";
    document.querySelector("#backButton").style.display = "none";
    clearFields();
  }
}

function clearFields() {
  pName.value = null;
  pDesc.value = null;
  pSize.value = null;
}

function initApp() {
  addProperty(
    new Property("Sagar Apartment", "Canaught Palace, Delhi Central", 2)
  );
  addProperty(
    new Property("Godrej South Estate", "Apartment in Okhla, Delhi South", 3)
  );
  addProperty(new Property("Shree Shyam House", "Chattarput, Delhi South", 4));
  document.getElementsByClassName("container")[0].style.display = "none";
  document.getElementsByClassName("properties")[0].style.display = "initial";
  document.querySelector("#addPropertyButton").style.display = "initial";
  document.querySelector("#backButton").style.display = "none";
}

class Property {
  constructor(name, description, size) {
    this.name = name;
    this.description = description;
    this.size = size;
  }
}

initApp();

function addPropertyButton() {
  document.getElementsByClassName("container")[0].style.display = "initial";
  document.getElementsByClassName("properties")[0].style.display = "none";
  document.querySelector("#addPropertyButton").style.display = "none";
  document.querySelector("#backButton").style.display = "initial";
  clearFields();
}

function backButton() {
  document.getElementsByClassName("container")[0].style.display = "none";
  document.getElementsByClassName("properties")[0].style.display = "initial";
  document.querySelector("#addPropertyButton").style.display = "initial";
  document.querySelector("#backButton").style.display = "none";
}
