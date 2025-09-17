---
ai: true
title: "Upplev Safespring – byggt på OpenStack"
language: "sv"
date: "2023-09-18"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Med Safesprings molnbaserade infrastrukturtjänst kan du skala upp och ner din infrastruktur efter behov. Tjänsten är flexibel, helt automatiserad och bygger på självservice via en portal."
form: "nej"
aliases:
  - /upplev/
---
## Kom åt dina resurser

Stabil infrastruktur och resurser efter behov. Med Safespring får du en effektiv modell för tjänsteleverans utan att förlora kontrollen över dina data.

<br>
<a href="#test-safespring" id="button">Skapa konto</a>

{{< distance >}}

### Virtuella maskiner till din tjänst

Safesprings molnbaserade infrastrukturtjänst bygger på den marknadsledande molnplattformen OpenStack. Tjänsten levereras från säkra datacenter med hög tillgänglighet. Data i tjänsten lämnar aldrig landet eftersom datacentren är belägna inom landets gränser.

Tjänsten är flexibel, helt automatiserad och bygger på självbetjäning via en portal: användare kan enkelt starta och stoppa nya virtuella maskiner i några få steg. Det är också möjligt att styra virtuella maskiner programmatiskt via standardiserade anrop till vårt API.

### Datacenter inom landets gränser

Safesprings molntjänster produceras i datacenter som ligger inom landets gränser och omfattas av lokal lagstiftning, inte minst dataskyddsförordningen (GDPR).

Datacentren har en mycket hög nivå av fysisk säkerhet. All data lagras på krypterade diskar. Alla underliggande system i molnplattformen har en hög grad av säkerhetshärdning (SELinux). Plattformen är uppsatt med redundans för att uppnå hög tillgänglighet, samtidigt som systemkomponenter kontinuerligt och automatiskt uppdateras i en CI/CD‑miljö. Vi kallar detta "Secure by Design".

Safespring Compute erbjuder stora fördelar såsom förenklat samarbete mellan olika avdelningar eller grupper, förenklad IT‑förvaltning samt ökad effektivitet och flexibilitet i din organisation.

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
    <h2>Kontoinformation</h2>
    <p></p>
        <div class="form-field">
        <input maxlength="512" type="text" placeholder="" id="up-client-name-input" name="Client.name" required="required">
        <label for="organization"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Organisation</label>
    </div>
    <div class="form-field">
        <input type="text" id="gatekeeper-name" name="Extra.1695029810459" required>
        <label for="gatekeeper-name"><i class="fas fa-gift"></i>&nbsp;&nbsp;&nbsp;Kampanjkod</label>
    </div>
    <h2>Godkännande</h2>
    <p>Genom att skicka in detta formulär godkänner du våra villkor och policyer. Vi tar våra kunders integritet på största allvar och kommer endast att använda dina uppgifter för att fullfölja din beställning. Om du har några frågor eller funderingar är du välkommen att kontakta oss. Tack för att du väljer våra tjänster!</p>
    <div class="inputGroup">
            <input type="checkbox" name="accept-usage" id="accept-usage" required>
            <label for="accept-usage">
            Policy för godtagbar användning <a class="label-link" href="/documents/safespring-acceptable_use_policy.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
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
    <input type="hidden" name="formId" value="9549u5325684f3ca44641b1ebb4d4a8cd2e22">
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