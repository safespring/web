---
title: "Beställ Synkzone by Safespring"
date: 2019-01-07T13:58:58+01:00
draft: false
intro: "Lokal fildelningstjänst där data stannar inom landet. Med Zero knowledge kan varken vi som operatör av tjänsten eller någon obehörig läsa era filer."
background: "safespring_synkzone-by-safespring_background.jpg"
pageimage: "safespring_synkzone-by-safespring_social.jpg"
---
## Enkel och säker fildelning
Med **Synkzone by Safespring** kan ni enkelt dela filer inom er organisation krypterat, lokalt och snabbt. Med versionshantering, chatt och loggning har ni kontroll över filerna och hur de uppdateras. <a href="/tjanster/synkzone/" id="text-button">Läs mer</a>

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color:#195f8c}.twitter-typeahead .tt-menu{max-height:300px;overflow:auto;border:1px solid #195f8c;border-top:none;border-radius:0 0 25px 25px;width:298px;margin:-7px 0 0 -52px}.twitter-typeahead .tt-suggestion{background-color:#fafefe;padding:5px 10px;color:#323232}.tt-suggestion:first-child{margin:7px 0 0 0;padding-top:10px}.tt-suggestion:last-child{padding-bottom:20px}.twitter-typeahead .tt-suggestion:hover{background-color:#fafefe;color:#195f8c}
</style>
<script>
  jQuery(document).ready(function(){var t=null,a=jQuery("#up-client-name-input");if(a.length){var i=jQuery("<input type='hidden' name='Client.dunsNo' />"),e=jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");e.hide(),a.after(i),a.after(e),a.typeahead({hint:!0,highlight:!0,minLength:3},{name:"clients",limit:25,source:function(e,n,a){t&&clearTimeout(t),t=setTimeout(function(){$.ajax({type:"GET",url:"https://power.upsales.com/api/external/soliditet/clientSearch?name="+e,success:function(e){a(e.data)},error:function(e){}})},200)},templates:{suggestion:function(e){return"<div><div>"+e.name+"</div><span style='color: #323232; font-size: 10px;'>"+e.city+"</span></div>"}}}).bind("typeahead:autocompleted",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo),a.blur()}).bind("typeahead:select",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).bind("typeahead:cursorchange",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).on("typeahead:asyncrequest",function(){e.show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){e.hide()})}});
</script>
<form id="up-form" name="form_9549u2dceed11b77a45cb8128be76c12634a0" action="https://power.upsales.com/api/external/formSubmit" method="POST">
<h3>Företagsuppgifter</h3>
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="required" placeholder="Organisation"></div>
	<div class="form"><i class="fas fa-marker"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Client.custom_1" required="required" placeholder="Org. nummer"></div>
	<div class="form"><i class="fas fa-building"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Client.address" required="required" placeholder="Adress"></div>
	<div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Client.phone" required="required" placeholder="Telefon"></div>
	<div class="form"><i class="fas fa-globe"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Client.webpage" required="required" placeholder="Webbplats"></div>
  <div class="form"><i class="fas fa-globe"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548927996192" required="required" placeholder="Synkzone org. namn"></div>
  <br><p>Ni bör använda det organisationsnamn som ni har motsvarande epostadresser för. T.ex.  ”<b>goodcompany.se</b>” för företaget GoodCompany med epost namn@goodcompany.se.</p>
  <p>Normalt är organisationsnamnet detsamma som det domännamn som anges ovan, och användare får användarnamn som är samma som deras ordinarie epostadresser (detta är dock inget absolut krav, och utesluter inte externa användare med annan epostadress).</p>
  <p><i>OBS! För att skydda mot bedrägerier kräver vi att ni har tillgång till (och vid behov kan bevisa detta) den domän som ni beställer.</i></p>
<h3>1. Kommersiell kontakt (obligatorisk)</h2>
  <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.name" required="required" placeholder="Namn"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.cellPhone" required="required" placeholder="Mobiltelefon"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="E-mail"></div>
<h3>2. Administratör och driftansvarig</h3>
  <div class="form"><i class="fas fa-user-cog"></i>&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548340803760" placeholder="Namn"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548340809452" placeholder="Telefon"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548340812473" placeholder="E-post"></div>
<h3>2. Säkerhetsansvarig (Om ej samma som ovan)</h3>
	<div class="form"><i class="fas fa-user-shield"></i>&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548340878741" placeholder="Namn"></div>
	<div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548340881560" placeholder="Telefon"></div>
	<div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Extra.1548340884089" placeholder="E-mail"></div>
<h2>Underlag för igångsättning</h2>
  <div class="form">
    <select name="Extra.1548342504164">
      <option value="Egen webbserver? Ja">Egen webbserver? Ja</option>
      <option value="Egen webbserver? Nej">Egen webbserver? Nej</option>
    </select>
</div>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549u2dceed11b77a45cb8128be76c12634a0">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>Genom att skicka in formuläret godkänner du våra <a href="/dokument/personuppgiftshantering/" target="_blank">villkor</a>.</p>
  <br>
	<button type="submit" class="button">Skicka in beställning</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>
