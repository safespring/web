---
title: "Safespring onboarding"
date: 2019-06-10T13:05:26+02:00
draft: false
intro: "Welcome to Safespring's onboarding page! We're thrilled to have you here and look forward to helping you get started with our services."
background: ""
sidebarlinkname: "Create account"
sidebarlinkurl: "#form"
socialmedia: ""
noindex: "yes"
language: "En"
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/checkbox/dist/mdc.checkbox.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/form-field/dist/mdc.form-field.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/button/dist/mdc.button.min.css">

{{< ingress >}}
Welcome to Safespring's onboarding page! We're thrilled to have you here and look forward to helping you get started with our services.
{{< /ingress >}}

To create an account with us, please fill out the form below. Make sure to send in the form once for each contact who needs access to the project.

Our collection of products and services offers a wide range of solutions to fit your needs. If you have any questions or need assistance, please don't hesitate to contact us. We're always here to help.

To get started, simply fill out the form below with your user and account information, and accept our terms and policies. By submitting this form, you agree to our terms and policies. We take the privacy of our customers seriously and will only use your information for the purpose of fulfilling your order.

Thank you for choosing Safespring's services. We're excited to work with you!

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
            transition: all 0.2s ease-out;
            background-color: transparent;
            padding: 0 8px;
            margin: 0 -8px;
            font-family: 'Montserrat';
            color: var(--middle-blue-color);
        }


        .form-field input[type="text"],
        .form-field input[type="email"],
        .form-field input[type="tel"],
        .form-field select {
            width: 100%;
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
            box-shadow: none;        }

        .form-field input[type="text"]:valid ~ label,
        .form-field input[type="email"]:valid ~ label,
        .form-field input[type="tel"]:valid ~ label,
        .form-field select:valid ~ label {
            transform: translateY(-215%);
            color: #3C9BCD;
            font: 400 12px/12px 'Hind';
            letter-spacing: 0.5px;
            background-color: #fafefe;
        }


        .form-field input[type="text"]:focus ~ label,
        .form-field input[type="email"]:focus ~ label,
        .form-field input[type="tel"]:focus ~ label,
        .form-field select:focus ~ label {
            transform: translateY(-215%);
            color: #3C9BCD;
            font: 400 12px/12px 'Hind';
            letter-spacing: 0.5px;
            background-color: #fafefe;
        }

        select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
        }

        .selection-icon {
            position: absolute;
            right: 11px;
            top: 9px;
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
            transform: translateY(-215%);
            color: #3C9BCD;
            font: 400 12px/12px 'Hind';
            letter-spacing: 0.5px;
            background-color: #fafefe;
        }

        .form-field.has-content.invalid label {
            transform: translateY(-215%);
            color: red;
            font: 400 12px/12px 'Hind';
            letter-spacing: 0.5px;
            background-color: #fafefe;
        }


</style>

