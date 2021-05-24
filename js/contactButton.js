var subscribeButton;
var subscribeEmailElement;

var contactButton
var contactEmailElement;
var contactNameElement;
var contactMessageElement;

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  //The DOMContentLoaded event has already fired. Just run the code.
  afterLoaded();
}

function afterLoaded(){
  contactButton = document.getElementById("ContactButton")
  contactEmailElement = document.getElementById("ContactEmail")
  contactNameElement = document.getElementById("ContactName")
  contactMessageElement = document.getElementById("ContactMessage")

  contactButton.onclick = contact;
}

function contact() {
  console.log("Triggered!")
  email = contactEmailElement.value;
  name = contactNameElement.value;
  body = contactMessageElement.value;

  $.ajax({
    method: "POST",
    url: "https://delavkiaanapi.herokuapp.com/mails/question",
    // url: "http://localhost:3000/mails/subscribe",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
      name: name,
      body: body
    }),
    success: function(data){
      contactButton.value = "Bedankt! We beantwoorden je mail zo snel mogelijk."
    },
    error: function(data){
      subscribeButton.value = "Foutje..."
    }
  })
}