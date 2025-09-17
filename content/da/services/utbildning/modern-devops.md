---
ai: true
title: "Moderne DevOps og mikrotjenester"
language: "da"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "For tekniske fagfolk, der vil lære at opbygge infrastruktur i skyen."
background: ""
sidebarlinkname: "Kursusbeskrivelse"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
aliases:
  - /tjanster/utbildning/modern-devops/
---
## Beskrivelse

For tekniske fagfolk, der ønsker at lære at bygge infrastruktur til skyen. Vi gennemgår, hvad det vil sige at opbygge og understøtte sky-miljøer til jeres organisations behov for mikrotjenester baseret på Kubernetes. Vi lærer at bygge en produktionsklar klynge af mikrotjenester, der er sikre, observerbare og understøtter kontinuerlig integration/udrulning og levering (CI/CD), hvilket accelererer jeres organisations time-to-market for udviklingsindsatsen.

Dette kursus kan opdeles i flere lektioner. Download kursusbeskrivelsen for flere oplysninger.

### Niveau

Mellemniveau

### Hvem bør deltage?

Softwareudviklere, tekniske projektledere, softwarearkitekter, professionelle inden for drift og support, udrulningsingeniører, IT-chefer, udviklingschefer, tekniske ledere, linjeledere, specialister i kvalitetssikring og test, domæneeksperter m.fl. Fra alle brancher.

### Varighed

4 dage (eller 2 + 2 dage)

### Indhold

<div class="accordion-box">
<button class="accordion">Emner, der dækkes</button>
<div class="panel content-body">
<p>Disse emner vil blive gennemgået:</p>
<ul>
<li>Kubernetes-grundlæggende</li>
<li>Introduktion
<ul>
<li>Helm</li>
<li>Knative</li>
<li>Istio</li>
<li>Ansible (infrastruktur som kode)</li>
</ul></li>
<li>DevOps-livscyklusser</li>
<li>Cloud-lagring</li>
<li>Software-definerede netværk</li>
<li>Mikrotjenester</li>
<li>Serverløs arkitektur/udvikling</li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

<div class="accordion-box">
<button class="accordion">Sessioner</button>
<div class="panel content-body">
<p>Eksempel på kursusplan:</p>
<ul>
<li><b>Session 1</b> (2–3 timer)
<ul>
<li>Introduktion til DevOps</li>
<li>Ansible-grundlæggende</li>
</ul></li>
<li><b>Session 2</b> (3–4 timer)
<ul>
<li>Kubernetes-grundlæggende (inkl. Helm)</li>
<li>Kontinuerlig integration/levering</li>
<li>Software-definerede netværk</li>
</ul></li>
<li><b>Session 3</b> (2–3 timer)
<ul>
<li>Cloud-lagring</li>
<li>Cloud-virtualisering</li>
</ul></li>
<li><b>Session 4</b> (2–3 timer)
<ul>
<li>SOA/mikrotjenester</li>
<li>Observerbarhed</li>
</ul></li>
<li><b>Session 5</b> (2–3 timer)
<ul>
<li>Service Mesh/Istio</li>
<li>Serverløs/Knative</li>
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

## Sådan tilmelder du dig

Giv os besked om, at du er interesseret i kurset "Modern DevOps & Microservices". Udfyld formularen nedenfor, så kontakter vi dig.

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
  <input type="hidden" value="Modern DevOps & Microservices” for managers" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Ved at indsende denne formular accepterer du vores <a href="/dokument/personuppgiftshantering/" target="_blank">vilkår og betingelser</a> (på svensk).</p>
	<button type="submit" class="button">Send forespørgsel</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>