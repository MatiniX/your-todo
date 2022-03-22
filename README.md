# your-todo

Jednoduchá full-stack web aplikácia/hra slúžiaca len ako projekt na učenie/ukázanie.

## Hlavná myšlienka

V aplikácii **Your Todo** ide o vytváranie dobré známych tzv. _"Todo"_ úloh. Má to však jeden háčik. Tieto _"Todo"_ úlohy nevytvárate pre seba ale pre svojich priateľov, ktorý by ich následne mali splniť. Ak si ich aj splnia dostanú body dôverihodnosti (Trust pointy), ak nie, tak prídu o časť bodov. Cieľom je mať čo najviac _Trust pointov_ aby ste boli prvý v tabuľke.

### Tech-stack

Backend server: **NestJS**

Frontend aplikácia: **NextJS**

Databáza: **Postgres**

Aplikácia zo strany back-endu ešte používa **Redis** ako cache databázu, keďže autentifikácia je riešená cez cookie session.

### Funkcionalita

**Každý používateľ môže:**

- Vytvoriť úlohu a poslať ju kamarátovi
- Dostať úlohu od kamráta a následne ju označiť ako splnenú
- Potvrdiť či jeho kamrát naozaj splnil úlohu, ktorá m bola zadaná
- Poslať žiadosť o priateľstvo
- Potvrdiť/Odmietnúť žiadosť o priateľstvo
- Zrušiť priateľstvo
- Vidieť top 10 použivateľov podľa Trust pointov a zobraziť niektoré informácie o nich
- Vidieť rôzne detaily o svojich úlohách, priateľoch a o sebe

Taktiež je možné požiadať o resetovanie hesla a ak ste pri registrácii použili funkčnú emailovú adresu tak vám pride email s odkazom na reset hesla.

#### Zopár pravidiel ohľadom úloh:

- Úlohy môžte zadávať len svojím priateľom
- Každému svojmu priateľovi môžete poslať maximálne 1 úlohu denne

> Ak chcete vyskúšať plnú funkcionalitu aplikácie musíte vytvoriť aspoň 2 účty

#### Ako spustiť aplikáciu lokálne:

1. Treba mať nainštalovaný **NodeJS**
2. Naklonovať alebo stiahnúť tento kód.
3. V priečinku _server_ sa nachádza aj _docker-compose.yaml_ ak máte nainštalovaný Docker tak by malo do terminálu zadať `docker-compose up` a Docker vytvorí potrebné datábazy
4. Nastaviť enviromentálne premenné

**Enviromentálne premenné je potrebné nastaviť následovne:**

V priečinku _server_ vytvoriť .env súbor, ktorý by mal vyzerať asi takto:

```
DATABASE_URL=
REDIS_URL=
PORT=
SESSION_SECRET=
CORS_ORIGIN=
SMTP_PASS=
DOMAIN=
```

Samozrejme je nutné vyplniť tieto nastavenia podľa svojho prostredia. SMTP_PASS nie je nutné vypĺňať ak nebudete posielať reálne emaily.

Nakoniec je už len potrebné uistiť sa že, sa nachádzame v priečinku _server_ a v termináli spustiť príkaz `npm install` následne je možné spustiť príkaz `npm run start:dev`
ktorý spustí server v vývojovom móde.

Ešte je nutné nastaviť enviromentálne premenné pre frontend. Stačí v priečinku _web_ vytvoriť .env.local súbor a nastaviť v ňom premenné `NEXT_PUBLIC_API_URL` (nastaviť na adresu portu, na ktorom ste spustili dev server). A `VERCEL_ENV="development"` (toto možno ani netreba).

Následne sa uistíme že, sa nachádzame v priečinku _web_ a spustíme príkazy `npm install` a `npm run dev`.

> Reálne som to neskúšal ale teoreticky je toto všetko čo treba spraviť 😉

### Deployment:

Frontend aplikácie nájdete na https://your-todo-nine.vercel.app/

Backend beží na platforme **Heroku**

Funguje aj jednoduchý deployment process, keď stačí iba pushnúť novú/upravenú verziu aplikácie na main branch na GithHub a celá aplikácia sa automaticky redeployne.

### Poznámky autora:

Táto aplikácia slúžila hlavne ako projekt na učenie/ukázanie. Kód nie je bezchybný, čistý alebo najefektívnejší ani zďaleka. Išlo hlavne o to aby to celé nejako fungovalo. Niektoré komenty sú v slovenčine niektoré v angličtine podľa toho akú som mal pri ich písaní náladu alebo sú to komenty z dokumentácie.

#### Známe chyby:

Toto je zoznám chýb a možných nedokonalostí o ktorých viem len nemám motiváciu sa im venovať:

1. Error handling keď API je z nejakého dôvodu nedostupná alebo nefunguje.
2. Na stránke kde sa zobrazujú úlohy, ktoré máte splniť. Sú úlohy zoradené podľa UTC času vytvorenia nie lokálneho. (je možné, že ak úlohu zadáte medzi 00:00 a 01:00 tak sa bude ešte rátať do predošleho dňa)
3. Žiadne testy
4. Zopár _hackov_, ktoré sú ale okomentované

> **Načo to teda celé bolo?**
> Krátka odpoveď je: _"No na nič!"_
> Ale nie naozaj, teraz trochu vážnejšie. Išlo o pokus vybudovať full-stack webovú aplikáciu za pomoci vlastných vedomostí (aj internetu) bez sledovania nejakého krok-za-krokom
> tutoriálu alebo kurzu. Celý nápad, návrh a následné zvolenie technológii a prevedenie výchádzalo z mojich prefernecií (to však nevylučuje, že už existuje podobná alebo takmer
> identická aplikácia, radšej som to ani nezisťoval). Budem rád ak mi tento projektík pomôže pri získaní nejakej tej _entry-level_ pozície do sveta IT. Ak nie, tak stavba čaká
> veď tie drevostavby a strechy sa predsa sami nepostavia 🏚👷‍♂️

> **Prečo na projekte neplánujem ďalej pracovať?**
> Jednoducho ako som už spomenul je to projekt na učenie/úkázanie. Čo sa týka ceny vývoja tak tá je len čisto môj čas investovaný do projektu. Absolútne som nemal zámer míňať
> akékoľvek peniaze na tento projekt. Preto nemá vlastnú doménu a je hostovaný na Heroku, ktorý poskytuje free-tier. Možno bude ešte pár malých úprav do budúcna ale išlo hlavne
> o to aby som sa naučil na vlastných chybách.
