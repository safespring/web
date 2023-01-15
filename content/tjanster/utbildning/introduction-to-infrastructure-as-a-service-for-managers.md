---
title: "Introduction to “Infrastructure as a Service” for managers"
language: "En"
date: 2019-10-01T16:07:06+02:00
draft: false
intro: "Overview and understanding from a management point of view enabling management and technical staff to form a common understanding."
background: "safespring-devops.jpg"
sidebarlinkname: "Course description"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "https://www.safespring.com/marketing/safespring-service-description-courses-english.pdf"
socialmedia: "safespring-devops.jpg"
---
## Description
Aimed for Managers with overall technical understanding but no expertise. Overview and understanding from a management point of view enabling management and technical staff to form a common understanding with regards to current situation, path going forward, long- and short-term targets, processes, methodology and strategy.

### Level
Beginner (with no or limited technical knowledge).

### Who should attend?
CEO, CTO, IT Managers, Development Managers, Technical Managers, Line managers, top-level managers, etc.

### Duration
1 day.

### Content
Safespring Cloud Infrastructure with OpenStack.
Short introduction to Cloud Infrastructure with OpenStack with Safesprings cloud platform. You will first get a theoretical orientation of cloud infrastructure as a whole and then more specific about OpenStack. The day will end with exercises in Safesprings platform where your will set up some instances and an application in Safesprings platform.


<div class="accordion-box">
<button class="accordion">Topics Covered</button>
<div class="panel content-body">
<p>These topcs will be covered:</p>
<ul>
	<li>What are Cloud Services?</li>
	<li>Essential Cloud Characteristics</li>
	<li>Different models (IaaS, PaaS and SaaS)</li>
	<li>Cloud Deployment models (Public, Private, Community and Hybrid)</li>
	<li>Why Cloud Services now?</li>
	<li>Virtualization</li>
	<li>Storage on Compute nodes or in storage cluster</li>
	<li>Instance and volume snapshots</li>
	<li>Networking</li>
	<li>OpenStack
  <ul>
  	<li>Overview</li>
  	<li>Components (Nova, Cinder, Glance, Neutron and Keystone)</li>
  	<li>Different storage options (Block Storage, Object Storage)</li>
  	<li>Flavors</li>
  	<li>Networking setup in Safesprings platform</li>
  	<li>Security Groups</li>
  	<li>Key-pairs for access</li>
  </ul>
  </li>
	<li>LAB exercises – get to know the Safesprings Infrastructure services
  <ul>
  	<li>Set up networking</li>
  	<li>Create or upload your keypair</li>
  	<li>Launching your first instance (frontend)</li>
  	<li>Setting up security groups</li>
  	<li>Launching your second instance (backend)</li>
  	<li>Deploying an application (Nextcloud)</li>
  	<li>Set up S3 as backend for Nextcloud</li>
  </ul>
  </li>
	<li>Q&amp;A and discussions</li>
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

## How to apply
Let us know that you're interested in the course "Introduction to “Infrastructure as a Service” for managers". Fill in the form below and we'll contact you.

<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
  .twitter-typeahead .tt-hint{color:#195f8c}.twitter-typeahead .tt-menu{max-height:300px;overflow:auto;border:1px solid #195f8c;border-top:none;border-radius:0 0 25px 25px;width:298px;margin:-7px 0 0 -52px}.twitter-typeahead .tt-suggestion{background-color:#fafefe;padding:5px 10px;color:#323232}.tt-suggestion:first-child{margin:7px 0 0 0;padding-top:10px}.tt-suggestion:last-child{padding-bottom:20px}.twitter-typeahead .tt-suggestion:hover{background-color:#fafefe;color:#195f8c}
</style>
<script>
  jQuery(document).ready(function(){var t=null,a=jQuery("#up-client-name-input");if(a.length){var i=jQuery("<input type='hidden' name='Client.dunsNo' />"),e=jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");e.hide(),a.after(i),a.after(e),a.typeahead({hint:!0,highlight:!0,minLength:3},{name:"clients",limit:25,source:function(e,n,a){t&&clearTimeout(t),t=setTimeout(function(){$.ajax({type:"GET",url:"https://power.upsales.com/api/external/soliditet/clientSearch?name="+e,success:function(e){a(e.data)},error:function(e){}})},200)},templates:{suggestion:function(e){return"<div><div>"+e.name+"</div><span style='color: #323232; font-size: 10px;'>"+e.city+"</span></div>"}}}).bind("typeahead:autocompleted",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo),a.blur()}).bind("typeahead:select",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).bind("typeahead:cursorchange",function(e,n){a.typeahead("val",n.name),i.val(n.dunsNo)}).on("typeahead:asyncrequest",function(){e.show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){e.hide()})}});
</script>
<form id="up-form" name="form_9549ue770a5b7152b4b9796393b0943084e71" action="https://power.upsales.com/api/external/formSubmit" method="POST">
  <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" id="up-client-name-input" name="Client.name" required="" placeholder="Organisation"></div>
  <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.name" required="" placeholder="Your name"></div>
  <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="text" name="Contact.cellPhone" required="" placeholder="Your cell phone"></div>
  <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;<input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="Your E-mail"></div>
  <input type="hidden" value="Introduction to “Infrastructure as a Service” for managers" name="Extra.1570014130220" checked>
	<!-- REQUIRED FIELDS -->
  <input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549ue770a5b7152b4b9796393b0943084e71">
	<input type="hidden" name="isFrame" value="false">
	<input type="text" value="" name="validation" style="display: none;">
	<!-- END OF REQUIRED FIELDS -->
  <br>
	<p>By submitting this form you agree to our <a href="/dokument/personuppgiftshantering/" target="_blank">terms and conditions</a> (Swedish).</p>
	<button type="submit" class="button">Send request</button>
</form>
<script>(function(){var form = document.getElementById("up-form");if(form) {form.addEventListener("submit", function(ev) {var button = ev.target.querySelector("button[type=submit]");if(button) {button.disabled = true;}});}})();</script>
