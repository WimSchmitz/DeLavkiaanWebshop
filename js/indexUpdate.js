if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  //The DOMContentLoaded event has already fired. Just run the code.
  afterLoaded();
}

function afterLoaded(){
  $.ajax({
    method: "GET",
    url: "https://delavkiaanapi.herokuapp.com",
    // url: "http://localhost:3000",
    success: function(data){
      console.log(data)
    },
    error: function(data){
      console.log(data)
    }
  })
}