---
ai: true
title: "Introduktion till ”infrastruktur som tjänst” för chefer"
language: "sv"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "Översikt och förståelse ur ett ledningsperspektiv som gör det möjligt för ledning och teknisk personal att skapa en gemensam förståelse."
background: ""
sidebarlinkname: "Kursbeskrivning"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
aliases:
  - /tjanster/utbildning/introduction-to-infrastructure-as-a-service-for-managers/
---
## Beskrivning

Riktar sig till chefer med övergripande teknisk förståelse men utan expertkunskap. Ger en överblick och förståelse ur ett ledningsperspektiv som möjliggör att ledning och teknisk personal formar en gemensam bild av nuläge, väg framåt, lång- och kortsiktiga mål, processer, metodik och strategi.

### Nivå

Nybörjare (utan eller med begränsade tekniska kunskaper).

### Vem bör delta?

VD, CTO, IT‑chefer, utvecklingschefer, tekniska chefer, linjechefer, chefer på hög nivå, etc.

### Längd

1 dag.

### Innehåll

Safespring Cloud Infrastructure med OpenStack.
Kort introduktion till molninfrastruktur med OpenStack på Safesprings molnplattform. Du får först en teoretisk orientering om molninfrastruktur som helhet och därefter mer specifikt om OpenStack. Dagen avslutas med övningar i Safesprings plattform där du sätter upp några instanser och en applikation i Safesprings plattform.

<div class="accordion-box">
<button class="accordion">Ämnen som behandlas</button>
<div class="panel content-body">
<p>Dessa ämnen kommer att behandlas:</p>
<ul>
	<li>Vad är molntjänster?</li>
	<li>Centrala molnegenskaper</li>
	<li>Olika modeller (IaaS, PaaS och SaaS)</li>
	<li>Distributionsmodeller för moln (publikt, privat, community och hybrid)</li>
	<li>Varför molntjänster nu?</li>
	<li>Virtualisering</li>
	<li>Lagring på beräkningsnoder eller i lagringskluster</li>
	<li>Ögonblicksbilder av instanser och volymer</li>
	<li>Nätverk</li>
	<li>OpenStack
  <ul>
  	<li>Översikt</li>
  	<li>Komponenter (Nova, Cinder, Glance, Neutron och Keystone)</li>
  	<li>Olika lagringsalternativ (blocklagring, objektlagring)</li>
  	<li>Flavors</li>
  	<li>Nätverkskonfiguration i Safesprings plattform</li>
  	<li>Säkerhetsgrupper</li>
  	<li>Nyckelpar för åtkomst</li>
  </ul>
  </li>
	<li>LAB‑övningar – lär känna Safesprings infrastrukturtjänster
  <ul>
  	<li>Sätt upp nätverk</li>
  	<li>Skapa eller ladda upp ditt nyckelpar</li>
  	<li>Starta din första instans (frontend)</li>
  	<li>Konfigurera säkerhetsgrupper</li>
  	<li>Starta din andra instans (backend)</li>
  	<li>Distribuera en applikation (Nextcloud)</li>
  	<li>Konfigurera S3 som backend för Nextcloud</li>
  </ul>
  </li>
	<li>Frågor och svar samt diskussioner</li>
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

Meddela att du är intresserad av kursen ”Introduktion till ‘Infrastructure as a Service’ för chefer”. Fyll i formuläret nedan så kontaktar vi dig.

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
  <input type="hidden" value="Introduktion till ”Infrastructure as a Service” för chefer" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Genom att skicka in formuläret godkänner du våra <a href="/dokument/personuppgiftshantering/" target="_blank">villkor</a> (svenska).</p>
	<button type="submit" class="button">Skicka förfrågan</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>