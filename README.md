# Hytteboka

Booking av firmahytta, med trekning om ukene alle vil ha.

Dette er første utgave, slik Claude Code bygget den fra én melding fra en oppdiktet kunde. I Miles-kurset «Agentisk koding» er det her du begynner: du tar over prosjektet, og kunden kommer tilbake med mer.

Hvordan det gikk da vi prøvde selv, står på grenen `main`, med én commit for hver ting hun ber om. Vent med å se der til du har prøvd.

## Hent den

```
git clone --branch start --single-branch https://github.com/miles-no/agentisk-koding-hytteboka hytteboka
cd hytteboka
```

## Oppdraget

> Hei! Jeg er Ragnhild, kontorsjef i Havbris AS. Vi er førti ansatte og har en firmahytte på fjellet. I dag styrer jeg utlånet i et regneark, og det går ikke lenger. Folk dobbeltbooker, og hver vinter blir det bråk om hvem som får påsken.
>
> Jeg trenger en enkel nettside der de ansatte kan se når hytta er ledig, og booke en uke. De ukene alle vil ha, som påsken og vinterferien, skal det trekkes lodd om: alle som vil ha uka, melder seg på, og så trekker jeg en vinner mens hele kontoret ser på. Det må gjerne være litt stas rundt trekningen.
>
> Kan du ha noe å vise meg i dag?

Rammene var at den skal kjøre på egen maskin med én kommando, uten sky og uten innlogging.

## Kjør den

```
npm start
```

Åpne så http://localhost:44210. Den trenger Node.js 20 eller nyere, og har ingen avhengigheter. Den er laget med Node.js 24, og testene går også på 20 og 22.

Testene kjører du med `npm test`.

## Hva den ikke er

Den er ikke ment for ekte bruk. Det er ingen innlogging, så alle kan skrive hvilket som helst navn, og alt ligger i én fil på maskinen. Det som ble antatt på kundens vegne, står i [ANTAKELSER.md](ANTAKELSER.md).
