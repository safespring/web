---
title: "Safespring onboarding for WeWork"
date: 2019-06-10T13:05:26+02:00
draft: false
intro: "Skapa ett konto hos Safespring genom att fylla i formuläret nedan. Skicka in formuläret en gång för varje kontakt som ska ha tillgång till projektet."
background: "safespring-devops.jpg"
sidebarlinkname: "Fyll i formulär"
sidebarlinkurl: "#up-form"
socialmedia: "safespring-devops.jpg"
noindex: "yes"
aliases:
    - /wework/
    - /WeWork/
---




<form id="up-form" name="form_9549u17a38099d1864b4fb652833e81572c6a" action="https://power.upsales.com/api/external/formSubmit" method="POST">
    <h3>1. User info</h3>
    <div class="form"><i class="fas fa-user-tie"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" name="Contact.name" placeholder="Your name">
    </div>
    <div class="form"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" name="Contact.cellPhone" placeholder="User mobile phone">
				<div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1">Including +46 or +47 and only numbers. <br><br><b>Example: +46762117309</b></span></div>
    </div>
    <div class="form"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="email" id="up-email-input" autocomplete="off" name="Contact.email" required="required" placeholder="User e-mail">
    </div>
    <h3>2. Company info</h3>
    <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" id="up-client-name-input" name="Client.name" placeholder="Company name">
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
            <input id="Backup" type="checkbox" value="Backup" name="Extra.1540364264537">
            <label for="Backup">Backup</label>
        </div>
        <div class="inputGroup">
            <input id="Storage" type="checkbox" value="Storage" name="Extra.1540364264537">
            <label for="Storage">Storage</label>
        </div>
        <div class="inputGroup">
            <input id="Compute" type="checkbox" value="Compute" name="Extra.1540364264537">
            <label for="Compute">Compute</label>
        </div>
        <div class="inputGroup">
            <input id="Synkzone" type="checkbox" value="Synkzone" name="Extra.1540364264537">
            <label for="Synkzone">Synkzone &#42;</label>
        </div>
        <br>
    </div>
    <div><p>&#42; Local, secure file sharing with end-to-end encryption</p></div>
    <div>
        <h3>4. Message to onboarding:</h3>
        <textarea maxlength="512" rows="3" name="Extra.1539933575785"></textarea>
    </div>
    <!-- REQUIRED FIELDS -->
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549u17a38099d1864b4fb652833e81572c6a">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS -->
    <p>By submitting this form you agree to our <a href="/dokument/personuppgiftshantering/" target="_blank">terms and conditions</a> (Swedish).</p>
    <button type="submit" class="button">Request account</button>
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
