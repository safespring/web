---
title: "Skapa ett konto och få tillgång till Safesprings plattform"
language: "Se"
date: 2019-01-07T13:58:58+01:00
draft: false
section: "Boka demo"
intro: "Kostnadsfri demo av Safesprings molnplattform"
background: "safespring-blue-fade2.svg"
darkmode: "off"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarsection: ""
sidebarimage: ""
sidebartitle: ""
sidebartext: ""
sidebardate: ""
sidebarknapp: ""
sidebarlink: ""
saas: ""
sidebarwhitepaper: ""
aliases: ""
---

{{< ingress >}}
Vilket värde tillför vårt medlemskap i Gaia-X, moderna infrastruktur och kompetens till er verksamhet?
{{< /ingress >}}

<form id="myForm">
  <div id="step1">
    <label>Name: <input type="text" name="name" required></label><br>
    <label>Email: <input type="email" name="email" required></label><br>
    <button type="button" onclick="showStep2()">Continue</button>
  </div>
  <div id="step2" style="display: none;">
    <label>Phone: <input type="tel" name="phone" required></label><br>
    <label>Address: <input type="text" name="address" required></label><br>
    <button type="button" onclick="showStep3()">Continue</button>
  </div>
  <div id="step3" style="display: none;">
    <label>City: <input type="text" name="city" required></label><br>
    <label>State: <input type="text" name="state" required></label><br>
    <label>Zip: <input type="text" name="zip" required></label><br>
    <button type="button" onclick="showSummary()">Continue</button>
  </div>
  <div id="summary" style="display: none;">
    <p>Please review your information:</p>
    <p>Name: <span id="summaryName"></span></p>
    <p>Email: <span id="summaryEmail"></span></p>
    <p>Phone: <span id="summaryPhone"></span></p>
    <p>Address: <span id="summaryAddress"></span></p>
    <p>City: <span id="summaryCity"></span></p>
    <p>State: <span id="summaryState"></span></p>
    <p>Zip: <span id="summaryZip"></span></p>
    <button type="button" onclick="editStep1()">Edit</button>
    <button type="submit">Submit</button>
  </div>
</form>

<script>
function showStep2() {
  // Validate step 1
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  if (name == "" || email == "") {
    alert("Please fill out all fields in step 1 before continuing");
    return;
  }

  // Hide step 1 and show step 2
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function showStep3() {
  // Validate step 2
  var phone = document.forms["myForm"]["phone"].value;
  var address = document.forms["myForm"]["address"].value;
  if (phone == "" || address == "") {
    alert("Please fill out all fields in step 2 before continuing");
    return;
  }

  // Hide step 2 and show step 3
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

function showSummary() {
  // Validate step 3
  var city = document.forms["myForm"]["city"].value;
  var state = document.forms["myForm"]["state"].value;
  var zip = document.forms["myForm"]["zip"].value;
  if (city == "" || state == "" || zip == "") {
    alert("Please fill out all fields in step 3 before continuing");
    return;
  }

  // Populate summary
  document.getElementById("summaryName").innerHTML = document.forms["myForm"]["name"].value;
  document.getElementById("summaryEmail").innerHTML = document.forms["myForm"]["email"].value;
  document.getElementById("summaryPhone").innerHTML = document.forms["myForm"]["phone"].value;
  document.getElementById("summaryAddress").innerHTML = document.forms["myForm"]["address"].value;
  document.getElementById("summaryCity").innerHTML = document.forms["myForm"]["city"].value;
  document.getElementById("summaryState").innerHTML = document.forms["myForm"]["state"].value;
  document.getElementById("summaryZip").innerHTML = document.forms["myForm"]["zip"].value;

  // Hide step 3 and show summary
  document.getElementById("step3").style.display = "none";
  document.getElementById("summary").style.display = "block";
}

function editStep1() {
  // Populate step 1 with data from summary
  document.forms["myForm"]["name"].value = document.getElementById("summaryName").innerHTML;
  document.forms["myForm"]["email"].value = document.getElementById("summaryEmail").innerHTML;

  // Hide summary and show step 1
  document.getElementById("summary").style.display = "none";
  document.getElementById("step1").style.display = "block";
}
</script>
