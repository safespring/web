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

<script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
<script src="//twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
<style>
	.twitter-typeahead .tt-hint {
		color: #6B7C93;
	}

	.twitter-typeahead .tt-menu {
		background-color: #fff;
		max-height: 300px;
		overflow: auto;
		border: 1px solid #66afe9;
		border-top: none;
		border-radius: 0 0 4px 4px;
		width: 100%;
		margin-top: -2px;
	}

	.twitter-typeahead .tt-suggestion {
		padding: 5px 10px;
		color: #4B5562;
	}

	.twitter-typeahead .tt-suggestion:hover {
		background-color: #F6F9FB;
		color: #000;
	}
</style>
<script>
	jQuery(document).ready(function() {
		var matchClientsTimeout = null;
		var matchClients = function(q, sync, cb) {
			if (matchClientsTimeout) {
				clearTimeout(matchClientsTimeout);
			}
			matchClientsTimeout = setTimeout(function() {
				$.ajax({
					type: "GET",
					url: "https://power.upsales.com/api/external/soliditet/clientSearch?name=" + q,
					success: function(res) {
						cb(res.data);
					},
					error: function(res) {},
				});
			}, 200);
		};
		var getSuggestTemplate = function(c) {
			return "<div><div>" + c.name + "</div><span style='color: #6B7C93; font-size: 10px;'>" + c.city + "</span></div>";
		};
		var nameField = jQuery("#up-client-name-input");
		if (nameField.length) {
			var dunsField = jQuery("<input type='hidden' name='Client.dunsNo' />");
			var spinner = jQuery("<b id='up-client-spinner' class='fa fa-refresh fa-spin' />");
			spinner.css("display", "none");
			nameField.after(dunsField);
			nameField.after(spinner);
			nameField.typeahead({
				hint: true,
				highlight: true,
				minLength: 3
			}, {
				name: "clients",
				limit: 25,
				source: matchClients,
				templates: {
					suggestion: getSuggestTemplate
				}
			}).bind("typeahead:autocompleted", function(ev, client) {
				nameField.typeahead("val", client.name);
				dunsField.val(client.dunsNo);
				nameField.blur();
			}).bind("typeahead:select", function(ev, client) {
				nameField.typeahead("val", client.name);
				dunsField.val(client.dunsNo);
			}).bind("typeahead:cursorchange", function(ev, client) {
				nameField.typeahead("val", client.name);
				dunsField.val(client.dunsNo);
			}).on("typeahead:asyncrequest", function() {
				spinner.css("display", "inline");
			}).on("typeahead:asynccancel typeahead:asyncreceive", function() {
				spinner.css("display", "none");
			});
		}
	});
