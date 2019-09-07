---
title: "Safespring onboarding"
date: 2019-06-10T13:05:26+02:00
draft: false
intro: "Skapa ett konto hos Safespring genom att fylla i formuläret nedan. Skicka in formuläret en gång för varje kontakt som ska ha tillgång till projektet."
background: "safespring-devops.jpg"
sidebarlinkname: "Fyll i formulär"
sidebarlinkurl: "#up-form"
socialmedia: "safespring-devops.jpg"
noindex: "yes"
---




<form id="up-form" name="form_9549ub29368611aa848ba9492ebadbed4c999" action="https://power.upsales.com/api/external/formSubmit" method="POST">
    <h3>1. User info</h3>
    <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" name="Contact.name" placeholder="User full name">
    </div>
    <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" name="Contact.cellPhone" placeholder="User mobile phone">
				<div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1">Including +46 or +47 and only numbers. <br><br><b>Example: +46762117309</b></span></div>
    </div>
    <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="email" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Please enter a valid email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="User e-mail">
    </div>
    <div class="form"><i class="fas fa-marker"></i>&nbsp;&nbsp;&nbsp;<div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1"><b>Federated identity</b><br><br>Connected to <b>SUNET</b>: Verify your EPPN at https://sp.swamid.se<br><br>Connected to <b>Uninett</b>: verify your EPPN for Dataporten at minside.dataporten.no</span></div>
        <input maxlength="512" type="text" name="Contact.custom_27" placeholder="EPPN">
    </div>
    <h3>2. Company info</h3>
    <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" id="up-client-name-input" name="Client.name" placeholder="Company name">
    </div>
    <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;
        <select name="Client.custom_6">
            <option>Connected to site:</option>
            <option value="Safespring SE">Safespring SE</option>
            <option value="Safespring NO">Safespring NO</option>
            <option value="Uninett">Uninett</option>
            <option value="SUNET">SUNET</option>
            <option value="SUNET sto3">SUNET sto3</option>
        </select>
    </div>
    <div>
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
        <h3>3. Safespring service</h3>
        <div class="inputGroup">
            <input id="Backup" type="checkbox" value="on" name="Contact.custom_30">
            <label for="Backup">Backup</label>
        </div>
        <div class="inputGroup">
            <input id="Storage" type="checkbox" value="on" name="Contact.custom_31">
            <label for="Storage">Storage</label>
        </div>
        <div class="inputGroup">
            <input id="Compute" type="checkbox" value="on" name="Contact.custom_32">
            <label for="Compute">Compute</label>
        </div>
        <br>
    </div>
    <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" id="up-client-name-input" name="Extra.1540364232585" placeholder="Project name">
        <div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1">In Compute, a project owns virtual machines. Users can be associated with more than one project.</span></div>
    </div>
    <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" id="up-client-name-input" name="Extra.1540367554348" placeholder="Cost center">
        <div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1">For your internal billing reference.</span></div>
    </div>
    <div>
        <h3>4. Message to onboarding:</h3>
        <textarea maxlength="512" rows="3" name="Extra.1539933575785"></textarea>
    </div>
    <!-- REQUIRED FIELDS -->
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549ub29368611aa848ba9492ebadbed4c999">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS -->
    <p>By submitting this form you agree to our <a href="/dokument/personuppgiftshantering/" target="_blank">terms and conditions</a> (Swedish).</p>
    <button type="submit" id="button">Order</button>
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
