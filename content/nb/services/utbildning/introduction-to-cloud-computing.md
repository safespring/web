---
ai: true
title: "Introduksjon til skytjenester"
language: "nb"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "For tekniske fagfolk som ønsker å lære å bygge skyinfrastruktur."
background: ""
sidebarlinkname: "Kursbeskrivelse"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
aliases:
  - /tjanster/utbildning/introduction-to-cloud-computing/
---
## Beskrivelse

For ledere eller teknologikyndige ansatte som ønsker praktisk erfaring med skybasert databehandling og å forstå skylanskapet. Vi går i dybden på muliggjørende teknologier og tilhørende strategiske hensyn ved utrulling til skyen. Dette kurset kan hjelpe deg i gang med leverandører av offentlig sky og gi forståelse for komponentene som trengs for å kjøre arbeidslastene dine i skyen.

Dette kurset kan deles opp i flere forelesninger. Last ned kursbeskrivelsen for mer informasjon.

### Nivå

Nybegynner (med noe teknisk kunnskap).

### Hvem bør delta?

Programvareutviklere, tekniske prosjektledere, programvarearkitekter, driftsstøttepersonell, utrullingsingeniører, IT-ledere, utviklingsledere, tekniske ledere, linjeledere, QA- og testfagfolk, domenespesialister m.fl. Fra alle bransjer.

### Varighet

4 dager (eller 2 + 2 dager).

### Innhold

8–9 forelesninger + 1 workshop

<div class="accordion-box">
<button class="accordion">Temaer som dekkes</button>
<div class="panel content-body">
<p>Disse temaene vil bli dekket:</p>
<ul>
<li>Definisjoner av skybasert databehandling</li>
<li>Beregningsmodeller og lastbalansering</li>
<li>Virtualisering i skyen</li>
<li>Skylagring</li>
<li>Tjenesteorientert arkitektur / mikrotjenester</li>
<li>Programvaredefinerte nettverk</li>
<li>Grunnleggende om skalerbarhet</li>
<li>Big data</li>
<li>Observabilitet</li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

<div class="accordion-box">
<button class="accordion">Økter</button>
<div class="panel content-body">
<p>Eksempel på kursplan:</p>
<ul>
<li><b>Økt 1</b> (2–3 timer)
<ul>
<li>Introduksjon til skytjenester</li>
<li>Beregningsmodeller og lastbalansering</li>
</ul></li>
<li><b>Økt 2</b> (2–3 timer)
<ul>
<li>Virtualisering i skyen</li>
<li>Skylagring</li>
</ul></li>
<li><b>Økt 3</b> (2–3 timer)
<ul>
<li>Programvaredefinerte nettverk</li>
<li>SOA / mikrotjenester</li>
</ul></li>
<li><b>Økt 4</b> (2–3 timer)
<ul>
<li>Big data</li>
<li>Observabilitet</li>
</ul></li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

<script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active-utbildning");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
</script>

## Slik melder du interesse

Gi oss beskjed om at du er interessert i kurset "Introduction to Cloud Computing". Fyll ut skjemaet nedenfor, så tar vi kontakt.

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color:#195f8c}.twitter-typeahead .tt-menu{max-height:300px;overflow:auto;border:1px solid #195f8c;border-top:none;border-radius:0 0 25px 25px;width:298px;margin:-7px 0 0 -52px}.twitter-typeahead .tt-suggestion{background-color:#fafefe;padding:5px 10px;color:#323232}.tt-suggestion:first-child{margin:7px 0 0 0;padding-top:10px}.tt-suggestion:last-child{padding-bottom:20px}.twitter-typeahead .tt-suggestion:hover{background-color:#fafefe;color:#195f8c}
</style>
<script>
  jQuery(document).ready(function(){var t=null,a=jQuery("#up-client-name-input");if(a.length){var i=jQuery("<input type='hidden' name='Client.dunsNo' />"),e=jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");e.hide(),a.after(i),a.after(e),a.typeahead({hint:!0,highlight:!0,minLength:3},{name:"clients",limit:25,source:function(e,n,a){t&&clearTimeout(t),t=setTimeout(function(){$.ajax({type:"GET",url:"https://power.upsales.com/api/external/soliditet/clientSearch?name="+e,success:function(e){a(e.data)},error:function(e){}})},200)},templates:{suggestion:function(e){return"<div><div>"+e.name+"</div><span style='color: #323232; font-size: 10px;'>"+e.city+"</span></div>"}}}).bind("typeahead:autocompleted",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo),a.blur()}).bind("typeahead:select",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).bind("typeahead:cursorchange",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).on("typeahead:asyncrequest",function(){e.show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){e.hide()})}});
</script>
<form id="up-form" name="form_9549ue770a5b7152b4b9796393b0943084e71" action="https://power.upsales.com/api/external/formSubmit" method="POST">
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="" placeholder="Organisasjon"></div>
  <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.name" required="" placeholder="Navnet ditt"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.cellPhone" required="" placeholder="Mobilnummeret ditt"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="E-postadressen din"></div>
  <input type="hidden" value="Introduction to Cloud Computing" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Ved å sende inn dette skjemaet samtykker du til våre <a href="/dokument/personuppgiftshantering/" target="_blank">vilkår og betingelser</a> (svensk).</p>
	<button type="submit" class="button">Send forespørsel</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>