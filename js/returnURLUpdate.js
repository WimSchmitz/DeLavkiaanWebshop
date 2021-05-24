var paymentStatusBodyElement;
var paymentStatusTitleElement;

const SuccessTitleText = "Bedankt!";
const SuccessBodyText = "Uw betaling is verwerkt, en wij hebben uw bestelling goed ontvangen. <br><br> "
  + "Over enkele weken kan u genieten van de meest Hasseltse bock ooit gebrouwen. <br><br>" 
  + "Groeten van de Lavkiaanse brouwers!";

const VerwerkingTitleText = "Nog even geduld...";
const VerwerkingBodyText = "Wij zijn nog even bezig met het verwerken van uw betaling. <br><br>"
  + "Zodra uw betaling is afgerond, ontvangt u van ons een email. <br>"
  + "Als u geen email ontvangen hebt en nog vragen heeft over de status van uw betaling, gelieve ons te contacteren via <a href='mailto:brouwerijdelavkiaan@gmail.com'>brouwerijdelavkiaan@gmail.com</a> <br> " 
  + "met vermelding van uw persoonlijke transactiecode ";

const FailedTitleText = "Er is iets fout gegaan.";
const FailedBodyText = "Uw betaling is niet gelukt. Er is geen geld van uw rekening afgeschreven. <br> "
  + "Gelieve de betaling later opnieuw te proberen. <br><br>"
  + "Als u nog vragen heeft over de status van uw betaling, gelieve ons te contacteren via <a href='mailto:brouwerijdelavkiaan@gmail.com'>brouwerijdelavkiaan@gmail.com</a> <br> "
  + "met vermelding van uw persoonlijke transactiecode: ";

const VerificationTitleText = "Er is iets fout gegaan.";
const VerificationBodyText = "Er is een afwijkende statuscode doorgekomen. <br> "
  + "We gaan uw betaling manueel controleren, en zullen u via mail verwittigen van de status van uw bestelling. <br><br>"
  + "Als u nog vragen heeft over de status van uw betaling, gelieve ons te contacteren via <a href='mailto:brouwerijdelavkiaan@gmail.com'>brouwerijdelavkiaan@gmail.com</a> <br>"
  + "met vermelding van uw persoonlijke transactiecod: ";

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  afterLoaded()
}

function afterLoadedWithTimeout(){
  paymentStatusTitleElement = document.getElementById("paymentStatusTitle");
  paymentStatusBodyElement = document.getElementById("paymentStatusBody");

  setTimeout(parsePaymentStatus, 3000)
}

function parsePaymentStatus() {
  var queryString = (window.location.search);
  console.log(queryString)
  var urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams)
  
  switch (urlParams.get("orderStatusId")) {
    case "100":
      window.location.href = "bedankt.html";
      break;

    case "50":
    case "-95":
      paymentStatusBodyElement.innerHTML = VerwerkingBodyText + (urlParams.get("orderId") || "")
      paymentStatusTitleElement.innerHTML = VerwerkingTitleText 
      break;

    case "-90":
    case "-63":
      paymentStatusBodyElement.innerHTML = FailedBodyText + (urlParams.get("orderId") || "")
      paymentStatusTitleElement.innerHTML = FailedTitleText 
      break;

    default:
      paymentStatusBodyElement.innerHTML = VerificationBodyText + (urlParams.get("orderId") || "")
      paymentStatusTitleElement.innerHTML = VerificationTitleText 
      break; 
      
  }
}