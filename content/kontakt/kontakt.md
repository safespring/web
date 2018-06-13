---
title: "Kontakt"
date: 2018-06-11T15:13:43+02:00
draft: false
---

Safespring finns lokalt i Sverige och Norge. Huvudkontoret ligger en bit utanför Stockholm i Sverige. För att kontakta någon på Safespring kan du använda dig av länkarna till höger, eller fylla i kontaktformuläret på denna sida.

<div>
<script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
	.twitter-typeahead .tt-hint{color: #6B7C93;}.twitter-typeahead .tt-menu{background-color: #fff;max-height: 300px;overflow: auto;border: 1px solid #66afe9;border-top: none;border-radius: 0 0 4px 4px;width: 100%;margin-top: -2px;}.twitter-typeahead .tt-suggestion{padding: 5px 10px;color: #4B5562;}.twitter-typeahead .tt-suggestion:hover{background-color: #F6F9FB;color: #000;}
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
	return "<div><div>"+c.name+"</div><span style='color: #6B7C93; font-size: 10px;'>"+c.city+"</span></div>";
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
<form id="up-form" name="form_9549u13ba8e3764c345a39c3ae9fc2fc44d6a" action="https://power.upsales.com/api/external/formSubmit" method="POST">
	<div>
		<input maxlength="512" type="text" name="Contact.name" required="required" placeholder="Namn...">
	</div>
	<div class="email">
		<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="Epost...">
	</div>
		<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="required" placeholder="Företag...">
	</div>
	<div>
		<textarea maxlength="712" type="text" rows="5" name="Extra.1528723484035" placeholder="Meddelande..."></textarea>
	</div>
	<!-- REQUIRED FIELDS -->
	<input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549u13ba8e3764c345a39c3ae9fc2fc44d6a">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
	<button id="button" type="submit" style="width: 130px;">Skicka</button>
</form>
<script src="https://img.upsales.com/lBtRI6eK9zoMXU3igCaQIw==/be.js"></script>
<script>
	function onSubmit(e){var t=!0,n=!0;typeof window.__validEmail!="undefined"&&(n=window.__validEmail,t=!1);if(typeof n=="boolean"&&n&&!t)validateForm(e,"https://safespring.com/kontakt/kontakt");else{e.preventDefault();var r=!0,i=setInterval(function(){var n=window._bEmValid;if(typeof window.__validEmail!="undefined"||!n)r=window.__validEmail,t=!1;if(typeof r=="boolean"&&r||!t)clearInterval(i),validateForm(e,"https://safespring.com/kontakt/kontakt")},300)}}function validateForm(e,t){e.preventDefault();var n=document.getElementsByName("formId")[0].value,r=document.forms["form_"+n],i=r.querySelectorAll("input, textarea, select");for(var s=0;s<i.length;s++)i[s].type==="text"&&(i[s].value=i[s].value.trim());if(window.grecaptcha===undefined||window.grecaptcha.getResponse()!==""){var o=[];for(var s=0;s<i.length;s++)i[s].type==="checkbox"?o.push(i[s].name+"="+encodeURI(i[s].checked?i[s].value:"off")):o.push(i[s].name+"="+encodeURI(i[s].value));var u=o.join("&");u+="&isAjax=true";var a=window._paq||null,f=new XMLHttpRequest;f.open("POST",r.action),f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),f.send(u),f.onload=function(){if(f.status===200)if(t)a&&a.push&&a.push(["trackLink","https://post.upsales.com/"+f.responseText,"link"]),typeof _uaq!="undefined"&&_uaq("form="+f.responseText),window.top.location.href=t;else{var e=document.getElementById("up-form"),n=document.getElementById("up-form-thanks");e.style.display="none",n.style.display="block",a&&a.push&&a.push(["trackLink","https://post.upsales.com/"+f.responseText,"link"]),_uaq&&_uaq("form="+f.responseText)}else console.log("AJAX ERROR",f.status)}}else{var l=document.getElementById("recaptcha-error"),c=document.getElementsByClassName("g-recaptcha");l.style.display="none",c&&c.length&&console.log("handle this later")}}var form=document.getElementById("up-form");form.addEventListener("submit",onSubmit)
</script>
</div>

<h2 class="content-heading"> Besöksadress </h2>

Smidesvägen 12 <br />
171 41 Solna <br />
Sverige
<br><br>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.4512155799866!2d17.979684316731618!3d59.35880798166926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9db89a7f86bf%3A0x6c1a43d93fcbf297!2sSafespring!5e0!3m2!1ssv!2sse!4v1528722539706" width="300" height="450" frameborder="0" style="border:0"></iframe>