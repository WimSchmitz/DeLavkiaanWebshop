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
  betaalKnop = document.getElementById("betaalknop")

  aantalElement.onchange = updateKost;
  betaalKnop.onclick = startTransaction;
}

function updateKost() {
  if (!isNaN(aantalElement.value)){
    var kost = (Number(aantalElement.value) * 48).toFixed(2);
    betaalKnop.innerText = "Betalen"
    kostElement.innerText = "€" + kost;
  }
}

function startTransaction(){
  console.log(aantalElement.value)
  inputIds.forEach(s =>{
    inputData[s] = document.getElementById(s).value
    if (document.getElementById(s) == "True" && inputData[s].value == "" ){
      betaalKnop.innerText = "Missende info!"
      return
    }
  })

  if (aantalElement.value == "0" || !aantalElement.value || isNaN(aantalElement.value)) {
    betaalKnop.innerText = "Specifieer je aantal!"
    return
  }

  betaalKnop.innerText = "Even Wachten..."
  setTimeout(startTransactionRequest, 2000)
}

function startTransactionRequest(){
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/transactions/StartTransactionTest",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      amount: aantalElement.value,

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