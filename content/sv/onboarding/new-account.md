---
ai: true
title: "Onboarding för Safespring"
date: 2024-09-23T13:05:26+02:00
draft: false
intro: "Välkommen till Safesprings onboardingsida! Vi är väldigt glada att du är här och ser fram emot att hjälpa dig att komma igång med våra tjänster."
background: ""
sidebarlinkname: "Skapa konto"
sidebarlinkurl: "#form"
socialmedia: ""
noindex: "yes"
language: "sv"
aliases:
  - /create-account
  - /onboarding/new-account/
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/checkbox/dist/mdc.checkbox.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/form-field/dist/mdc.form-field.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/button/dist/mdc.button.min.css">

{{< ingress >}}
Välkommen till Safesprings onboarding-sida! Vi är glada att ha dig här och ser fram emot att hjälpa dig att komma igång med våra tjänster.
{{< /ingress >}}

För att skapa ett konto hos oss, fyll i formuläret nedan. Skicka in formuläret en gång för varje kontakt som behöver åtkomst till projektet.

Vårt utbud av produkter och tjänster erbjuder ett brett spektrum av lösningar som passar dina behov. Om du har frågor eller behöver hjälp är du alltid välkommen att kontakta oss. Vi finns här för att hjälpa dig.

För att komma igång, fyll bara i formuläret nedan med dina användar- och kontouppgifter och godkänn våra villkor och policys. Genom att skicka in formuläret godkänner du våra villkor och policys. Vi tar våra kunders integritet på största allvar och kommer endast att använda din information för att kunna fullgöra din beställning.

Tack för att du väljer Safesprings tjänster. Vi ser fram emot att arbeta med dig!

{{< distance >}}

<style>
    /* Formulärcontainer */
    form {
        width: min(100%, 500px);
    }

    /* Rubriker */
    h2 {
        font-size: 1.5rem;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    /* Textfält och andra inputfält */
    .form-field {
        position: relative;
        margin-bottom: 15px;
    }

    .form-field label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 25px;
        pointer-events: none;
        font-size: 16px;
        font-weight: 400;
        transition: all 0.2s ease;
        background-color: transparent;
        padding: 0 8px;
        margin: 0 -8px;
        font-family: 'Montserrat';
        line-height: 16px;
        color: var(--middle-blue-color);
    }

    .form-field input[type="text"],
    .form-field input[type="email"],
    .form-field input[type="tel"],
    .form-field select {
        width: 100%;
        line-height: 16px;
        padding: 10px;
        border: solid 0.5px var(--main-color);
        border-radius: 100px;
        box-sizing: border-box;
        font-size: 16px;
        color: var(--main-color);
        padding: 15px 25px;
        background-color: transparent;
        font-family: 'Montserrat';

    }

    .form-field input[type="text"]:focus,
    .form-field input[type="email"]:focus,
    .form-field input[type="tel"]:focus,
    .form-field select:focus {
        outline: none;
        box-shadow: none;
        border: solid 0.5px var(--main-color) !important;       
    }

    .form-field input[type="text"]:valid ~ label,
    .form-field input[type="email"]:valid ~ label,
    .form-field input[type="tel"]:valid ~ label,
    .form-field select:valid ~ label {
        transform: translateY(-205%);
        -webkit-transform: translateY(-205%);
        color: #3C9BCD;
        font: 400 12px/16px 'Hind';
        letter-spacing: 0.5px;
        background-color: #fafefe;
        border-radius: 100px;
    }


    .form-field input[type="text"]:focus ~ label,
    .form-field input[type="email"]:focus ~ label,
    .form-field input[type="tel"]:focus ~ label,
    .form-field select:focus ~ label {
        transform: translateY(-205%);
        -webkit-transform: translateY(-205%);
        color: #3C9BCD;
        font: 400 12px/16px 'Hind';
        letter-spacing: 0.5px;
        background-color: #fafefe;
        border-radius: 100px;
    }

    .form-field.invalid.has-content input {
        border-color: red;
    }

    .form-field.invalid.has-content label {
        transform: translateY(-205%);
        -webkit-transform: translateY(-205%);
        color: red;
        font: 400 12px/16px 'Hind';
        letter-spacing: 0.5px;
        background-color: #fafefe;
        border-radius: 100px;
    }


    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .selection-icon {
        position: absolute;
        right: 11px;
        top: 8px;
        padding: 10px 9px 6px 9px;
        border-radius: 100px;
        background-color: var(--cloud-blue-color);
        color: var(--middle-blue-color);
        z-index: -2;
    }

    /* Checkboxar */
    .form-field label {
        display: block;
        margin-bottom: 10px;
    }

    .form-field input[type="checkbox"] {
        margin-right: 10px;
        transform: translateY(2px);
    }

    .form-field.has-content label {
        color: #3C9BCD;
        font: 400 12px/16px 'Hind';
        letter-spacing: 0.5px;
        background-color: #fafefe;
    }

    .form-field.has-content.invalid label {
        color: red;
        font: 400 12px/16px 'Hind';
        letter-spacing: 0.5px;
        background-color: #fafefe;
    }

</style>

