const SuccessTitleText = "Bedankt!";
const SuccessBodyText = "Uw betaling is verwerkt, en wij hebben uw bestelling goed ontvangen. <br><br>Over enkele weken kan u genieten van de meest Hasseltse bock ooit gebrouwen. <br><br>Groeten van de Lavkiaanse brouwers.";

const VerwerkingTitleText = "Nog even geduld...";
const VerwerkingBodyText = "Wij zijn nog even bezig met het verwerken van uw betaling. <br><br>Zodra uw betaling is afgerond, ontvangt u van ons een email. <br><br>Als u geen email ontvangen hebt en nog vragen heeft over de status van uw betaling, gelieve ons te contacteren via brouwerijdelavkiaan@gmail.com";

const FailedTitleText = "Er is iets fout gegaan...";
const FailedBodyText = "Uw betaling is niet gelukt. Er is geen geld van uw rekening afgeschreven. <br><br> Gelieve de betaling later opnieuw te proberen. <br><br> Als u nog vragen heeft over de status van uw betaling, gelieve ons te contacteren via brouwerijdelavkiaan@gmail.com";

const VerificationText = "Er is iets fout gegaan...";
const VerificationText = "Er is een afwijkende statuscode doorgekomen. <br><br> We gaan uw betaling manueel controleren, en zullen u via mail verwittigen van de status van uw bestelling <br><br> Als u nog vragen heeft over de status van uw betaling, gelieve ons te contacteren via brouwerijdelavkiaan@gmail.com";

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setTimeout(afterLoaded(), 3000));
} else {
  //The DOMContentLoaded event has already fired. Just run the code.
  setTimeout(afterLoaded(), 2000)
}

function afterLoaded() {
  paymentStatusTitleElement = document.getElementById("paymentStatusTitle");
  paymentStatusBodyElement = document.getElementById("paymentStatusBody");
  
  var queryString = window.location.search;
  console.log(queryString)
  var urlParams = new URLSearchParams(queryString);
  switch (urlparams.orderStatusId) {
    case "100":
      paymentStatusBodyElement.innerText = SuccessBodyText
      paymentStatusTitleElement.innerText = SuccessTitleText
      break;

    case "50":
    case "-95":
      paymentStatusBodyElement.innerText = VerwerkingBodyText
      paymentStatusTitleElement.innerText = VerwerkingTitleText
      break;

    case "-90":
    case "-63":
      paymentStatusBodyElement.innerText = FailedBodyText
      paymentStatusTitleElement.innerText = FailedTitleText
      break;

    default:
      paymentStatusBodyElement.innerText = VerwerkingBodyText
      paymentStatusTitleElement.innerText = VerwerkingTitleText
      break; 
      
  }(urlParams.orderStatusId)
}