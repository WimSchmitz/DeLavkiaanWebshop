var aantalElement;
var kostElement;
var kostElementHidden;
var betaalKnop;
var subscribeButton;
var emailInput;

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
  betaalKnop = document.getElementById("betaalknop");
  subscribeButton = document.getElementById("Subscribe")

  aantalElement.onchange = updateKost;
  inputIds.forEach(s=> {
    document.getElementById(s).onchange = resetBetaalKnop;
  })

  betaalKnop.onclick = startTransaction;
}

function updateKost() {
  if (!isNaN(aantalElement.value)){
    var kost = (Number(aantalElement.value) * 48).toFixed(2);
    betaalKnop.innerText = "Betalen"
    kostElement.innerText = "€" + kost;
  } else {
    betaalKnop.innerText = "Fout aantal, vul een getal in";
    kostElement.innerText = "€0,00"
  }
}

function resetBetaalKnop(){
  betaalKnop.innerText = "Betalen";
}

function startTransaction(){
  console.log(aantalElement.value)
  var goAhead = true;

  // Check Inputs
  inputIds.forEach(s =>{
    var input = document.getElementById(s).value
    var required = document.getElementById(s).required

    if (required && (input == "" || input == null) ){
      betaalKnop.innerText = "Missende info!";
      goAhead = false;
    }
  })

  // Check Amount
  if (aantalElement.value == "0" || !aantalElement.value || isNaN(aantalElement.value)) {
    betaalKnop.innerText = "Specifieer je aantal!"
    goAhead = false;
  }

  if (goAhead) {
    betaalKnop.innerText = "Even Wachten..."
    setTimeout(startTransactionRequest, 2000)
  }
}

function startTransactionRequest(){
  $.ajax({
    method: "POST",
    url: "https://delavkiaanapi.herokuapp.com/transactions/StartTransactionTest",
    // url: "http://localhost:3000/transactions/StartTransactionTest",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      amount: aantalElement.value,

      fname: inputData["FName"],
      lname: inputData["LName"],
      email: inputData["Email"],
      tel: inputData["Tel"],

      street: inputData["Street"],
      number: inputData["Number"],
      ponumber: inputData["POBox"],
      zip: inputData["Postal"],
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

function subscribe() {
  email = emailInput.value;

  $.ajax({
    method: "POST",
    url: "https://delavkiaanapi.herokuapp.com/mails/subscribe",
    // url: "http://localhost:3000/mails/subscribe",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
    }),
    success: function(data){
      subscribeButton.innerText = "Ingeschreven!"
    },
    error: function(data){
      subscribeButton.innerText = "Foutje..."
    }
  })
}