<form id="up-form" name="form_9549u6488cf25775f4e62b6d09de546b45f5f" action="https://power.upsales.com/api/external/formSubmit" method="POST">
    <h2 id="form">Användare</h2>
    <p></p>
    <div class="column-two">
        <div class="form-field">
            <input type="text" id="firstname" name="Contact.firstname" required>
            <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Förnamn</label>
        </div>
        <div class="form-field">
            <input type="text" id="lastname" name="Contact.lastname" required>
            <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Efternamn</label>
        </div>
    </div>
    <div class="form-field">
        <input type="tel" id="phone" name="Contact.cellPhone" required>
        <label for="phone"><i class="fas fa-mobile-screen-button"></i>&nbsp;&nbsp;&nbsp;Mobil</label>
    </div>
    <div class="form-field">
        <input maxlength="512" type="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Ange en giltig e-postadress" id="up-email-input" autocomplete="off" name="Contact.email" required="required">
        <label for="email"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;E-post</label>
    </div>
    <div class="form-field">
        <input type="text" id="eppn" name="Extra.1683706722052">
        <label for="eppn"><i class="fas fa-input-text"></i>&nbsp;&nbsp;&nbsp;EPPN (för anslutning till NREN)</label>
    </div>
    <h2>Kontouppgifter</h2>
    <p></p>
    <div class="form-field">
        <input maxlength="512" type="text" placeholder="" id="up-client-name-input" name="Client.name" required="required">
        <label for="organization"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Organisation</label>
    </div>
    <div class="form-field">
        <select id="site" name="Extra.1683706744635" required>
            <optgroup label="Publikt moln">
                <option value="STO 1">STO 1</option>
                <option value="STO 2">STO 2</option>
                <option value="OSL 1">OSL 1</option>
            </optgroup>
            <optgroup label="Sunet">
                <option value="STO 3">STO 3</option>
                <option value="STO 4">STO 4</option>
                <option value="DCO A">DCO A</option>
                <option value="DCO B">DCO B</option>
            </optgroup>
        </select>
        <label for="site"><i class="fas fa-cloud-check"></i>&nbsp;&nbsp;&nbsp;Välj din site</label><i class="fas fa-angle-down selection-icon"></i>
    </div>
    <div class="form-field">
        <input type="text" id="project" name="Extra.1683706799384" required placeholder="">
        <label for="project"><i class="fas fa-input-text"></i>&nbsp;&nbsp;&nbsp;Projektnamn (t.ex. infra.domain.com)</label>
    </div>
    <div class="form-field">
        <input maxlength="512" type="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Ange en giltig e-postadress" id="billing" autocomplete="off" name="Extra.1683706812269" required="required">
        <label for="billing"><i class="fas fa-envelope-open-dollar"></i>&nbsp;&nbsp;&nbsp;Fakturaadress (e-post)</label>
    </div>
    <div class="form-field">
        <input maxlength="512" type="text" id="ip" name="Extra.1683706829902" required>
        <label for="ip"><i class="fas fa-input-numeric"></i>&nbsp;&nbsp;&nbsp;IP-adress att vitlista för API-åtkomst</label>
    </div>
    <div class="inputGroup" style="margin-bottom: 25px;">
        <input type="checkbox" value="yes" name="Extra.1715929693168" id="nren-ip-address">
        <label for="nren-ip-address"> Ansluten till Sunet eller Sikt</label>
    </div>
    <h2>Kundens användaradministratör</h2>
    <p></p>
    <div class="form-field">
        <input type="text" id="gatekeeper-name" name="Extra.1683706848970" required>
        <label for="gatekeeper-name"><i class="fas fa-user-gear"></i>&nbsp;&nbsp;&nbsp;Namn</label>
    </div>
    <div class="form-field">
        <input type="tel" id="gatekeeper-phone" name="Extra.1683706862870" required>
        <label for="gatekeeper-phone"><i class="fa-kit fa-solid-mobile-screen-button-gear"></i>&nbsp;&nbsp;&nbsp;Mobil</label>
    </div>
    <div class="form-field">
        <input type="email" id="gatekeeper-email" name="Extra.1683706879354" required>
        <label for="gatekeeper-email"><i class="fa-kit fa-solid-envelope-gear"></i>&nbsp;&nbsp;&nbsp;E-post</label>
    </div>
    <h2>Godkännande</h2>
    <p>Genom att skicka in detta formulär godkänner du våra villkor och policys. Vi tar våra kunders integritet på största allvar och kommer endast att använda din information för att kunna fullgöra din beställning. Om du har några frågor eller funderingar är du varmt välkommen att kontakta oss. Tack för att du väljer våra tjänster!</p>
    <div class="inputGroup">
        <input type="checkbox" name="accept-usage" id="accept-usage" required>
        <label for="accept-usage">
            Policy för acceptabel användning <a class="label-link" href="/documents/safespring-acceptable_use_policy.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </label>
    </div>
    <div class="inputGroup">
        <input type="checkbox" name="singleOptIn.qptjh8v9er" id="accept-terms" required>
        <label for="accept-terms"> 
        Allmänna villkor <a class="label-link" href="/documents/safespring-general_terms _and_conditions.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </label>
    </div>
    <!-- REQUIRED FIELDS -->
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549u6488cf25775f4e62b6d09de546b45f5f">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS -->
    <button class="button pt-1 pb-1 mt-2 submit-button" id="checkBtn" type="submit">Skapa konto</button>
</form>
<script type="text/javascript">
    $(document).ready(function() {
        $('#checkBtn').click(function() {
            checked = $("input[type=checkbox]:checked").length;
            if (!checked) {
                alert("You must accept our terms our conditions");
                return false;
            }
        });
    });
</script>
<script>
    document.addEventListener("DOMContentLoaded", function(){
        const ids = ["#up-email-input", "#billing", "#gatekeeper-email"];
        ids.forEach(id => {
            const element = document.querySelector(id);
            if (element) {
                element.addEventListener("input", function (event) {
                    var emailField = event.target;
                    if (emailField.checkValidity()) {
                        emailField.parentElement.classList.remove("invalid");
                    } else {
                        emailField.parentElement.classList.add("invalid");
                    }
                    if (emailField.value) {
                        emailField.parentElement.classList.add("has-content");
                    } else {
                        emailField.parentElement.classList.remove("has-content");
                    }
                });
            }
        });
    });
</script>
