if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  afterLoaded()
}

function afterLoaded() {
  console.log("Waking up API...")
  $.ajax({
    method: "GET",
    url: "https://delavkiaanapi.herokuapp.com/",
    success: function(response){
      console.log("Success: " + response)
    },
    error: function(response){
      console.log("Error: " + response)
    }
  })
}