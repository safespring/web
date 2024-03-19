---
title: "Safespring onboarding"
date: 2019-06-10T13:05:26+02:00
draft: true
intro: "Skapa ett konto hos Safespring genom att fylla i formuläret nedan. Skicka in formuläret en gång för varje kontakt som ska ha tillgång till projektet."
background: "safespring-devops.jpg"
sidebarlinkname: "Fyll i formulär"
sidebarlinkurl: "#up-form"
socialmedia: "safespring-devops.jpg"
noindex: "yes"
sidebar: "no"
---

<script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
	.twitter-typeahead .tt-hint {
		color: #6B7C93;
	}
	.twitter-typeahead .tt-menu {
		background-color: #fff;
		max-height: 300px;
		overflow: auto;
		border: 1px solid #66afe9;
		border-top: none;
		border-radius: 0 0 4px 4px;
		width: 100%;
		margin-top: -2px;
	}
	.twitter-typeahead .tt-suggestion {
		padding: 5px 10px;
		color: #4B5562;
	}
	.twitter-typeahead .tt-suggestion:hover {
		background-color: #F6F9FB;
		color: #000;
	}
</style>
<script>
	jQuery(document).ready(function() {
		var matchClientsTimeout = null;
		var matchClients = function(q, sync, cb) {
			if (matchClientsTimeout) {
				clearTimeout(matchClientsTimeout);
			}
			matchClientsTimeout = setTimeout(function() {
				$.ajax({
					type: "GET",
					url: "https://power.upsales.com/api/external/soliditet/clientSearch?name=" + q,
					success: function(res) {
						cb(res.data);
					},
					error: function(res) {},
				});
			}, 200);
		};
		var getSuggestTemplate = function(c) {
			return "<div><div>" + c.name + "</div><span style='color: #6B7C93; font-size: 10px;'>" + c.city + "</span></div>";
		};
		var nameField = jQuery("#up-client-name-input");
		if (nameField.length) {
			var dunsField = jQuery("<input type='hidden' name='Client.dunsNo' />");
			var spinner = jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");
			spinner.css("display", "none");
			nameField.after(dunsField);
			nameField.after(spinner);
			nameField.typeahead({
				hint: true,
				highlight: true,
				minLength: 3
			}, {
				name: "clients",
				limit: 25,
				source: matchClients,
				templates: {
					suggestion: getSuggestTemplate
				}
			}).bind("typeahead:autocompleted", function(ev, client) {
				nameField.typeahead("val", client.name);
				dunsField.val(client.dunsNo);
				nameField.blur();
			}).bind("typeahead:select", function(ev, client) {
				nameField.typeahead("val", client.name);
				dunsField.val(client.dunsNo);
			}).bind("typeahead:cursorchange", function(ev, client) {
				nameField.typeahead("val", client.name);
				dunsField.val(client.dunsNo);
			}).on("typeahead:asyncrequest", function() {
				spinner.css("display", "inline");
			}).on("typeahead:asynccancel typeahead:asyncreceive", function() {
				spinner.css("display", "none");
			});
		}
	});