<form id="up-form" name="form_9549u6488cf25775f4e62b6d09de546b45f5f" action="https://power.upsales.com/api/external/formSubmit" method="POST">
    <h2 id="form">User</h2>
    <p></p>
    <div class="column-two">
    <div class="form-field">
        <input type="text" id="name" name="Contact.firstname" required>
        <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;First name</label>
    </div>
        <div class="form-field">
        <input type="text" id="name" name="Contact.lastname" required>
        <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Last name</label>
    </div>
    </div>
    <div class="form-field">
        <input type="tel" id="phone" name="Contact.cellPhone" required>
        <label for="phone"><i class="fas fa-mobile-screen-button"></i>&nbsp;&nbsp;&nbsp;Mobile</label>
    </div>
    <div class="form-field">
        <input maxlength="512" type="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Please enter a valid email" id="up-email-input" autocomplete="off" name="Contact.email" required="required">
        <label for="email"><i class="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;Email</label>
    </div>
    <div class="form-field">
        <input type="text" id="eppn" name="Extra.1683706722052">
        <label for="eppn"><i class="fas fa-input-text"></i>&nbsp;&nbsp;&nbsp;EPPN (for connection to NREN)</label>
    </div>
    <h2>Account information</h2>
    <p></p>
        <div class="form-field">
        <input maxlength="512" type="text" placeholder="" id="up-client-name-input" name="Client.name" required="required">
        <label for="organization"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Organization</label>
    </div>
    <div class="form-field">
        <select id="site" name="Extra.1683706744635" required>
            <option value="STO 1">STO 1</option>
            <option value="STO 2">STO 2</option>
            <option value="STO 3 (NREN connection)">STO 3 (NREN connection)</option>
            <option value="STO 4 (NREN connection)">STO 4 (NREN connection)</option>
            <option value="OSL 1">OSL 1</option>
        </select>
        <label for="site"><i class="fas fa-cloud-check"></i>&nbsp;&nbsp;&nbsp;Choose your site</label><i class="fas fa-angle-down selection-icon"></i>
    </div>
    <div class="form-field">
        <input type="text" id="project" name="Extra.1683706799384" required>
        <label for="project"><i class="fas fa-input-text"></i>&nbsp;&nbsp;&nbsp;Project name</label>
    </div>
    <div class="form-field">
        <input type="email" id="billing" name="Extra.1683706812269" required>
        <label for="billing"><i class="fas fa-envelope-open-dollar"></i>&nbsp;&nbsp;&nbsp;Billing address (email)</label>
    </div>
    <div class="form-field">
        <input type="text" id="ip" name="Extra.1683706829902" required>
        <label for="ip"><i class="fas fa-input-numeric"></i>&nbsp;&nbsp;&nbsp;Whitelist IP address for API access</label>
    </div>
    <h2>Customer user administrator</h2>
    <p></p>
    <div class="form-field">
        <input type="text" id="gatekeeper-name" name="Extra.1683706848970" required>
        <label for="gatekeeper-name"><i class="fas fa-user-gear"></i>&nbsp;&nbsp;&nbsp;Name</label>
    </div>
    <div class="form-field">
        <input type="tel" id="gatekeeper-phone" name="Extra.1683706862870" required>
        <label for="gatekeeper-phone"><i class="fa-kit fa-solid-mobile-screen-button-gear"></i>&nbsp;&nbsp;&nbsp;Mobile</label>
    </div>
    <div class="form-field">
        <input type="email" id="gatekeeper-email" name="Extra.1683706879354" required>
        <label for="gatekeeper-email"><i class="fa-kit fa-solid-envelope-gear"></i>&nbsp;&nbsp;&nbsp;Email</label>
    </div>
    <h2>Acceptence</h2>
    <p>By submitting this form, you agree to our terms and policies. We take the privacy of our customers seriously and will only use your information for the purpose of fulfilling your order. If you have any questions or concerns, please do not hesitate to contact us. Thank you for choosing our services!</p>
    <div class="inputGroup">
            <input type="checkbox" name="accept-usage" id="accept-usage" required>
            <label for="accept-usage">
            Acceptable use policy
        </label>
    </div>
    <div class="inputGroup">
            <input type="checkbox" name="singleOptIn.qptjh8v9er" id="accept-terms" required>
           <label for="accept-terms"> General terms and conditions</label>
    </div>
    <!-- REQUIRED FIELDS -->
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549u6488cf25775f4e62b6d09de546b45f5f">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS -->
    <button class="button pt-1 pb-1 mt-2 submit-button" type="submit">Create account</button>
</form>
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
<script>
    document.addEventListener('DOMContentLoaded', function() {
    var formFields = document.querySelectorAll('.form-field input, .form-field select');

    formFields.forEach(function(formField) {
        formField.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('has-content');
            } else {
                this.parentElement.classList.remove('has-content');
            }

            if (!this.validity.valid) {
                this.parentElement.classList.add('invalid');
            } else {
                this.parentElement.classList.remove('invalid');
            }
        });

        // Kör en gång för att sätta rätt klass vid sidoladdning
        formField.dispatchEvent(new Event('input'));
    });
});
</script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var formFields = document.querySelectorAll('.form-field input, .form-field select');

    formFields.forEach(function(formField) {
        formField.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('has-content');
                this.parentElement.classList.remove('is-empty');
            } else {
                this.parentElement.classList.remove('has-content');
                this.parentElement.classList.add('is-empty');
            }

            if (!this.validity.valid) {
                this.parentElement.classList.add('invalid');
            } else {
                this.parentElement.classList.remove('invalid');
            }
        });

        // Kör en gång för att sätta rätt klass vid sidoladdning
        formField.dispatchEvent(new Event('input'));
    });
});
</script>

<!--
<form id="up-form" name="form_9549uf199d92873fb4d7bb4d3722b75578d98" action="https://power.upsales.com/api/external/formSubmit" method="POST">
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
        <input maxlength="512" type="text" id="up-client-name-input" name="Extra.1567777613170" placeholder="Project name">
        <div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1">In Compute, a project owns virtual machines. Users can be associated with more than one project.</span></div>
    </div>
    <div class="form"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;
        <input maxlength="512" type="text" id="up-client-name-input" name="Extra.1567777625449" placeholder="Cost center">
        <div class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltiptext shadow-1">For your internal billing reference.</span></div>
    </div>
    <div>
        <h3>4. Message to onboarding:</h3>
        <textarea maxlength="512" rows="3" name="Extra.1567777636350"></textarea>
    </div>
    <!-- REQUIRED FIELDS 
    <input type="hidden" name="formCid" value="9549">
    <input type="hidden" name="formId" value="9549uf199d92873fb4d7bb4d3722b75578d98">
    <input type="hidden" name="isFrame" value="false">
    <input type="text" value="" name="validation" style="display: none;">
    <!-- END OF REQUIRED FIELDS 
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
</script>-->
