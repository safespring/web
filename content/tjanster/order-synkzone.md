---
title: "Beställ Synkzone by Safespring"
date: 2019-01-07T13:58:58+01:00
draft: false
intro: "Lokal fildelningstjänst där data stannar inom landet. Med s.k. zero knowledge kan varken vi som operatör av tjänsten eller någon annan läsa era filer."
background: "safespring_synkzone-by-safespring_background.jpg"
pageimage: "safespring_synkzone-by-safespring_social.jpg"
---
## Enkel och säker fildelning
Med **Synkzone by Safespring** kan ni enkelt dela filer inom er organisation krypterat, lokalt och snabbt. Med versionshantering, chatt och loggning har ni kontroll över filerna och hur de uppdateras. <a href="/tjanster/synkzone/" id="text-button">Läs mer</a>

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color: #999;}.twitter-typeahead .tt-menu{background-color: #fafefe;max-height: 300px;overflow: auto;border: 1px solid #195F8C;border-top: none;border-radius: 0 0 25px 25px;width: 300px;margin: -10px;}.twitter-typeahead .tt-suggestion{padding: 5px 10px;color: #666;}.twitter-typeahead .tt-suggestion:hover{background-color: #fafefe;color: #000;}
</style>
<script>
  jQuery(document).ready(function() {
  var matchClientsTimeout = null;
  var matchClients = function(q, sync, cb) {
  if(matchClientsTimeout) {
  clearTimeout(matchClientsTimeout);
  }
  matchClientsTimeout = setTimeout(function() {
  $.ajax({
  type: "GET",
  url: "https://power.upsales.com/api/external/soliditet/clientSearch?name="+q,
  success: function(res) {
  cb(res.data);
  },
  error: function(res) {},
  });
  }, 200);
  };
  var getSuggestTemplate = function(c) {
  return "<div><div>"+c.name+"</div><span style='color: #999; font-size: 10px;'>"+c.city+"</span></div>";
  };
  var nameField = jQuery("#up-client-name-input");
  if(nameField.length) {
  var dunsField = jQuery("<input type='hidden' name='Client.dunsNo' />");
  var spinner = jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");
  spinner.hide();
  nameField.after(dunsField);
  nameField.after(spinner);
  nameField.typeahead({
  hint: true,
  highlight: true,
  minLength: 3
  },{
  name: "clients",
  limit: 25,
  source: matchClients,
  templates: {
  suggestion: getSuggestTemplate
  }
  }).bind("typeahead:autocompleted", function(ev, client) {
  nameField.typeahead("val", client.name);
  dunsField.val(client.dunsNo);
  nameField.blur();}).bind("typeahead:select", function(ev, client) {
  nameField.typeahead("val", client.name);
  dunsField.val(client.dunsNo);
  }).bind("typeahead:cursorchange", function(ev, client) {
  nameField.typeahead("val", client.name);
  dunsField.val(client.dunsNo);
  }).on("typeahead:asyncrequest", function() {
  spinner.show();
  }).on("typeahead:asynccancel typeahead:asyncreceive", function() {
  spinner.hide();
  });
  }
  });
</script>
<form id="up-form" name="form_9549u2dceed11b77a45cb8128be76c12634a0" action="https://power.upsales.com/api/external/formSubmit" method="POST">
<h2>Företag</h2>
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="required" placeholder="Organisation">
	</div>
	<div class="form"><i class="fas fa-marker"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Client.custom_1" required="required" placeholder="Org. nummer">
	</div>
	<div class="form"><i class="fas fa-building"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Client.address" required="required" placeholder="Adress">
	</div>
	<div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Client.phone" required="required" placeholder="Telefon">
	</div>
	<div class="form"><i class="fas fa-globe"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Client.webpage" required="required" placeholder="Webbplats">
	</div>
<h3>1. Företagets kommersiella kontakt</h3>
	<div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Extra.1548340803760" required="required" required="required" placeholder="Namn">
	</div>
	<div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Extra.1548340809452" placeholder="Telefon">
	</div>
	<div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Extra.1548340812473" placeholder="E-post">
	</div>
<h3>2. Administratör och driftansvarig</h3>
	<div class="form"><i class="fas fa-user-cog"></i>&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Contact.name" required="required" placeholder="Namn">
	</div>
	<div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Contact.cellPhone" placeholder="Mobiltelefon">
	</div>
	<div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="E-mail">
	</div>
<h3>2. Säkerhetsansvarig (Om ej samma som ovan)</h3>
	<div class="form"><i class="fas fa-user-shield"></i>&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Extra.1548340878741" required="required" placeholder="Namn">
	</div>
	<div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Extra.1548340881560" placeholder="Telefon">
	</div>
	<div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;
		<input maxlength="512" type="text" name="Extra.1548340884089" placeholder="E-mail">
	</div>
<h2>Underlag för igångsättning</h2>
<div class="form">
  <select name="Extra.1548342479459">
<option value="Ja">Webbaccess? Ja</option>
<option value="Nej">Webbaccess? Nej</option>
</select>
</div>
<div class="form">
  <select name="Extra.1548342504164">
<option value="Nej">Egen webbserver? Nej</option>
<option value="Ja">Egen webbserver? Ja</option>
</select>
</div>
	<!-- REQUIRED FIELDS -->
	<input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549u2dceed11b77a45cb8128be76c12634a0">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<button type="submit" class="button">Skicka in beställning</button>
</form>
<script src="https://img.upsales.com/lBtRI6eK9zoMXU3igCaQIw==/be.js"></script>
