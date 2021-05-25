var aantalElement;
var kostElement;
var kostElementHidden;
var betaalKnop;
var subscribeButton;
var emailInput;

var privacyCheckbox;
var leaderboardCheckbox;
var ageCheckbox;

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
  betaalKnop = document.getElementById("betaalknop");
  subscribeButton = document.getElementById("Subscribe");

  privacyCheckbox = document.getElementById("PrivacyCheckbox");
  leaderboardCheckbox = document.getElementById("LeaderboardCheckbox");
  ageCheckbox = document.getElementById("AgeCheckbox");

  privacyCheckbox.onchange = resetBetaalKnop;
  ageCheckbox.onchange = resetBetaalKnop;
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
  var goAhead = true;

  // Check Amount
  if (goAhead && (aantalElement.value == "0" || !aantalElement.value || isNaN(aantalElement.value))) {
    betaalKnop.innerText = "Specifieer je aantal!"
    goAhead = false;
  }

  // Check Inputs
  inputIds.forEach(s => {
    inputData[s] = document.getElementById(s).value
    var required = document.getElementById(s).required

    if (goAhead && required && (inputData[s] == "" || inputData[s] == null) ){
      betaalKnop.innerText = "Missende info!";
      goAhead = false;
    }
  })

  // Check Privacy
  var privacyChecked = privacyCheckbox.checked
  if (!privacyChecked && goAhead){
    betaalKnop.innerText = "Accepteer privacybeleid";
    goAhead = false;
  }

  // Check Age
  var ageChecked = ageCheckbox.checked
  if (!ageChecked && goAhead){
    betaalKnop.innerText = "Accepteer leeftijd";
    goAhead = false;
  }

  if (goAhead) {
    betaalKnop.innerText = "Even Wachten..."
    var leaderboardChecked = leaderboardCheckbox.checked
    setTimeout(startTransactionRequest(leaderboardChecked, inputData, aantalElement.value), 2000)
  }
}

function startTransactionRequest(leaderboardChecked, inputData, amount){
  $.ajax({
    method: "POST",
    url: "https://delavkiaanapi.herokuapp.com/transactions/StartTransaction",
    // url: "http://localhost:3000/transactions/StartTransaction",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      amount: amount,

      fname: inputData["FName"],
      lname: inputData["LName"],
      email: inputData["Email"],
      tel: inputData["Tel"],

      street: inputData["Street"],
      number: inputData["Number"],
      ponumber: inputData["POBox"],
      zip: inputData["Postal"],
      city: inputData["City"],

      leaderboard: leaderboardChecked
    }),
    success: function(data){
      window.location.href = data
    },
    error: function(data){
      console.log(data)
    }
  })
}