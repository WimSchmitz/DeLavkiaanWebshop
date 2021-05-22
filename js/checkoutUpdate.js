var aantalElement
var kostElement
var kostElementHidden
var betaalKnop

var inputData = {};
var inputIds = ["FName", "LName", "Email", "Tel", "Street", "Number", "POBox", "Postal", "City"];

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  //The DOMContentLoaded event has already fired. Just run the code.
  afterLoaded();
}

function afterLoaded() {
  aantalElement = document.getElementById("aantalBakken");
  kostElement = document.getElementById("kost");
  kostElementHidden = document.getElementById("kostHidden");
  betaalKnop = document.getElementById("betaalknop")

  aantalElement.onchange = updateKost;
  betaalKnop.onclick = startTransaction;
}

function updateKost() {
  var kost = (Number(aantalElement.value) * 48).toFixed(2);
  kostElement.innerText = "€" + kost;
  kostElementHidden.value = kost; 
}

function startTransaction(){
    
  inputIds.forEach(s =>{
    inputData[s] = document.getElementById(s).value
    if (document.getElementById(s) == "True" && inputData[s].value == "" ){
      betaalKnop.innerText = "Missende info!"
      return
    }
  })

  $.ajax({
    method: "POST",
    url: "/transactions/startTransactionTest",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      amount: kostElementHidden.value,

      initials: inputData["FName"],
      lastName: inputData["LName"],
      emailAddress: inputData["Email"],
      phoneNumber: inputData["Tel"],

      streetName: inputData["Street"],
      houseNumber: inputData["Number"],
      houseNumberExtension: inputData["POBox"],
      zipCode: inputData["Postal"],
      city: inputData["City"]
    }),
    success: function(data){
      window.location.href = data
    },
    error: function(data){
      console.log(data)
    }
  })
}