</script>
<form id="up-form" name="form_9549u1a260a3841d74d2c9257b0d3921b2aaa" action="https://power.upsales.com/api/external/formSubmit" method="POST">
	<h2>Safespring Onboarding</h2>
	<p>You're one form away from using Safespring's services. If you get stuck or have questions, please call +46(0)8-55 10 73 70</p>
	<h3>Company information</h3>
		<div>
		<br>
		<input maxlength="512" type="text" placeholder=" Organisation name" id="up-client-name-input" name="Client.name" required="required">
	</div>
	<div>
		<label>Authorized purchaser (name) *</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Contact.name" required="required">
	</div>
	<div class="email">
		<label>Authorized purchaser (email) *</label>
		<br>
		<input maxlength="512" type="email" placeholder="" title="Please enter a valid email" id="up-email-input" autocomplete="off" name="Contact.email" required="required">
	</div>
	<h3>Safespring services and location</h3>
		<script type="text/javascript">
				$(document).ready(function() {
						$('#checkBtn').click(function() {
								checked = $("input[type=checkbox]:checked").length;
								if (!checked) {
										alert("Choose one or more services to access");
										return false;
								}
						});
				});
		</script>
		<div style="float: left; margin-right: 20px;">
			<div>
			<h3>Sweden</h3>
			</div>
		<div class="inputGroup">
			<input type="checkbox" value="Safespring Compute" name="Extra.1623315527845">
			<label>Safespring Compute</label>
		</div>
		<div class="inputGroup">
			<input type="checkbox" value="Safespring Storage" name="Extra.1623315527845">
			<label>Safespring Storage</label>
		</div>
		<div class="inputGroup">
			<input type="checkbox" value="Compliant Kubernetes" name="Extra.1623315527845">
			<label>Compliant Kubernetes</label>
		</div>
		<div class="inputGroup">
			<input type="checkbox" value="Safespring Backup" name="Extra.1623315527845">
			<label>Safespring Backup</label>
		</div>
		</div>
	<div>
		<div>
			<h3>Norway</h3>
			</div>
			<div class="inputGroup">
				<input type="checkbox" value="Safespring Compute" name="Extra.1623315759521">
				<label>Safespring Compute</label>
			</div>
			<div class="inputGroup">
				<input type="checkbox" value="Safespring Storage" name="Extra.1623315759521">
				<label>Safespring Storage</label>
			</div>
			<div class="inputGroup">
				<input type="checkbox" value="Compliant Kubernetes" name="Extra.1623315759521">
				<label>Compliant Kubernetes</label>
			</div>
			<div class="inputGroup">
				<input type="checkbox" value="Safespring Backup" name="Extra.1623315759521">
				<label>Safespring Backup</label>
			</div>
	</div>
	<div>
	<h3>User account 1<h3>
	<div>
		<label>User account 1 (Name)</label>
		<br>
		<input maxlength="512" type="text" placeholder="Name Surname" name="Extra.1623315430295">
	</div>
	<div>
		<label>User account 1 (mobile number)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623315451726">
	</div>
	<div>
		<label>User account 1 (Email)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623315469606">
	</div>
	<div>
		<label>Message or questions to Safespring</label>
		<br>
		<textarea maxlength="255" rows="3" placeholder="" name="Extra.1623315942297"></textarea>
	</div>
	<div class="form-group" style="display: flex;">
		<input type="checkbox" value="on" name="singleOptIn.74pvmtvmw9n" style="margin: auto 7px auto 0px;">
		<label class="opt-in-label">Jag accepterar <a class="up-unstyled-element" href="javascript:openTerms(1);">villkoren</a></label>
	</div>
	</div>
	<div style="">
	<div>
		<label>User account 2 (Name)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623935940139">
	</div>
	<div>
		<label>User account 2 (mobile number)</label>
		<br>
		<input type="number" placeholder="" name="Extra.1623935964610">
	</div>
	<div>
		<label>User account 2 (Email)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623935974593">
	</div>
	</div>
	<div style="">
	<div>
		<label>User account 3 (Name)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623936361117">
	</div>
	<div>
		<label>User account 3 (mobile number)</label>
		<br>
		<input type="number" placeholder="" name="Extra.1623936367559">
	</div>
	<div>
		<label>User account 3 (Email)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623936379803">
	</div>
	</div>
	<!-- REQUIRED FIELDS -->
	<input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549u1a260a3841d74d2c9257b0d3921b2aaa">
	<input type="hidden" name="isFrame" value="false">
	<input style="display: none;" type="text" value="" name="validation">
	<!-- END OF REQUIRED FIELDS -->
	<div class="submit-button"><button type="submit">Create account</button></div>
</form>
<script>
	(function() {
		var form = document.getElementById("up-form");
		if (form) {
			form.addEventListener("submit", function(ev) {
				var button = ev.target.querySelector("button[type=submit]");
				if (button) {
					button.disabled = true;
				}
			});
		}
	})();
</script>
<script>
	function onSubmit(t) {
		var o, n, a = !0,
			e = !0;
		void 0 !== window.__validEmail && (e = window.__validEmail, a = !1), "boolean" == typeof e && e && !a ? validateForm(t, "https://www.safespring.com/onboarding/success/") : (t.preventDefault(), o = !0, n = setInterval(function() {
			var e = window._bEmValid;
			void 0 === window.__validEmail && e || (o = window.__validEmail, a = !1), ("boolean" == typeof o && o || !a) && (clearInterval(n), validateForm(t, "https://www.safespring.com/onboarding/success/"))
		}, 300))
	}
	function validateForm(e, o) {
		e.preventDefault();
		for (var t = document.getElementsByName("formId")[0].value, e = document.forms["form_" + t], n = e.querySelectorAll("input, textarea, select"), a = 0; a < n.length; a++) "text" === n[a].type && (n[a].value = n[a].value.trim());
		t = e.querySelectorAll("input[name*=phone], input[name*=Phone]");
		if ([].forEach.call(t, function(e) {
				e.iti && (e.value = e.iti.getNumber())
			}), void 0 === window.grecaptcha || "" !== window.grecaptcha.getResponse()) {
			for (var l = [], a = 0; a < n.length; a++) "checkbox" === n[a].type ? l.push(n[a].name + "=" + encodeURIComponent(n[a].checked ? n[a].value : "off")) : l.push(n[a].name + "=" + encodeURIComponent(n[a].value));
			var s = l.join("&");
			s += "&isAjax=true";
			var i = window._paq || null,
				r = new XMLHttpRequest;
			r.open("POST", e.action), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(s), r.onload = function() {
				var e, t;
				200 === r.status ? o ? (i && i.push && i.push(["trackLink", "https://post.upsales.com/" + r.responseText, "link"]), "undefined" != typeof _uaq && _uaq("form=" + r.responseText), setTimeout(function() {
					window.top.location.href = o
				}, 333)) : (e = document.getElementById("up-form"), t = document.getElementById("up-form-thanks"), e.style.display = "none", t.style.display = "block", i && i.push && i.push(["trackLink", "https://post.upsales.com/" + r.responseText, "link"]), _uaq && _uaq("form=" + r.responseText)) : console.log("AJAX ERROR", r.status)
			}
		} else {
			e = document.getElementById("recaptcha-error"), s = document.getElementsByClassName("g-recaptcha");
			e.style.display = "none", s && s.length && console.log("handle this later")
		}
	}
	var form = document.getElementById("up-form");
	form.addEventListener("submit", onSubmit);
</script>
</div>
