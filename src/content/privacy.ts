import type { Locale } from "@/i18n/config";

type Block = { heading: string; body: string[] };
type PrivacyDoc = { title: string; updated: string; intro: string; blocks: Block[] };

/**
 * Describes only what the site actually does. No cookie-consent language, no
 * analytics clauses, no third-party processors — because none of those exist
 * yet. When the contact form is wired up or analytics is added, this document
 * gets updated in the same commit.
 *
 * This is a plainly written document, not legal advice; it should be reviewed
 * by a professional before launch.
 */
const en: PrivacyDoc = {
  title: "Privacy Policy",
  updated: "Last updated: 8 August 2026",
  intro:
    "This site collects as little as possible. Below is exactly what happens to any information it touches — nothing is described here that the site does not actually do.",
  blocks: [
    {
      heading: "What is stored on your device",
      body: [
        "Two preferences are saved locally so the site behaves the way you left it: your chosen language and your chosen colour theme.",
        "They are stored in a cookie on your own device, are read only by this site, and are never sent anywhere or linked to you as a person. Clearing your browser data removes them.",
      ],
    },
    {
      heading: "Analytics and tracking",
      body: [
        "There are none. No analytics service, no advertising pixels, no third-party trackers, no profiling and no cross-site identifiers.",
        "Because the only stored data is a functional preference you set yourself, no cookie consent banner is required.",
      ],
    },
    {
      heading: "The contact form",
      body: [
        "The enquiry form is not connected to any backend yet, so nothing you type into it is transmitted or stored anywhere. It is marked as such on the page.",
        "Once it is live, it will send only what you enter — your name, the contact detail you provide, the service you select and anything you write in the message — directly to me, for the sole purpose of replying to your enquiry. This document will be updated at the same time.",
      ],
    },
    {
      heading: "If you contact me directly",
      body: [
        "Email, phone and WhatsApp messages are kept only as long as needed to handle the conversation and any work that follows from it. They are not added to a mailing list and are not shared with anyone.",
      ],
    },
    {
      heading: "Hosting",
      body: [
        "The site is hosted on Vercel, which processes standard server request data such as IP address and browser type in order to deliver the pages. This is a technical necessity of serving any website and is not used by me for analytics or profiling.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the GDPR you may request access to any personal data held about you, ask for it to be corrected or deleted, or object to its processing.",
        "In practice, the only personal data I hold is what you have sent me directly. Write to me and it will be handled.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If the site starts doing something new — analytics, a live form, an integration — this page is updated in the same release, not afterwards.",
      ],
    },
  ],
};

const sk: PrivacyDoc = {
  title: "Ochrana osobných údajov",
  updated: "Naposledy aktualizované: 8. augusta 2026",
  intro:
    "Tento web zbiera čo najmenej. Nižšie je presne to, čo sa deje s informáciami, ktorých sa dotkne — nie je tu opísané nič, čo web v skutočnosti nerobí.",
  blocks: [
    {
      heading: "Čo sa ukladá vo vašom zariadení",
      body: [
        "Lokálne sa ukladajú dve nastavenia, aby sa web správal tak, ako ste ho opustili: zvolený jazyk a zvolená farebná téma.",
        "Sú uložené v cookie priamo vo vašom zariadení, číta ich len tento web, nikam sa neodosielajú a nie sú spojené s vašou osobou. Vymazaním údajov prehliadača zmiznú.",
      ],
    },
    {
      heading: "Analytika a sledovanie",
      body: [
        "Žiadne nie sú. Žiadna analytická služba, žiadne reklamné pixely, žiadne sledovače tretích strán, žiadne profilovanie ani identifikátory naprieč webmi.",
        "Keďže jediné uložené údaje sú funkčné nastavenie, ktoré ste si zvolili sami, súhlas s cookies nie je potrebný.",
      ],
    },
    {
      heading: "Kontaktný formulár",
      body: [
        "Formulár zatiaľ nie je pripojený k žiadnemu serveru, takže nič, čo doň napíšete, sa neodosiela ani neukladá. Priamo na stránke je to takto označené.",
        "Keď bude spustený, odošle len to, čo vyplníte — meno, kontakt, ktorý uvediete, zvolenú službu a text správy — priamo mne, výlučne na účel odpovede na váš dopyt. Tento dokument bude v rovnakom čase aktualizovaný.",
      ],
    },
    {
      heading: "Ak ma kontaktujete priamo",
      body: [
        "E-maily, telefonáty a správy cez WhatsApp uchovávam len tak dlho, ako je potrebné na vybavenie konverzácie a prípadnej práce, ktorá z nej vyplynie. Nepridávam ich do žiadnej databázy na rozosielanie a nezdieľam ich s nikým.",
      ],
    },
    {
      heading: "Hosting",
      body: [
        "Web je hosťovaný na platforme Vercel, ktorá na doručenie stránok spracúva bežné údaje o požiadavke, ako IP adresa a typ prehliadača. Je to technická nevyhnutnosť prevádzky akéhokoľvek webu a nevyužívam ju na analytiku ani profilovanie.",
      ],
    },
    {
      heading: "Vaše práva",
      body: [
        "Podľa GDPR môžete požiadať o prístup k osobným údajom, ktoré o vás mám, o ich opravu alebo vymazanie, prípadne namietať proti ich spracúvaniu.",
        "V praxi jediné osobné údaje, ktoré mám, sú tie, ktoré ste mi poslali priamo. Napíšte mi a vybavím to.",
      ],
    },
    {
      heading: "Zmeny",
      body: [
        "Ak web začne robiť niečo nové — analytiku, funkčný formulár, integráciu — táto stránka sa aktualizuje v tom istom vydaní, nie dodatočne.",
      ],
    },
  ],
};

export const privacy: Record<Locale, PrivacyDoc> = { en, sk };
