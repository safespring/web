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
            box-shadow: none;        }

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
            transform: translateY(-205%);
            -webkit-transform: translateY(-205%);
            color: #3C9BCD;
            font: 400 12px/16px 'Hind';
            letter-spacing: 0.5px;
            background-color: #fafefe;
        }

        .form-field.has-content.invalid label {
            transform: translateY(-205%);
            -webkit-transform: translateY(-205%);
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
        <input type="text" id="project" name="Extra.1683706799384" required placeholder="">
        <label for="project"><i class="fas fa-input-text"></i>&nbsp;&nbsp;&nbsp;Project name (Eg. infra.domain.com)</label>
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
           <label for="accept-terms"> General terms & conditions</label>
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
                        alert("You must accept our terms our conditions");
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
