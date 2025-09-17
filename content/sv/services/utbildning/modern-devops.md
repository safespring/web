---
ai: true
title: "Modern DevOps och mikrotjänster"
language: "sv"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "För tekniska yrkesverksamma som vill lära sig att bygga molninfrastruktur."
background: ""
sidebarlinkname: "Kursbeskrivning"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
aliases:
  - /tjanster/utbildning/modern-devops/
---
## Beskrivning

För tekniska yrkespersoner som vill lära sig att bygga infrastruktur för molnet. Vi går igenom vad det innebär att bygga och stödja molnmiljöer för organisationens behov av mikrotjänster baserade på Kubernetes. Vi lär oss att bygga produktionsklara kluster för mikrotjänster som är säkra, observerbara och stödjer kontinuerlig integration/driftsättning och leverans, vilket påskyndar organisationens time-to-market för utvecklingsarbetet.

Den här kursen kan delas upp i flera föreläsningar. Ladda ner kursbeskrivningen för mer information.

### Nivå

Mellannivå

### Vem bör delta?

Mjukvaruutvecklare, tekniska projektledare, mjukvaruarkitekter, drift- och supportpersonal, driftsättningsingenjörer, IT‑chefer, utvecklingschefer, tekniska chefer, linjechefer, QA- och testproffs, domänexperter etc. Från alla branscher.

### Längd

4 dagar (eller 2 + 2 dagar)

### Innehåll

<div class="accordion-box">
<button class="accordion">Ämnen som tas upp</button>
<div class="panel content-body">
<p>Dessa ämnen kommer att behandlas:</p>
<ul>
<li>Grunderna i Kubernetes</li>
<li>Introduktion
<ul>
<li>Helm</li>
<li>Knative</li>
<li>Istio</li>
<li>Ansible (infrastruktur som kod)</li>
</ul></li>
<li>DevOps-livscykler</li>
<li>Molnlagring</li>
<li>Programvarudefinierade nätverk</li>
<li>Mikrotjänster</li>
<li>Serverlös arkitektur/utveckling</li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

<div class="accordion-box">
<button class="accordion">Sessioner</button>
<div class="panel content-body">
<p>Exempel på kursupplägg:</p>
<ul>
<li><b>Session 1</b> (2–3 timmar)
<ul>
<li>Introduktion till DevOps</li>
<li>Grunderna i Ansible</li>
</ul></li>
<li><b>Session 2</b> (3–4 timmar)
<ul>
<li>Grunderna i Kubernetes (inkl. Helm)</li>
<li>Kontinuerlig integration / leverans</li>
<li>Programvarudefinierade nätverk</li>
</ul></li>
<li><b>Session 3</b> (2–3 timmar)
<ul>
<li>Molnlagring</li>
<li>Molnvirtualisering</li>
</ul></li>
<li><b>Session 4</b> (2–3 timmar)
<ul>
<li>SOA / mikrotjänster</li>
<li>Observerbarhet</li>
</ul></li>
<li><b>Session 5</b> (2–3 timmar)
<ul>
<li>Service Mesh / Istio</li>
<li>Serverlös / Knative</li>
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

## Så anmäler du dig

Meddela att du är intresserad av kursen "Modern DevOps & Microservices". Fyll i formuläret nedan så kontaktar vi dig.

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color:#195f8c}.twitter-typeahead .tt-menu{max-height:300px;overflow:auto;border:1px solid #195f8c;border-top:none;border-radius:0 0 25px 25px;width:298px;margin:-7px 0 0 -52px}.twitter-typeahead .tt-suggestion{background-color:#fafefe;padding:5px 10px;color:#323232}.tt-suggestion:first-child{margin:7px 0 0 0;padding-top:10px}.tt-suggestion:last-child{padding-bottom:20px}.twitter-typeahead .tt-suggestion:hover{background-color:#fafefe;color:#195f8c}
</style>
<script>
  jQuery(document).ready(function(){var t=null,a=jQuery("#up-client-name-input");if(a.length){var i=jQuery("<input type='hidden' name='Client.dunsNo' />"),e=jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");e.hide(),a.after(i),a.after(e),a.typeahead({hint:!0,highlight:!0,minLength:3},{name:"clients",limit:25,source:function(e,n,a){t&&clearTimeout(t),t=setTimeout(function(){$.ajax({type:"GET",url:"https://power.upsales.com/api/external/soliditet/clientSearch?name="+e,success:function(e){a(e.data)},error:function(e){}})},200)},templates:{suggestion:function(e){return"<div><div>"+e.name+"</div><span style='color: #323232; font-size: 10px;'>"+e.city+"</span></div>"}}}).bind("typeahead:autocompleted",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo),a.blur()}).bind("typeahead:select",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).bind("typeahead:cursorchange",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).on("typeahead:asyncrequest",function(){e.show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){e.hide()})}});
</script>
<form id="up-form" name="form_9549ue770a5b7152b4b9796393b0943084e71" action="https://power.upsales.com/api/external/formSubmit" method="POST">
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="" placeholder="Organisation"></div>
  <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.name" required="" placeholder="Ditt namn"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.cellPhone" required="" placeholder="Ditt mobilnummer"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="Din e-post"></div>
  <input type="hidden" value="Modern DevOps & Microservices” for managers" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Genom att skicka in det här formuläret godkänner du våra <a href="/dokument/personuppgiftshantering/" target="_blank">villkor</a> (på svenska).</p>
	<button type="submit" class="button">Skicka förfrågan</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>