</script>
<script type="text/javascript">
	function openTerms(id) {
		var terms = {
			"1": "<p dir=\"ltr\"><em>SAFESPRING 2018<br />\nInformation avseende personuppgiftsbehandling</em><br />\n<br />\n<br />\n<u><strong>Information</strong></u><br />\n<br />\nSafespring tar emot och lagrar uppgifterna som skrivs in i de kontaktformulär som finns på webbplatsen safespring.com och våra landningssidor där detta dokument finns i anslutning till formuläret. Det innebär att vi behandlar dina personuppgifter för att kunna komma i kontakt med dig, och/eller skapa användarkonton kopplade till våra tjänster (”Ändamålet”). De uppgifter vi behandlar för Ändamålet är normalt ditt namn, din e-mailadress, ditt telefonnummer, din titel och din arbetsgivare (”Personuppgifterna”). Blue Safespring AB, org. nr. 559075–0245, är personuppgiftsansvariga för behandlingen av Personuppgifterna.<br />\n<br />\nDen legala grunden för behandlingen av Personuppgifterna för Ändamålet är vårt berättigade intresse att på ett effektivt sätt kunna marknadsföra de tjänster vi erbjuder. Personuppgifterna lagras naturligtvis på ett säkert sätt i linje med vår affärsmodell och du har rätt att när som helst avregistrera dig från nyhetsbrevet och/eller ange att du inte vill bli kontaktad av oss. Vi kommer att behandla Personuppgifterna så länge du väljer att ta emot nyhetsbrevet. Då behandlingen upphör raderas Personuppgifterna.<br />\n<br />\nVi kan komma att dela Personuppgifterna med de tredje parter som vi anlitar för att uppnå Ändamålen, vilket kan vara t.ex. för extern lagring. En sådan tredje part kan vara belägen i ett land utanför EU/EES. Om Europakommissionen inte anser att landet säkerställer en adekvat skyddsnivå kommer överföringen till den tredje parten att ha stöd i kommissionens standardavtalsklausuler för överföring av personuppgifter till ett land utanför EU/EES, se artiklarna 45-46 i dataskyddsförordningen. Dessa standardavtalsklausuler finns åtkomliga här:&nbsp;<br />\nhttp://ec.europa.eu/justice/data-protection/international-transfers/transfer<br />\n<br />\nOm du har några frågor avseende vår behandling av Personuppgifterna, bör dessa ställas till oss via E-mailadress GDPR@safespring.com. Dessa kontaktuppgifter kan även användas om du önskar att utöva någon av dina rättigheter enligt dataskyddsförordningen (2016/679). Dessa rättigheter är inte absoluta och en begäran om utövande av rättigheterna resulterar därför inte alltid i någon åtgärd. Rättigheterna i dataskyddsförordningen inkluderar:<br />\n<br />\n<strong><em>Rätt till tillgång</em></strong> – Enligt artikel 15 i dataskyddsförordningen har du rätt att få tillgång till Personuppgifterna samt viss information rörande behandlingen av Personuppgifterna. Den informationen framgår av detta dokument.<br />\n<br />\n<strong><em>Rätt till rättelse</em></strong> – Enligt artikel 16 i dataskyddsförordningen har du rätt att få Personuppgifterna rättade om de är felaktiga och kompletterade om de är ofullständiga.&nbsp;<br />\n<br />\n<strong><em>Rätt till radering</em></strong> – Under vissa omständigheter har du enligt artikel 17 i dataskyddsförordningen rätt att få dina personuppgifter raderade. Detta är den så kallade ”rätten att bli bortglömd”.<br />\nRätt till begränsning av behandling – Under vissa omständigheter har du enligt artikel 18 i dataskyddsförordningen rätt att begränsa den behandling som vi vidtar.&nbsp;<br />\n<br />\n<strong><em>Rätt till dataportabilitet </em></strong>– Enligt artikel 20 i dataskyddsförordningen har du rätt att få ut dina personuppgifter (eller få dem överförda till en annan personuppgiftsansvarig) i ett strukturerat, allmänt använt och maskinläsbart format.<br />\n<br />\n<strong><em>Rätt att göra invändningar </em></strong>– Enligt artikel 21 i dataskyddsförordningen har du rätt att invända mot vårt berättigade intresse. I sådana fall kommer vi att upphöra med behandlingen av Personuppgifterna för Ändamålen. Safespring vill att du är medveten om rätten att göra invändningar då den enligt dataskyddsförordningen är en särskilt viktig rättighet.<br />\n<br />\nSlutligen har du rätt att inge klagomål till Datainspektionen, se kontaktuppgifter på nästa sida.\f<br />\n<br />\n<br />\n<strong><u>Kontaktinformation</u></strong><br />\n<br />\n<em>Safespring</em><br />\nGDPR@safespring.com<br />\n<br />\n<em>Datainspektionen</em><br />\ndatainspektionen@datainspektionen.se<br />\nTelefon: +46(0)‭8-657 61 00.‬</p>\n",
			"2": "Safespring 2018<br />\n<strong>General Terms and Conditions for Cloud Services </strong>&nbsp; <br />\n<br />\n<em>THE PARTIES UNDERTAKE TO PERFORM ALL THEIR RESPECTIVE OBLIGATIONS IN ACCORDANCE WITH THE AGREEMENT, AS SET OUT HEREIN.</em><br />\n<br />\n<br />\n<strong>01. Definitions</strong><br />\n<br />\nThe following terms and expressions shall in this Agreement when capitalized have the meanings assigned to them in this Section 1.<br />\n<br />\n“Agreement” - means these General Terms and Conditions, Service Specification, Service Order and any other agreement documents referred to in the Service Order.<br />\n<br />\n“Customer” – means the legal entity that has entered into the Agreement with Safespring. Also referred to as “Party”.<br />\n<br />\n“Customer Systems” – means the IT system(s) and facilities used by Customer to receive and use the Service at and from the Service Access Point, including all relevant computer systems and locations and any other equipment, software, hardware, internet-, telecom- or VPN connections, firmware, database file, or (electronic) documentation required to receive the Services.<br />\n<br />\n“Data” – means all the information, text drawings, diagrams, images or sounds (including and/or together with any databases made up of any of these) and other data which are embodied in any electronic magnetic, optical or tangible media, and which:&nbsp;<br />\nI.&nbsp;&nbsp; &nbsp;are owned by or relate to either Party’s business;&nbsp;<br />\nII.&nbsp;&nbsp; &nbsp;are supplied to one Party or on behalf of the other Party; or&nbsp;<br />\nIII.&nbsp;&nbsp; &nbsp;are generated, processed, stored or transmitted by a Party and/or a sub-contractor, on behalf of the other Party pursuant to this agreement.<br />\n<br />\n“Safespring” – means the Safespring-company that have entered into the Agreement with Customer. Also referred to as “Party”.<br />\n<br />\n“Safespring Systems” – means Safespring’s IT system(s), including all relevant computer systems and any other equipment, software, hardware, firmware, database file, or (electronic) documentation, used to produce the Services.<br />\n<br />\n“Professional Services” – means separately ordered consultancy services provided by Safespring on hourly rates and basis.<br />\n<br />\n“Service” – means the cloud services offered by Safespring and specified in the Service Specification attached to the Service Order.<br />\n<br />\n“Service Access Point” – means the physical connection point and technical interface specified by Safespring where Customer receives the Service.<br />\n<br />\n“Service Fee” – means the periodic fee for the Services (yearly or monthly) and the aggregated hourly fees for Professional Services, to be paid by Customer to Safespring.<br />\n<br />\n“Service Order” – means the request for Service made by Customer under this Agreement and duly signed by both Parties.<br />\n<br />\n“Service Recipient” – means a third-party company - other than the Customer - entitled to receive and use the Services.<br />\n<br />\n“Service Specification” – means the document attached to the Service Order describing the Service and applicable service levels.<br />\n<br />\n“Service Start Date” – means the date that the Services shall be available to Customer and from which date Safespring shall be entitled to charge the Service Fee. Service Start Date is specified in Service Order and if not, it shall be the date Safespring announces that the Service is ready for use.<br />\n<br />\n“Term” – means the term of the agreement as set forth in section 7.<br />\n<br />\n<br />\n<strong>02. Service requirements</strong><br />\n<br />\n<strong>2.1. GENERAL</strong><br />\nSafespring shall from Service Start Date and for the duration of the Agreement make the Services available at the Service Access Point.&nbsp;<br />\n<br />\nThe Services shall be delivered in accordance with the Service Specification. Safespring will use all best efforts and shall be entitled to<br />\nmaintain, bug fix and upgrade the Services with recent and up-to-date versions of Services and to remedy defects in Services.<br />\n<br />\nSafespring shall upon specific order provide the Professional Services in a workmanlike and professional manner according to good industry practice. All services shall be provided in a manner that complies with law and regulations applicable to Safespring in its capacity as a supplier of IT-services.<br />\n<br />\nSafespring shall take, implement and maintain up-to-date industry standard of technical and organizational measures<br />\nagainst any computer viruses and/or malicious and/or harmful software on the hardware and software used in the Safespring System.<br />\n<br />\nSafespring shall during the term of this Agreement hold and maintain appropriate insurance policies with reputable insurers in relation to its obligations under this Agreement.<br />\n<br />\n<br />\n<strong>03. Customer general obligations</strong><br />\n<br />\nThe Customer is responsible for the Customer System and that it has the capability to receive the Services at the Service Access Point.<br />\n<br />\nThe Customer shall, upon request, grant access to and provide Safespring with information about the Customer SysCloud to the extent relevant and required to set up, maintain and perform the Services.<br />\n<br />\nThe Customer shall comply with Safespring’s general security instructions and procedures for using the Services, provided that Safespring have made such instructions and procedures available to Customer in advance.<br />\n<br />\nThe Customer shall not permit any persons other than its authorized personnel and authorized users to access or use the Services or the Safespring System. The Customer will take all necessary precautions to prevent loss and alteration of Safespring System and data, to prevent introduction of viruses to Safespring System, and to prevent any unauthorized access.&nbsp;<br />\n<br />\nThe Customer must promptly provide Safespring with any and all details of which the Customer becomes aware of any unauthorized access, copying, modification or use of the Services and Safespring System.<br />\n<br />\nThe Customer acknowledge and accept that Safespring without any liability is entitled to temporarily suspend the provision of the Services, should Safespring in its professional discretion conclude that Customer’s (or any of its user’s) Data or access to the Service cause or impose, or may cause or impose a risk for, system failure, Service defects or a security threat to Safespring System or its Data therein.<br />\n<br />\n<br />\n<strong>04. Service fees and terms of payment</strong><br />\n<br />\nAll Service Fees are exclusive of VAT and other taxes and/or duties.<br />\n<br />\nAll Service Fees shall be adjusted yearly based on Labor Cost Index (LCI) for non-manual workers in the private sector, according to SNI 2007, Category J (information and communication companies), published by SCB in Sweden (Swe: Statistiska Centralbyrån).&nbsp;<br />\n<br />\nBase quarter for the adjustments shall be the third quarter 3 of the year specified by Safespring.<br />\n<br />\n<strong>4.1 Services</strong><br />\nThe Customer shall for the Services pay the Services Fee stated in the Service Order or otherwise as stated in Safespring’s general price list for cloud services.<br />\n<br />\nThe Service Fee shall be invoiced by Safespring quarterly in advance.<br />\nTerms of payment are thirty (30) days from date of invoice.<br />\n<br />\n<strong>4.2 Professional Services</strong><br />\nThe Customer shall for the Professional Services pay the Services Fee stated in the Service Order or otherwise as stated in Safespring’s general price list for consultancy services. The Service Fee for Professional Services shall be invoiced by Safespring on a monthly basis in arrears. Terms of payment<br />\nare thirty (30) days from date of invoice.<br />\n<br />\n<strong>4.3 Overdue Payments</strong><br />\nFor any overdue payments, Safespring shall have the right to charge a monthly interest of 2 percent based on the outstanding overdue balance.&nbsp;<br />\n<br />\nIf payment for Services is more than 60 days past due, Safespring may, without any liability whatsoever, terminate or suspend providing the affected services to the Customer upon 10 days prior written notice to the Customer.<br />\n<br />\n<br />\n<strong>05. Term and termination</strong><br />\n<br />\nThe Agreement shall enter into force when Service Order has been duly signed by both Parties and shall remain in force for an ‘initial agreement period’ of 3 years, unless the Service Order states another initial period.<br />\n<br />\nIf not terminated in writing by either Party no later than six (6) months prior to the end of the initial period (or extension period), the Agreement will be automatically extended for consecutive extension periods of one (1) year at the time.<br />\n<br />\nEither Party shall have the right to terminate the Agreement forthwith without liability to the other Party, by written notice to the other Party, if the other Party goes into liquidation, enters into composition proceedings with its creditors, becomes insolvent or is unable to pay its major debts or the majority of its debts or fails or admits in writing its inability to pay its major debts or the majority of its debts as they become due, makes a general assignment for the benefit of creditors or if a petition under bankruptcy or under any insolvency law is filed by or against the other Party and such petition filed by a third party is not dismissed within sixty (60) days (or such longer period agreed upon between the Parties) after it has been filed or a secured part takes possession of all or<br />\nsubstantially all of its assets and such process is not dismissed or restrained within thirty (30) days.<br />\n<br />\nEither Party shall have the right to terminate the Agreement forthwith without liability to the other Party, by written notice to the other Party, if the other Party commits a material breach of its obligations hereunder. However,<br />\nin case such a material breach is capable of being cured, neither Party shall be entitled to terminate the Agreement unless and until the other Party have failed to cure the material breach within thirty (30) days after the failing Party have been served with a notice requiring it to cure such a breach and stating the sending Party's intention to terminate the Agreement if compliance with the notice to cure is not met.<br />\n<br />\nThe expiration or termination of this Agreement shall not affect or prejudice any provisions of the Agreement which are expressly or by implication provided to continue in effect after such expiration or termination.<br />\n06. Force majeure<br />\nNeither Party shall be liable for non-performance or defective nor late performance of any of their obligations<br />\nhereunder to the extent that such non-performance, defective or late performance is due to causes and/or conditions outside of the performing Party’s reasonable control.<br />\n<br />\nCauses and/or conditions outside of a Party's reasonable control shall include, but not be limited to, acts of terrorism, strikes and other labor disputes, fire, explosions, floods, earthquakes, typhoons, epidemics, wars (whether declared or undeclared), government acts (including failure to act) (de jure or de facto), riots, revolutions, sabotage<br />\nor severe weather conditions which the Party claiming excuse could not have reasonably foreseen the effects of or made alternative arrangements for.<br />\n07. Limitation of liability<br />\nSafespring shall not be liable for any non or late performance or defective Service if this has been caused by Customers’ Data or Systems; non-compliance with the customer obligations; regular System maintenance activities announced by Safespring in advance; or emergency System maintenance activities which could not reasonably have been foreseen by Safespring or its third party program product developers.<br />\n<br />\n<em>SAFESPRING SHALL NOT BE LIABLE TO THE CUSTOMER IN CONNECTION WITH THE AGREEMENT FOR ANY INDIRECT OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PRODUCTION, LOSS OF DATA, LOSS OF BUSINESS, LOSS OF INVESTMENT, LOSS OF REVENUE AND LOSS OF GOODWILL.</em><br />\n<br />\nSafespring’s aggregate and total liability in respect of any one or more events or series of events (whether connected or unconnected) occurring during the term of this Agreement shall per calendar year be limited to direct damages equal to fifty (50) percent of the Service Fees invoiced to the Customer during the calendar year preceding the year when the loss arose. If this Agreement has not been in force during an entire calendar year, the abovementioned amount shall be calculated over a twelve month period on the basis of the Service Fees already invoiced to the Customer during the calendar year in question.<br />\n<br />\nThe limitations of liability set forth herein shall not apply to any liability arising from death or injury to persons caused by negligence, any liability arising from intent or gross negligence, willful recklessness or fraud or any specific indemnification given in section 10 or any breach of the obligations as regards Confidential Information.<br />\n<br />\n<br />\n<strong>08. Confidential information</strong><br />\n<br />\nAll information (oral, visual and written) which is secret or confidential by its nature, by a restrictive legend or by other written or oral designation and is transferred or made available to the other Party under the Agreement or during negotiations before execution of the Agreement shall be treated by the receiving Party as confidential<br />\n(“Confidential Information”).<br />\n<br />\n<strong>The Parties agree:</strong><br />\nto maintain the confidentiality of such Confidential Information and not disclose the same to any third party, except as authorized by the original disclosing Party in writing; and<br />\nb) to restrict disclosure of Confidential Information to employees, consultants, subcontractors and the Customer’s group companies who have a “need to know”, provided that such third party has confirmed their adherence to a confidential undertaking which shall be no less restrictive than the undertaking set out in this section 8.<br />\n<br />\nConfidential Information shall be handled with the same degree of care that the receiving Party applies to its own Confidential Information but in no event less than reasonable care, and that Confidential Information is and shall at all times remain the property of the disclosing Party.&nbsp;<br />\n<br />\nNo use of Confidential Information is permitted except as expressly stated herein or as strictly required in performance of the Agreement or in receipt of the Services.<br />\n<br />\nHowever, each Party may disclose Confidential Information in accordance with judicial or governmental order, mandatory legal requirement or applicable mandatory Regulations, provided that the other Party is given reasonable prior notice to such disclosure, including the intended scope and content of such disclosure.<br />\n<br />\nThe Confidential Information shall be considered confidential for a period of five (5) years from the termination or expiration of the Agreement, as relevant.<br />\n09. Intellectual property rights<br />\nSafespring hereby grants the Customer a non-exclusive, nontransferable, license to use the Safespring Systems to receive and use the Services for internal purposes. The Customer shall not be entitled to resell, assign, (sub)license or lease the Services or act as service bureau for the Services to third parties unless the third party is listed as a Services Recipient in the Service Order.<br />\n<br />\nThe Safespring Data and Systems including but not limited to any derivatives, developments or modifications (upgrades,<br />\nupdates, fixes etc) thereof and the intellectual and industrial property rights therein, shall be and remain the exclusive property of Safespring or its subcontractors.&nbsp;<br />\n<br />\nAny results of the Professional Services created by Safespring under and during the performance of this Agreement, including any intellectual property rights in relation thereto, shall be the exclusive property of Safespring or its subcontractors.<br />\n<br />\nThe Customer Data and Systems including but not limited to any derivatives, developments or modifications (upgrades,<br />\nupdates, fixes etc) thereof and the Intellectual and industrial property rights therein, shall be and remain the exclusive property of the Customer or its suppliers.<br />\n<br />\nThe Customer grants Safespring a non-exclusive, non-transferable, license to use the Customer Data and Systems to perform the Services. Each Party is responsible for obtaining, at its own cost, all consents and licenses which it requires in order to enable it to perform its rights and obligations in accordance with this Agreement.<br />\n<br />\n&nbsp;In particular, the Customer warrants, and is solely liable for ensuring, that it has any and all necessary rights, consents and licenses to access and process any data provided to Safespring under this Agreement. In particular, Safespring warrants, and is solely liable for ensuring that it has any and all necessary rights, consents and licenses to perform and provide any Services to the Customer under this Agreement.<br />\n<br />\n<br />\n<strong>10. Indemnity</strong><br />\n<br />\nSafespring shall at its sole cost defend, indemnify and hold the Customer harmless from and against any and all damages, costs and expenses incurred as a result of any claim, suits, proceedings or litigation of any kind (actual or threatened) brought against the Customer based on the allegation<br />\nthat the access or use of the Safespring’s Systems in accordance with the terms of this Agreement constitutes an infringement of any intellectual and industrial property rights of such third party, subject to Safespring being authorized to manage and settle the claim, suit or proceeding or other right of action at its own discretion.<br />\n<br />\nThe Customer shall, at its sole cost, defend, indemnify and hold Safespring harmless from and against any and all damages, cost and expenses incurred as a result of any claims, suits or proceedings or litigation of any kind (actual or threatened) brought against Safespring based on the allegation that the access to or use of the Customer Data or Systems in accordance with the terms of this Agreement constitutes an infringement of any intellectual and industrial property rights of any third party.<br />\n<br />\nThe intellectual property indemnities as set out in this section, shall not apply to the degree and to the extent:<br />\n<br />\na)&nbsp;&nbsp; &nbsp;the claim arises out of breach of this Agreement by the Party entitled to be indemnified;<br />\n<br />\nb)&nbsp;&nbsp; &nbsp;the claim arises directly out of compliance by the indemnifying Party with a specification or instructions provided by the Party entitled to be indemnified; or<br />\n<br />\nc)&nbsp;&nbsp; &nbsp;the Party entitled to be indemnified has caused or materially and/or substantially contributed to the events which gave rise to the claim under the indemnity.<br />\n<br />\nEach Party shall notify the other Party as soon as it becomes aware of a third party claim or a potential claim that may be subject of an indemnity hereunder. The indemnifying Party shall without delay undertake all reasonable measures to rectify and remedy the infringing situation.<br />\n<br />\nIn case the infringement claim in the indemnifying Party’s reasonable discretion materially prevents it from fulfilling its obligations under the Agreement, it shall be entitled to terminate the Agreement without any further liability.<br />\n<br />\n<br />\n<strong>11. Data protection</strong><br />\n<br />\nIn the performance of this Agreement, Safespring may process personal data on behalf of the Customer. In relation to any such personal data, the Customer shall be the data controller and ensure that the processing is performed in accordance with applicable legislation in respect of data protection and security.<br />\n<br />\nIn the performance of this Agreement, the Customer may process personal data received from Safespring. In relation to<br />\nany such personal data, Safespring shall be the data controller and ensure that the processing is performed in accordance with applicable legislation in respect of data protection and security.<br />\n<br />\nEach Party shall be the data processor in relation to any personal data received from the other Party and shall only process the data in accordance with this Agreement and the written instructions of the other Party.&nbsp;<br />\n<br />\nIn relation to any personal data received from the other Party, each Party further undertakes to implement appropriate technical and organizational measures to protect the personal data in order to prevent unauthorized or unlawful processing of personal data and accidental loss of, or damage to, personal data, including but not limited to taking reasonable steps to ensure the reliability of employees having access to the personal data.<br />\n<br />\nEach Party undertake to only process personal data received from the other Party if necessary in order to perform or receive the Services and comply with any reasonable procedures or processes notified to such Party by the other Party with respect to personal data from time to time.<br />\n<br />\nEach Party shall notify the other Party without delay if it receives a request from a registered person to have access to that person’s personal data or compliant or request relating to the other Party’s obligations under any applicable law.<br />\nEach Party shall provide the other Party with reasonable cooperation and assistance, at the other Party’s expense, in relation to any compliant or request made under any<br />\napplicable law.<br />\n<br />\nA Party shall not without the prior written consent of the other Party process any personal data received from the other Party outside the European Economic Area. If such consent is granted, the Parties shall ensure that an agreement consisting of the relevant EU model clauses for the transfer of personal data to third countries is signed by the concerned entities.<br />\n<br />\n<br />\n<br />\n<strong>12. Subcontracting</strong><br />\n<br />\nSafespring may use subcontractors for the performance of its obligations under this Agreement. Safespring is fully responsible and liable for all acts (including omissions) of its subcontractors and shall cause each of its subcontractors to fully abide with all applicable obligations, terms and conditions of this Agreement.<br />\n<br />\n<br />\n<strong>13. Assignment</strong><br />\n<br />\nThe Agreement shall accrue to the benefit of and be binding upon the Parties hereto and any successor entity into which either Party shall have been merged or consolidated or to which either Party shall have sold or transferred all or substantially all its assets, but it shall not be otherwise assigned by either Party without the prior written consent of the other Party.&nbsp;<br />\n<br />\nThe Parties agree that any consent to a requested assignment shall not be unreasonably withheld or delayed. Safespring shall be entitled to assign this Agreement to any company within the Safespring group of companies.<br />\n<br />\n<br />\n<strong>14. No waiver</strong><br />\n<br />\nThe failure of either Party to insist, in one or more instances, upon the performance of any of the terms or conditions of the Agreement, or to exercise any right hereunder, shall not be construed as a waiver or relinquishment<br />\nof the future performance of any such terms or conditions or the future exercise of such right, and the obligation of Safespring or the Customer with respect to such future performance shall continue in full force and effect.<br />\n<br />\n<br />\n<strong>15. Miscelleneous</strong><br />\n<br />\nNo general terms and conditions of either Party or any third party shall apply to this Agreement.<br />\n<br />\nAny notice required or permitted to be given by either Party under this Agreement, shall be in writing and may be delivered by hand, by courier, sent by registered airmail letter, fax or electronic mail. Any notice shall be deemed to have been received when actually delivered or<br />\n&nbsp;<br />\nI.&nbsp;&nbsp; &nbsp;when left at the address of the recipient, receipt confirmed;<br />\n<br />\nII.&nbsp;&nbsp; &nbsp;five (5) days after the date of posting it with ordinary mail; or<br />\n<br />\nIII.&nbsp;&nbsp; &nbsp;where sent by email or fax, on the day following receipt by the sender of an email confirmation or fax transmission report, generated by the machine (or computer) from which the notice was sent, indicating that the notice was sent in its entirety to the recipient’s email address or fax number, as applicable. Any notices shall be sent to the contact details specified in the Service Order.<br />\n<br />\n<br />\n<strong>16. Governing law and settlements of dispute</strong><br />\n<br />\nThe Agreement shall be governed by and construed in accordance with the laws of Sweden. Any dispute, controversy or claim arising out of or in connection with the Agreement shall be finally settled through arbitration under the Rules of the Arbitration Institute of the Stockholm Chamber of Commerce by three (3) arbitrators appointed in accordance with the said Rules.<br />\n<br />\nThe place of the arbitration proceedings shall be Stockholm, and the language of the proceeding shall be English.<br />\n<br />\n<br />\n<strong>17. Severability</strong><br />\n<br />\nEach provision of the Agreement is construed in such a manner as to be effective and valid under the substantive laws of Sweden. Should, however, any provision notwithstanding this, by action of law or for any other reason, be held to be prohibited or invalid in any relevant jurisdiction, the remaining provisions of this Agreement shall, provided that the contractual state of equilibrium between the Parties is not materially distorted as a result of such prohibition or invalidity, remain in full force and effect.<br />\n<br />\nShould the contractual state of equilibrium between the Parties not be materially distorted as a result of a prohibition or invalidity of any provision of this Agreement, the Parties shall promptly agree upon an alternative provision having an effect as similar as possible to the effect of the<br />\nprohibited or invalid provision.<br />\n<br />\nShould the contractual state of equilibrium between the Parties be materially distorted as a result of the prohibition or invalidity of any provision of the Agreement, the Party not favored by such prohibition or invalidity shall<br />\nhave the right to terminate this Agreement with immediate effect.<br />\n<br />\n<br />\n<strong>18. Entire agreement</strong><br />\n<br />\nThis Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all previous negotiations, proposals, commitments, writings, oral statements, and understanding of any nature whatsoever.<br />\n<br />\n<br />\n<strong>19. Modification of agreement</strong><br />\n<br />\nNo modification, amendment or other change may be made to the Agreement or any part thereof unless reduced to writing and executed by authorized representatives<br />\nof both Parties.&nbsp;<br />\n<br />\n<br />\n<br />\n<br />\n&nbsp;",
			"3": null
		};
		var preview = window.open("", "", "height=700,width=800,scrollbars=yes,resizable=yes,toolbar=no,status=no,menu=no,titlebar=no,location=no,addressbar=no");
		var html = "<head><meta charset=\"UTF-8\"><style>body {margin: 0; padding: 20px;color: #333;font-family: Helvetica;font-size: 14px;}</style></head><body>" + terms[id] + "</body>";
		preview.document.write(html);
	}
