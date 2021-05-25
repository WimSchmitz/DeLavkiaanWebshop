var subscribeButton;
var subscribeEmailElement;

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  //The DOMContentLoaded event has already fired. Just run the code.
  afterLoaded();
}

function afterLoaded(){
  subscribeButton = document.getElementById("SubscribeButton")
  subscribeEmailElement = document.getElementById("SubscribeEmail")

  subscribeButton.onclick = subscribe;
}

function subscribe() {
  console.log("Triggered!")
  email = subscribeEmailElement.value;

  subscribeButton.value = "Even Wachten...";
  subscribeButton.onclick = null;

  $.ajax({
    method: "POST",
    url: "https://delavkiaanapi.herokuapp.com/mails/subscribe",
    // url: "http://localhost:3000/mails/subscribe",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
    }),
    success: function(data){
      subscribeButton.value = "Ingeschreven!"
    },
    error: function(data){
      subscribeButton.value = "Foutje..."
    }
  })
}