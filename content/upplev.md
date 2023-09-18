---
title: "Experience Safespring, based on OpenStack"
language: "En"
date: "2023-09-18"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "With Safespring's cloud-based infrastructure service, you can scale up and down your infrastructure as needed. The service is flexible, fully automated, and based on self-service through a portal."
form: "no"
---
## Access your resources
Stable infrastructure and resource consumption as needed. With Safespring, you get an efficient model for service delivery without losing control over your data.

<br>
<a href="#test-safespring" id="button">Create account</a>

### Virtual machines at your service
Safespring's cloud-based infrastructure service is based on the market-leading cloud platform OpenStack. The service is delivered from secure data centers with high availability. Data in the service never leaves the country as the data centers are located within the country's borders.

The service is flexible, fully automated, and based on self-service through a portal: users can easily start and stop new virtual machines in a few simple steps. It is also possible to control virtual machines programmatically through standardized calls to our API.

### Data centers within the country's borders
Safespring's cloud services are produced in data centers located within the country's borders and are subject to local legislation, not least the General Data Protection Regulation (GDPR).

The data centers have a very high level of physical security. All data is stored on encrypted disks. All underlying systems in the cloud platform have a high level of security hardening (SELinux). The platform is redundantly set up to achieve high availability while system components are continuously and automatically updated, based on a CI/CD environment. We call this "Secure by Design".

Safespring Compute offers great advantages such as simplified collaboration between different departments or groups, simplifies IT management, and adds efficiency and flexibility to your organization.

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
    <h2 id="form">User</h2>
    <p></p>
    <div class="column-two">
    <div class="form-field">
        <input type="text" id="firstname" name="Contact.firstname" required>
        <label for="name"><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;First name</label>
    </div>
        <div class="form-field">
        <input type="text" id="lastname" name="Contact.lastname" required>
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
    <h2>Account information</h2>
    <p></p>
        <div class="form-field">
        <input maxlength="512" type="text" placeholder="" id="up-client-name-input" name="Client.name" required="required">
        <label for="organization"><i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Organization</label>
    </div>
    <div class="form-field">
        <input type="text" id="gatekeeper-name" name="Extra.1695029810459" required>
        <label for="gatekeeper-name"><i class="fas fa-gift"></i>&nbsp;&nbsp;&nbsp;Promotional code</label>
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
    <input type="hidden" name="formId" value="9549u5325684f3ca44641b1ebb4d4a8cd2e22">
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