</script>
<form id="up-form" name="form_9549u1a260a3841d74d2c9257b0d3921b2aaa" action="https://power.upsales.com/api/external/formSubmit" method="POST">
	<h2>Safespring Onboarding</h2>
	<p>You're one form away from using Safespring's services. If you get stuck or have questions, please call +46(0)8-55 10 73 70</p>
	<h3>Company information</h3>
		<div>
		<br>
		<input maxlength="512" type="text" placeholder=" Organisation name" id="up-client-name-input" name="Client.name" required="required">
	</div>
	<div>
		<label>Authorized purchaser (name) *</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Contact.name" required="required">
	</div>
	<div class="email">
		<label>Authorized purchaser (email) *</label>
		<br>
		<input maxlength="512" type="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&amp;’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$" title="Please enter a valid email" id="up-email-input" autocomplete="off" name="Contact.email" required="required">
	</div>
	<div>
	<h3>Safespring services and location</h3>
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
		<div class="inputGroup">
			<input type="checkbox" value="Safespring Compute" name="Extra.1623315527845">
			<label>Safespring Compute</label>
		</div>
		<label><input type="checkbox" value="Safespring Storage" name="Extra.1623315527845">&nbsp;Safespring Storage&nbsp;</label>
		<label><input type="checkbox" value="Compliant Kubernetes" name="Extra.1623315527845">&nbsp;Compliant Kubernetes&nbsp;</label>
		<label><input type="checkbox" value="Safespring Backup" name="Extra.1623315527845">&nbsp;Safespring Backup&nbsp;</label>
	</div>
	<div>
		<label>Safespring Services (Data centers in Norway)</label>
		<br>
		<label><input type="checkbox" value="Safespring Compute" name="Extra.1623315759521">&nbsp;Safespring Compute&nbsp;</label>
		<label><input type="checkbox" value="Safespring Storage" name="Extra.1623315759521">&nbsp;Safespring Storage&nbsp;</label>
		<label><input type="checkbox" value="Compliant Kubernets" name="Extra.1623315759521">&nbsp;Compliant Kubernets&nbsp;</label>
		<label><input type="checkbox" value="Safespring Backup" name="Extra.1623315759521">&nbsp;Safespring Backup&nbsp;</label>
	</div>
	<h3>User account 1<h3>
	<div>
		<label>User account 1 (Name)</label>
		<br>
		<input maxlength="512" type="text" placeholder="Name Surname" name="Extra.1623315430295">
	</div>
	<div>
		<label>User account 1 (mobile number)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623315451726">
	</div>
	<div>
		<label>User account 1 (Email)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623315469606">
	</div>
	<div>
		<label>Message or questions to Safespring</label>
		<br>
		<textarea maxlength="255" rows="3" placeholder="" name="Extra.1623315942297"></textarea>
	</div>
	<div class="form-group" style="display: flex;"><input type="checkbox" value="on" name="singleOptIn.74pvmtvmw9n" style="margin: auto 7px auto 0px;"><label class="opt-in-label">Jag accepterar <a class="up-unstyled-element" href="javascript:openTerms(1);">villkoren</a></label>

	</div>
	<div>
		<label>User account 2 (Name)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623935940139">
	</div>
	<div>
		<label>User account 2 (mobile number)</label>
		<br>
		<input type="number" placeholder="" name="Extra.1623935964610">
	</div>
	<div>
		<label>User account 2 (Email)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623935974593">
	</div>
	<div>
		<label>User account 3 (Name)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623936361117">
	</div>
	<div>
		<label>User account 3 (mobile number)</label>
		<br>
		<input type="number" placeholder="" name="Extra.1623936367559">
	</div>
	<div>
		<label>User account 3 (Email)</label>
		<br>
		<input maxlength="512" type="text" placeholder="" name="Extra.1623936379803">
	</div>
	<!-- REQUIRED FIELDS -->
	<input type="hidden" name="formCid" value="9549">
	<input type="hidden" name="formId" value="9549u1a260a3841d74d2c9257b0d3921b2aaa">
	<input type="hidden" name="isFrame" value="false">
	<input style="display: none;" type="text" value="" name="validation">
	<!-- END OF REQUIRED FIELDS -->
	<div class="submit-button"><button type="submit">Create account</button></div>
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
<script>
	function onSubmit(t) {
		var o, n, a = !0,
			e = !0;
		void 0 !== window.__validEmail && (e = window.__validEmail, a = !1), "boolean" == typeof e && e && !a ? validateForm(t, "https://www.safespring.com/onboarding/success/") : (t.preventDefault(), o = !0, n = setInterval(function() {
			var e = window._bEmValid;
			void 0 === window.__validEmail && e || (o = window.__validEmail, a = !1), ("boolean" == typeof o && o || !a) && (clearInterval(n), validateForm(t, "https://www.safespring.com/onboarding/success/"))
		}, 300))
	}

	function validateForm(e, o) {
		e.preventDefault();
		for (var t = document.getElementsByName("formId")[0].value, e = document.forms["form_" + t], n = e.querySelectorAll("input, textarea, select"), a = 0; a < n.length; a++) "text" === n[a].type && (n[a].value = n[a].value.trim());
		t = e.querySelectorAll("input[name*=phone], input[name*=Phone]");
		if ([].forEach.call(t, function(e) {
				e.iti && (e.value = e.iti.getNumber())
			}), void 0 === window.grecaptcha || "" !== window.grecaptcha.getResponse()) {
			for (var l = [], a = 0; a < n.length; a++) "checkbox" === n[a].type ? l.push(n[a].name + "=" + encodeURIComponent(n[a].checked ? n[a].value : "off")) : l.push(n[a].name + "=" + encodeURIComponent(n[a].value));
			var s = l.join("&");
			s += "&isAjax=true";
			var i = window._paq || null,
				r = new XMLHttpRequest;
			r.open("POST", e.action), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(s), r.onload = function() {
				var e, t;
				200 === r.status ? o ? (i && i.push && i.push(["trackLink", "https://post.upsales.com/" + r.responseText, "link"]), "undefined" != typeof _uaq && _uaq("form=" + r.responseText), setTimeout(function() {
					window.top.location.href = o
				}, 333)) : (e = document.getElementById("up-form"), t = document.getElementById("up-form-thanks"), e.style.display = "none", t.style.display = "block", i && i.push && i.push(["trackLink", "https://post.upsales.com/" + r.responseText, "link"]), _uaq && _uaq("form=" + r.responseText)) : console.log("AJAX ERROR", r.status)
			}
		} else {
			e = document.getElementById("recaptcha-error"), s = document.getElementsByClassName("g-recaptcha");
			e.style.display = "none", s && s.length && console.log("handle this later")
		}
	}
	var form = document.getElementById("up-form");
	form.addEventListener("submit", onSubmit);
</script>