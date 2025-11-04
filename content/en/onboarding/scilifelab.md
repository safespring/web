---
title: "Safespring Onboarding Instructions for SciLifeLab"
date: 2024-09-23T13:05:26+02:00
draft: false
intro: "Follow these steps to set up and manage new projects in Safespring. Using the correct project naming and credential handling ensures correct quota and access."
background: ""
sidebarlinkname: "Create account"
sidebarlinkurl: "#form"
socialmedia: ""
noindex: "yes"
language: "en"
aliases:
    - /create-account
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/checkbox/dist/mdc.checkbox.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/form-field/dist/mdc.form-field.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/button/dist/mdc.button.min.css">

{{< ingress >}}
{{< /ingress >}}

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
    <h2 id="form">User</h2>
    <p></p>
    <div class="column-two">
        <div class="form-field">
            <input type="text" id="firstname" name="Contact.firstname" required>
            <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;First name</label>
        </div>
        <div class="form-field">
            <input type="text" id="lastname" name="Contact.lastname" required>
            <label for="lastname"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Last name</label>
        </div>
    </div>
    <div class="form-field">
        <input type="text" id="Contact.cellPhone" name="Contact.cellPhone" required>
        <label for="cellPhone"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;&nbsp;Cell Phone</label>
    </div>
    <div class="form-field">
        <input maxlength="512" type="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Please enter a valid email" id="up-email-input" autocomplete="off" name="Contact.email" required="required">
        <label for="email"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;Email</label>
    </div>
        <div class="form-field">
            <input type="text" id="Extra.1761215574932" name="Extra.1761215574932" required>
            <label for="Extra.1761215574932"><i class="fas fa-id-badge"></i>&nbsp;&nbsp;&nbsp;Swamid-ID</label>
        </div>
    <h2>Account information</h2>
    <p></p>
    <div class="form-field">
        <input maxlength="512" type="text" placeholder="" id="up-client-name-input" name="Client.name" required="required" value="SciLifeLab">
        <label for="organization"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Organization</label>
    </div>
    <div class="form-field">
        <select id="site" name="Extra.1683706744635" required>
            <optgroup label="Public cloud">
                <option value="STO 1">STO 1</option>
                <option value="STO 2">STO 2</option>
            </optgroup>
        </select>
        <label for="site"><i class="fas fa-cloud-check"></i>&nbsp;&nbsp;&nbsp;Choose your site</label><i class="fas fa-angle-down selection-icon"></i>
    </div>
    <div class="form-field">
        <input type="text" id="project" name="Extra.1683706799384" required placeholder="">
        <label for="project"><i class="fas fa-input-text"></i>&nbsp;&nbsp;&nbsp;Project name (Eg. project.scilifelab.se)</label>
    </div>
        <div class="form-field">
            <input type="text" id="quota" name="Extra.1761215509196" required>
            <label for="quota"><i class="fas fa-coins"></i>&nbsp;&nbsp;&nbsp;Budget</label>
        </div>
<h2>Acceptence</h2>
    <p>By submitting this form, you agree to our terms and policies. We take the privacy of our customers seriously and will only use your information for the purpose of fulfilling your order. If you have any questions or concerns, please do not hesitate to contact us. Thank you for choosing our services!</p>
    <div class="inputGroup">
        <input type="checkbox" name="accept-usage" id="accept-usage" required>
        <label for="accept-usage">
            Acceptable use policy <a class="label-link" href="/documents/safespring-acceptable_use_policy.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </label>
    </div>
    <div class="inputGroup">
        <input type="checkbox" name="singleOptIn.qptjh8v9er" id="accept-terms" required>
        <label for="accept-terms"> 
        General terms & conditions <a class="label-link" href="/documents/safespring-general_terms _and_conditions.pdf" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </label>
    </div>
    <!-- REQUIRED FIELDS -->
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549u9137f829b062435d86812dd1f90c13f8">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS -->
    <button class="button pt-1 pb-1 mt-2 submit-button" id="checkBtn" type="submit">Create account</button>
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
{{< accordion-script >}}
