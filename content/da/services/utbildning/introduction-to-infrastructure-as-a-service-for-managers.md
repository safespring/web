---
ai: true
title: "Introduktion til “infrastruktur som en tjeneste” for ledere"
language: "da"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "Overblik og forståelse fra et ledelsesperspektiv, som gør det muligt for ledelsen og det tekniske personale at danne en fælles forståelse."
background: ""
sidebarlinkname: "Kursusbeskrivelse"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
aliases:
  - /tjanster/utbildning/introduction-to-infrastructure-as-a-service-for-managers/
---
## Beskrivelse

Henvendt til ledere med overordnet teknisk forståelse, men uden specialviden. Giver et overblik og en forståelse fra et ledelsesperspektiv, som gør det muligt for ledelse og teknisk personale at opnå en fælles forståelse af den aktuelle situation, vejen frem, kort- og langsigtede mål, processer, metodik og strategi.

### Niveau

Begynder (uden eller med begrænset teknisk viden).

### Hvem bør deltage?

CEO, CTO, IT-chefer, udviklingschefer, tekniske chefer, linjeledere, topledere m.fl.

### Varighed

1 dag.

### Indhold

Safespring Cloud Infrastructure med OpenStack.
Kort introduktion til cloud-infrastruktur med OpenStack på Safesprings cloud-platform. Du får først en teoretisk gennemgang af cloud-infrastruktur som helhed og dernæst mere specifikt om OpenStack. Dagen afsluttes med øvelser i Safesprings platform, hvor du opsætter nogle instanser og en applikation på Safesprings platform.

<div class="accordion-box">
<button class="accordion">Emner der dækkes</button>
<div class="panel content-body">
<p>Disse emner bliver dækket:</p>
<ul>
	<li>Hvad er skytjenester?</li>
	<li>Væsentlige kendetegn ved cloud</li>
	<li>Forskellige modeller (IaaS, PaaS og SaaS)</li>
	<li>Cloud-implementeringsmodeller (offentlig, privat, fællesskab og hybrid)</li>
	<li>Hvorfor skytjenester nu?</li>
	<li>Virtualisering</li>
	<li>Lagring på compute-noder eller i en lagringsklynge</li>
	<li>Snapshots af instanser og volumener</li>
	<li>Netværk</li>
	<li>OpenStack
  <ul>
  	<li>Overblik</li>
  	<li>Komponenter (Nova, Cinder, Glance, Neutron og Keystone)</li>
  	<li>Forskellige lageringsmuligheder (bloklagring, objektlagring)</li>
  	<li>Instanstyper (flavors)</li>
  	<li>Netværksopsætning i Safesprings platform</li>
  	<li>Sikkerhedsgrupper</li>
  	<li>Nøglepar til adgang</li>
  </ul>
  </li>
	<li>LAB-øvelser – lær Safesprings infrastrukturtjenester at kende
  <ul>
  	<li>Opsæt netværk</li>
  	<li>Opret eller upload dit nøglepar</li>
  	<li>Start din første instans (frontend)</li>
  	<li>Opsætning af sikkerhedsgrupper</li>
  	<li>Start din anden instans (backend)</li>
  	<li>Udrulning af en applikation (Nextcloud)</li>
  	<li>Konfigurer S3 som backend til Nextcloud</li>
  </ul>
  </li>
	<li>Spørgsmål og svar samt diskussioner</li>
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

## Sådan tilmelder du dig

Giv os besked om, at du er interesseret i kurset "Introduktion til “Infrastructure as a Service” for ledere". Udfyld formularen nedenfor, så kontakter vi dig.

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color:#195f8c}.twitter-typeahead .tt-menu{max-height:300px;overflow:auto;border:1px solid #195f8c;border-top:none;border-radius:0 0 25px 25px;width:298px;margin:-7px 0 0 -52px}.twitter-typeahead .tt-suggestion{background-color:#fafefe;padding:5px 10px;color:#323232}.tt-suggestion:first-child{margin:7px 0 0 0;padding-top:10px}.tt-suggestion:last-child{padding-bottom:20px}.twitter-typeahead .tt-suggestion:hover{background-color:#fafefe;color:#195f8c}
</style>
<script>
  jQuery(document).ready(function(){var t=null,a=jQuery("#up-client-name-input");if(a.length){var i=jQuery("<input type='hidden' name='Client.dunsNo' />"),e=jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");e.hide(),a.after(i),a.after(e),a.typeahead({hint:!0,highlight:!0,minLength:3},{name:"clients",limit:25,source:function(e,n,a){t&&clearTimeout(t),t=setTimeout(function(){$.ajax({type:"GET",url:"https://power.upsales.com/api/external/soliditet/clientSearch?name="+e,success:function(e){a(e.data)},error:function(e){}})},200)},templates:{suggestion:function(e){return"<div><div>"+e.name+"</div><span style='color: #323232; font-size: 10px;'>"+e.city+"</span></div>"}}}).bind("typeahead:autocompleted",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo),a.blur()}).bind("typeahead:select",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).bind("typeahead:cursorchange",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).on("typeahead:asyncrequest",function(){e.show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){e.hide()})}});
</script>
<form id="up-form" name="form_9549ue770a5b7152b4b9796393b0943084e71" action="https://power.upsales.com/api/external/formSubmit" method="POST">
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="" placeholder="Organisation"></div>
  <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.name" required="" placeholder="Dit navn"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.cellPhone" required="" placeholder="Dit mobilnummer"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="Din e-mail"></div>
  <input type="hidden" value="Introduction to “Infrastructure as a Service” for managers" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Ved at indsende denne formular accepterer du vores <a href="/dokument/personuppgiftshantering/" target="_blank">vilkår og betingelser</a> (svensk).</p>
	<button type="submit" class="button">Send forespørgsel</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>