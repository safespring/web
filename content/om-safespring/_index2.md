---
title: "Självklart producerar vi våra tjänster lokalt"
date: 2019-01-07T13:58:58+01:00
draft: false
intro: "Safespring är en svensk molnplattform. Med datacenter i Sverige håller du din data inom landets gränser."
background: "safespring-blue-fade2.svg"
alias:
  "/om-safespring"
---

{{< ingress >}} 
Vi på Safespring tycker det är självklart att producera våra tjänster lokalt i Sverige och Norge. 
{{< /ingress >}}

Detta har många fördelar, såsom bättre prestanda och närhet till våra kunder. Dessutom uppfyller vi lagar och regler såsom GDPR och Arkivlagen som kräver att data inte lämnar landet.

<main>
  <ul id="cards">
    <li class="card" id="card_1">
      <div class="card__content">
        <div>
          <h2>Card One</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-1.jpg" alt="Image description">
        </figure>
      </div>
    </li>
    <li class="card" id="card_2">
      <div class="card__content">
        <div>
          <h2>Card Two</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-2.jpg" alt="Image description">
        </figure>
      </div>
    </li>
    <li class="card" id="card_3">
      <div class="card__content">
        <div>
          <h2>Card Three</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-3.jpg" alt="Image description">
        </figure>
      </div>
    </li>
    <li class="card" id="card_4">
      <div class="card__content">
        <div>
          <h2>Card Four</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-2.jpg" alt="Image description">
        </figure>
      </div>
    </li>
  </ul>
</main>
<style>
:root {
  --card-height: 40vw;
  --card-margin: 4vw;
  --card-top-offset: 1em;
  --numcards: 4;
  --outline-width: 0px;
}

#cards {
  padding-bottom: calc(var(--numcards) * var(--card-top-offset)); /* Make place at bottom, as items will slide to that position*/
  margin-bottom: var(--card-margin); /* Don't include the --card-margin in padding, as that will affect the scroll-timeline*/
}

#card_1 {
  --index: 1;
}

#card_2 {
  --index: 2;
}

#card_3 {
  --index: 3;
}

#card_4 {
  --index: 4;
}

.card {
  position: sticky;
  top: 0;
  padding-top: calc(var(--index) * var(--card-top-offset));
}

@supports (animation-timeline: works) {

  @scroll-timeline cards-element-scrolls-in-body {
    source: selector(body);
    scroll-offsets:
      /* Start when the start edge touches the top of the scrollport */
      selector(#cards) start 1,
      /* End when the start edge touches the start of the scrollport */
      selector(#cards) start 0
    ;
    start: selector(#cards) start 1; /* Start when the start edge touches the top of the scrollport */
    end: selector(#cards) start 0; /* End when the start edge touches the start of the scrollport */
    time-range: 4s;
  }

  .card {
    --index0: calc(var(--index) - 1); /* 0-based index */
    --reverse-index: calc(var(--numcards) - var(--index0)); /* reverse index */
    --reverse-index0: calc(var(--reverse-index) - 1); /* 0-based reverse index */
  }
  
  .card__content {
    transform-origin: 50% 0%;
    will-change: transform;

    --duration: calc(var(--reverse-index0) * 1s);
    --delay: calc(var(--index0) * 1s);

    animation: var(--duration) linear scale var(--delay) forwards;
    animation-timeline: cards-element-scrolls-in-body;
  }

  @keyframes scale {
    to {
      transform:
        scale(calc(
          1.1
          -
          calc(0.1 * var(--reverse-index))
        ));
    }
  }
}

#cards {
  list-style: none;
  outline: calc(var(--outline-width) * 10) solid blue;
  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(var(--numcards), var(--card-height));
  gap: var(--card-margin);
}

.card {
  outline: var(--outline-width) solid hotpink;
}

.card__content {
  box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.1), 0 1em 2em rgba(0, 0, 0, 0.1);
  background: rgb(255, 255, 255);
  color: rgb(10, 5, 7);
  border-radius: 1em;
  overflow: hidden;

  display: grid;
  grid-template-areas: "text img";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  align-items: stretch;
  outline: var(--outline-width) solid lime;
}

.card__content > div {
  grid-area: text;
  width: 80%;
  place-self: center;
  text-align: left;

  display: grid;
  gap: 1em;
  place-items: start;
}

.card__content > figure {
  grid-area: img;
  overflow: hidden;
}

.card__content > figure > img, .card__content > figure > picture > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

### Lokalt producerade molntjänster med hög säkerhet

Som svenskt bolag omfattas vi inte av Cloud Act och kan därför inte tvingas att lämna ut din data till tredje part. Vi erbjuder bl.a. backup, storskalig molnlagring och infrastruktur som tjänst och har idag kunder inom samtliga universitet, högskolor och andra utbildnings- och forskningsmiljöer som är anslutna till SUNET och Sikt.

Utöver dessa kunder har vi även kunder inom Telecom, Medtech och Edtech som värdesätter våra lokalt producerade tjänster med hög säkerhet. Vi kan även hjälpa dig i din molnresa och prata med dig om möjligheterna med privata- eller hybrida moln, containers, DevOps osv.

Vi tror att de bästa relationerna skapas med öppenhet och därför har våra tjänster inga bindningstider. Vi baserar de flesta av våra tjänster på Open Source och föredrar att göra implementationer genom att använda öppna standarder så långt det är möjligt. Vi tror också att många kunder mår bra av att ha ett par alternativa leverantörer, så vi pratar gärna med dig även om du redan har en befintlig leverantör. Kanske kan vi lösa vissa delar bättre eller vara en bra backup.

Safespring grundades 2014 som en del av IPnett och vann en upphandling för att leverera infrastruktur som tjänst till den akademiska sektorn i Skandinavien. Kompetensen bakom vår lösning samt vår strategi att basera den på öppen källkod gjorde att vi vann utvärderingen ur både ett tekniskt och kommersiellt perspektiv. Vi har full kontroll över vår egen teknik och erbjuder idag tjänster till samtliga universitet, högskolor och andra utbildnings- och forskningsmiljöer i Skandinav

## Utforska våra tjänster
Som svenskt bolag omfattas vi inte av Cloud Act och kan därför inte tvingas att lämna ut din data till tredje part. Vi erbjuder bland annat backup, storskalig molnlagring och infrastruktur som tjänst.


{{< distance >}}

{{< services >}}