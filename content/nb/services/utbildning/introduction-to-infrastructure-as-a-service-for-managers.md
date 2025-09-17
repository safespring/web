---
ai: true
title: "Introduksjon til «infrastruktur som en tjeneste» for ledere"
language: "nb"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "Oversikt og forståelse fra et ledelsesperspektiv som gjør det mulig for ledelse og teknisk personell å danne en felles forståelse."
background: ""
sidebarlinkname: "Kursbeskrivelse"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
aliases:
  - /tjanster/utbildning/introduction-to-infrastructure-as-a-service-for-managers/
---
## Beskrivelse

Rettet mot ledere med overordnet teknisk forståelse, men uten spesialkompetanse. En oversikt og forståelse fra et ledelsesperspektiv som gjør det mulig for ledelse og teknisk personell å etablere en felles forståelse av nåsituasjonen, veien videre, langsiktige og kortsiktige mål, prosesser, metodikk og strategi.

### Nivå

Nybegynner (uten eller med begrenset teknisk kunnskap).

### Hvem bør delta?

Administrerende direktør, CTO, IT-ledere, utviklingsledere, tekniske ledere, linjeledere, toppledere osv.

### Varighet

1 dag.

### Innhold

Safespring Cloud-infrastruktur med OpenStack.
Kort introduksjon til skyinfrastruktur med OpenStack på Safesprings skyplattform. Du får først en teoretisk gjennomgang av skyinfrastruktur som helhet og deretter mer spesifikt om OpenStack. Dagen avsluttes med øvelser i Safesprings plattform der du setter opp noen instanser og en applikasjon i Safesprings plattform.

<div class="accordion-box">
<button class="accordion">Temaer som dekkes</button>
<div class="panel content-body">
<p>Disse temaene blir dekket:</p>
<ul>
	<li>Hva er skytjenester?</li>
	<li>Viktige kjennetegn ved skytjenester</li>
	<li>Ulike modeller (IaaS, PaaS og SaaS)</li>
	<li>Utrullingsmodeller for skyen (offentlig, privat, fellesskap og hybrid)</li>
	<li>Hvorfor skytjenester nå?</li>
	<li>Virtualisering</li>
	<li>Lagring på beregningsnoder eller i et lagringskluster</li>
	<li>Øyeblikksbilder av instanser og volumer</li>
	<li>Nettverk</li>
	<li>OpenStack
  <ul>
  	<li>Oversikt</li>
  	<li>Komponenter (Nova, Cinder, Glance, Neutron og Keystone)</li>
  	<li>Ulike lagringsalternativer (blokklagring, objektlagring)</li>
  	<li>Flavors</li>
  	<li>Nettverksoppsett i Safesprings plattform</li>
  	<li>Sikkerhetsgrupper</li>
  	<li>Nøkkelpar for tilgang</li>
  </ul>
  </li>
	<li>LAB-øvelser – bli kjent med Safesprings infrastrukturtjenester
  <ul>
  	<li>Sett opp nettverk</li>
  	<li>Opprett eller last opp nøkkelparet ditt</li>
  	<li>Starte din første instans (frontend)</li>
  	<li>Konfigurere sikkerhetsgrupper</li>
  	<li>Starte din andre instans (backend)</li>
  	<li>Distribuere en applikasjon (Nextcloud)</li>
  	<li>Konfigurer S3 som backend for Nextcloud</li>
  </ul>
  </li>
	<li>Spørsmål og svar samt diskusjoner</li>
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

## Slik melder du deg på

Gi oss beskjed om at du er interessert i kurset «Introduksjon til ‘Infrastructure as a Service’ for ledere». Fyll ut skjemaet nedenfor, så tar vi kontakt.

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color:#195f8c}.twitter-typeahead .tt-menu{max-height:300px;overflow:auto;border:1px solid #195f8c;border-top:none;border-radius:0 0 25px 25px;width:298px;margin:-7px 0 0 -52px}.twitter-typeahead .tt-suggestion{background-color:#fafefe;padding:5px 10px;color:#323232}.tt-suggestion:first-child{margin:7px 0 0 0;padding-top:10px}.tt-suggestion:last-child{padding-bottom:20px}.twitter-typeahead .tt-suggestion:hover{background-color:#fafefe;color:#195f8c}
</style>
<script>
  jQuery(document).ready(function(){var t=null,a=jQuery("#up-client-name-input");if(a.length){var i=jQuery("<input type='hidden' name='Client.dunsNo' />"),e=jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");e.hide(),a.after(i),a.after(e),a.typeahead({hint:!0,highlight:!0,minLength:3},{name:"clients",limit:25,source:function(e,n,a){t&&clearTimeout(t),t=setTimeout(function(){$.ajax({type:"GET",url:"https://power.upsales.com/api/external/soliditet/clientSearch?name="+e,success:function(e){a(e.data)},error:function(e){}})},200)},templates:{suggestion:function(e){return"<div><div>"+e.name+"</div><span style='color: #323232; font-size: 10px;'>"+e.city+"</span></div>"}}}).bind("typeahead:autocompleted",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo),a.blur()}).bind("typeahead:select",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).bind("typeahead:cursorchange",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).on("typeahead:asyncrequest",function(){e.show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){e.hide()})}});
</script>
<form id="up-form" name="form_9549ue770a5b7152b4b9796393b0943084e71" action="https://power.upsales.com/api/external/formSubmit" method="POST">
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="" placeholder="Organisasjon"></div>
  <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.name" required="" placeholder="Ditt navn"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.cellPhone" required="" placeholder="Ditt mobilnummer"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="Din e-post"></div>
  <input type="hidden" value="Introduction to “Infrastructure as a Service” for managers" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Ved å sende inn dette skjemaet godtar du våre <a href="/dokument/personuppgiftshantering/" target="_blank">vilkår og betingelser</a> (svensk).</p>
	<button type="submit" class="button">Send forespørsel</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>