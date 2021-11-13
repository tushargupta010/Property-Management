let submit = document.querySelector(".submit");
let pName = document.getElementById("pname");
let pDesc = document.getElementById("pdesc");
let pSize = document.getElementById("psize");

let propertiesElement = document.querySelector(".properties");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  (async () => {
    const rawResponse = await fetch(
      "https://api.airtable.com/v0/appzxi82c0Ddnsxio/property",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer keyUcrNV9TqyJjGhn",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                name: pName.value,
                description: pDesc.value,
                size: pSize.value,
              },
            },
          ],
        }),
      }
    );
    const content = await rawResponse.json();
    console.log(content);
    console.log(content.records[0]);
    addProperty(content.records[0]);
  })();
  hideForm();
});

function addProperty(record) {
  let property = record.fields;
  let card = document.createElement("div");
  card.classList.add("card");

  if (property.name && property.size) {
    card.innerHTML = `<h4 >Name : ${property.name}</h4>
        <p>Description : ${property.description}</p>
        <p>Size : ${property.size} sq. yards</p>
        <button class="del" onclick="deleteProperty('${record.id}')">Delete</button><br/>`;

    propertiesElement.appendChild(card);
    let clear = card.querySelector(".del");
    clear.addEventListener("click", () => {
      card.remove();
    });
    hideForm();
    clearFields();
  }
}

function deleteProperty(id) {
  (async () => {
    const response = await fetch(
      "https://api.airtable.com/v0/appzxi82c0Ddnsxio/property/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer keyUcrNV9TqyJjGhn",
        },
      }
    );
  })();
}

function initApp() {
  showProperties();
  hideForm();
}

const showProperties = async () => {
  const response = await fetch(
    "https://api.airtable.com/v0/appzxi82c0Ddnsxio/property",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer keyUcrNV9TqyJjGhn",
      },
    }
  );
  const myJson = await response.json();
  myJson.records.forEach((element) => {
    addProperty(element);
  });
};

class Property {
  constructor(name, description, size) {
    this.name = name;
    this.description = description;
    this.size = size;
  }
}

initApp();

function addPropertyButton() {
  showForm();
  clearFields();
}

function backButton() {
  hideForm();
}

function hideForm() {
  document.getElementsByClassName("container")[0].style.display = "none";
  document.getElementsByClassName("properties")[0].style.display = "initial";
  document.querySelector("#addPropertyButton").style.display = "initial";
  document.querySelector("#backButton").style.display = "none";
}

function showForm() {
  document.getElementsByClassName("container")[0].style.display = "initial";
  document.getElementsByClassName("properties")[0].style.display = "none";
  document.querySelector("#addPropertyButton").style.display = "none";
  document.querySelector("#backButton").style.display = "initial";
}

function clearFields() {
  pName.value = null;
  pDesc.value = null;
  pSize.value = null;
}
