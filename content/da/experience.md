---
ai: true
title: "Oplev Safespring, baseret på OpenStack"
language: "da"
date: "2023-09-18"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Med Safesprings cloudbaserede infrastrukturtjeneste kan du skalere din infrastruktur op og ned efter behov. Tjenesten er fleksibel, fuldt automatiseret og baseret på selvbetjening via en portal."
form: "nej"
aliases:
  - /upplev/
---
## Få adgang til dine ressourcer

Stabil infrastruktur og ressourceforbrug efter behov. Med Safespring får du en effektiv model for servicelevering uden at miste kontrollen over dine data.

<br>
<a href="#test-safespring" id="button">Opret konto</a>

{{< distance >}}

### Virtuelle maskiner til din tjeneste

Safesprings skybaserede infrastrukturtjeneste er baseret på den markedsledende skyplatform OpenStack. Tjenesten leveres fra sikre datacentre med høj tilgængelighed. Data i tjenesten forlader aldrig landet, da datacentrene er placeret inden for landets grænser.

Tjenesten er fleksibel, fuldt automatiseret og baseret på selvbetjening via en portal: Brugere kan nemt starte og stoppe nye virtuelle maskiner i få enkle trin. Det er også muligt at styre virtuelle maskiner programmatisk via standardiserede kald til vores API.

### Datacentre inden for landets grænser

Safesprings skytjenester produceres i datacentre placeret inden for landets grænser og er underlagt lokal lovgivning, ikke mindst Databeskyttelsesforordningen (GDPR).

Datacentrene har et meget højt niveau af fysisk sikkerhed. Alle data lagres på krypterede diske. Alle underliggende systemer i skyplatformen har et højt niveau af sikkerhedshærdning (SELinux). Platformen er opbygget redundant for at opnå høj tilgængelighed, samtidig med at systemkomponenter løbende og automatisk opdateres, baseret på et CI/CD‑miljø. Det kalder vi "Secure by Design".

Safespring Compute giver store fordele såsom lettere samarbejde mellem forskellige afdelinger eller grupper, enklere IT‑styring samt øget effektivitet og fleksibilitet i din organisation.

<p id="test-safespring"></p>

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

/* Checkbox toggle */

.inputGroup {
    background-color: transparent;
    display: block;
    margin: 10px 0;
    position: relative;
    border-radius: 50px;
    max-width: 300px;
}

.inputGroup label {
    padding: 12px 12px 12px 60px;
    border: 1px solid #D1D7DC;
    display: block;
    text-align: left;
    color: var(--middle-blue-color);
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;
    border-radius: 50px;
    max-width: 300px;
    font: var(--heavy-weight) 17px var(--hind-font);
}

.inputGroup label:before {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    content: "";
    background-color: var(--cloud-blue-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    z-index: -1;
}

.inputGroup label:after {
    width: 32px;
    height: 32px;
    content: "";
    border: 1px solid #D1D7DC;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
    background-repeat: no-repeat;
    background-position: 4px 5px;
    border-radius: 50%;
    z-index: 2;
    position: absolute;
    left: 9px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 200ms ease-in;
}

.inputGroup input:checked~label {
    color: var(--main-color);
    border: 1px solid var(--cloud-blue-color);
}

.inputGroup input:checked~label:before {
    transform: translate(-50%, -50%) scale3d(56, 56, 1);
    opacity: 1;
}

.inputGroup input:checked~label:after {
    background-color: var(--web-green-color);
    border: 2px solid var(--web-green-color);
}

.inputGroup input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
}

</style>

<form id="up-form" name="form_9549u5325684f3ca44641b1ebb4d4a8cd2e22" action="https://power.upsales.com/api/external/formSubmit" method="POST">
    <h2 id="form">Bruger</h2>
    <p></p>
    <div class="column-two">
    <div class="form-field">
        <input type="text" id="firstname" name="Contact.firstname" required>
        <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Fornavn</label>
    </div>
        <div class="form-field">
        <input type="text" id="lastname" name="Contact.lastname" required>
        <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Efternavn</label>
    </div>
    </div>
    <div class="form-field">
        <input type="tel" id="phone" name="Contact.cellPhone" required>
        <label for="phone"><i class="fas fa-mobile-screen-button"></i>&nbsp;&nbsp;&nbsp;Mobil</label>
    </div>
    <div class="form-field">
        <input maxlength="512" type="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Angiv en gyldig e-mailadresse" id="up-email-input" autocomplete="off" name="Contact.email" required="required">
        <label for="email"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;E-mail</label>
    </div>
    <h2>Kontooplysninger</h2>
    <p></p>
        <div class="form-field">
        <input maxlength="512" type="text" placeholder="" id="up-client-name-input" name="Client.name" required="required">
        <label for="organization"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Organisation</label>
    </div>
    <div class="form-field">
        <input type="text" id="gatekeeper-name" name="Extra.1695029810459" required>
        <label for="gatekeeper-name"><i class="fas fa-gift"></i>&nbsp;&nbsp;&nbsp;Kampagnekode</label>
    </div>
    <h2>Samtykke</h2>
    <p>Ved at indsende denne formular accepterer du vores vilkår og politikker. Vi tager vores kunders privatliv alvorligt og bruger kun dine oplysninger til at opfylde din bestilling. Hvis du har spørgsmål eller bekymringer, er du velkommen til at kontakte os. Tak fordi du valgte vores tjenester!</p>
    <div class="inputGroup">
            <input type="checkbox" name="accept-usage" id="accept-usage" required>
            <label for="accept-usage">
            Politik for acceptabel brug <a class="label-link" href="/documents/safespring-acceptable_use_policy.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </label>
    </div>
    <div class="inputGroup">
            <input type="checkbox" name="singleOptIn.qptjh8v9er" id="accept-terms" required>
           <label for="accept-terms"> 
        Generelle vilkår og betingelser <a class="label-link" href="/documents/safespring-general_terms _and_conditions.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
           </label>
    </div>
    <!-- REQUIRED FIELDS -->
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549u5325684f3ca44641b1ebb4d4a8cd2e22">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS -->
    <button class="button pt-1 pb-1 mt-2 submit-button" id="checkBtn" type="submit">Opret konto</button>
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