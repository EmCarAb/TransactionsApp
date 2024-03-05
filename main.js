const form = document.getElementById("propertiesForm")

form.addEventListener("submit", function(event){
  event.preventDefault();
  let propertiesFormData = new FormData(form);
  let propertiesObj = convertFormDataToPropertiesObj(propertiesFormData);
  
  if (isValidPropertiesForm(propertiesObj)) {
    savePropertiesObj(propertiesObj)
    insertRowInPropertiesTable(propertiesObj)
    form.reset();
  } else {
    alert("Por favor, completa correctamente todos los campos")
  }
  })

  function drawCategory(){
    let allCategories = [
      "Comida",
      "Entretenimiento",
      "Salario"
    ]
    allCategories.forEach(insertCategory);
  }

  function insertCategory(categoryName){
    const selectElement = document.getElementById("propertyCategory");
    let htmlToInsert = `<option>${categoryName}</option>`;
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
  }

  function isValidPropertiesForm(propertiesObj) {
    if (!propertiesObj.propertySelector) {
      alert('Por favor, selecciona un tipo de transacción (Ingreso/Egreso).');
      return false;
    }

    if (!propertiesObj.propertyDescription) {
      alert('Por favor, ingresa una descripción.');
      return false;
    }

    if (isNaN(propertiesObj.propertyPrice) || propertiesObj.propertyPrice <= 0) {
      alert('Por favor, ingresa un precio válido mayor que cero.');
      return false;
    }

    if (!propertiesObj.propertyCategory) {
      alert('Por favor, selecciona una categoría.');
      return false;
    }

    return true;
  }


  document.addEventListener("DOMContentLoaded", function(event){
    drawCategory();
    let propertiesObjArray = JSON.parse(localStorage.getItem("propertiesData")) || [];
    propertiesObjArray.forEach(insertRowInPropertiesTable);
  })


  function getNewPropertiesId() {
    let lastPropertiesId = localStorage.getItem("lastPropertiesId") || "-1";
    let newPropertiesId = JSON.parse(lastPropertiesId) + 1;
    localStorage.setItem("lastPropertiesId", JSON.stringify(newPropertiesId));
    return newPropertiesId.toString();
  }

  function convertFormDataToPropertiesObj (propertiesFormData) {
    let propertySelector = propertiesFormData.get("propertySelector");
    let propertyDescription = propertiesFormData.get("propertyDescription");
    let propertyPrice = propertiesFormData.get("propertyPrice");
    let propertyCategory = propertiesFormData.get("propertyCategory");
    let propertiesId = getNewPropertiesId();
    return {
      "propertyId": propertiesId,
      "propertySelector": propertySelector,
      "propertyDescription": propertyDescription,
      "propertyPrice": propertyPrice,
      "propertyCategory": propertyCategory
    }
  }

  function insertRowInPropertiesTable(propertiesObj){
    let propertiesTableRef = document.getElementById("propertiesTable");

    let newPropertyRowRef = propertiesTableRef.insertRow(-1)

    newPropertyRowRef.setAttribute("data-property-id", propertiesObj.propertyId)

    let newTypeCellRef = newPropertyRowRef.insertCell(0);
    newTypeCellRef.textContent = propertiesObj.propertySelector;

    newTypeCellRef = newPropertyRowRef.insertCell(1);
    newTypeCellRef.textContent = propertiesObj.propertyDescription;

    newTypeCellRef = newPropertyRowRef.insertCell(2);
    newTypeCellRef.textContent = propertiesObj.propertyPrice;

    newTypeCellRef = newPropertyRowRef.insertCell(3);
    newTypeCellRef.textContent = propertiesObj.propertyCategory;

    let newDeleteCell = newPropertyRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar"
    
    deleteButton.addEventListener("click", (event) => {
      let propertiesRow = event.target.parentNode.parentNode;
      let propertiesId = propertiesRow.getAttribute("data-property-id");
      propertiesRow.remove();
      deletePropertiesObj(propertiesId);
    });
    newDeleteCell.appendChild(deleteButton);
}

  function savePropertiesObj (propertiesObj) {
    let myPropertiesArray = JSON.parse(localStorage.getItem("propertiesData")) || [];
    myPropertiesArray.push(propertiesObj);
    //convierto mi array de propiedades a json
    let propertiesArrayJSON = JSON.stringify(myPropertiesArray);
    //guardo mi array de propiedades en formato json en el local storage
    localStorage.setItem("propertiesData", propertiesArrayJSON);
  }

  function deletePropertiesObj(propertyId){
    let propertiesObjArray = JSON.parse(localStorage.getItem("propertiesData")) || [];

    let updatedPropertiesArray = propertiesObjArray.filter(property => property.propertyId !== propertyId);
    
    localStorage.setItem("propertiesData", JSON.stringify(updatedPropertiesArray));
  }
