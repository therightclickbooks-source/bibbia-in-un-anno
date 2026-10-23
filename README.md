# Bibbia in un anno

Una lettura al giorno per leggere tutta la Bibbia in 365 giorni, circa 10 minuti al giorno.
Prima del testo due righe per orientarsi, dopo uno spunto per la vita di oggi e un gesto concreto.

**Apri l’app:** https://therightclickbooks-source.github.io/bibbia-in-un-anno/

## Installarla sul telefono

- **Android (Chrome):** apri il link → menu ⋮ → **Installa app** (oppure *Aggiungi a schermata Home*).
  Anche dentro l’app, in *Opzioni*, c’è il pulsante **Installa l’app**.
- **iPhone (Safari):** apri il link → pulsante Condividi → **Aggiungi alla schermata Home**.

Dopo la prima apertura tutta la Bibbia resta sul telefono: si legge anche senza connessione.

## Cosa fa

- **Oggi:** la lettura del giorno, “In breve”, il testo, “Oggi”, “Per vivere meglio”, il versetto da portare con te, le tue note.
- **Piano:** le 365 letture, alternando Antico e Nuovo Testamento, Salmi e Proverbi.
- **Bibbia:** tutti i libri e la ricerca in tutto il testo.
- **Evidenziati:** tocca un versetto (o tieni premuto e trascina per una sola frase), scegli un colore e scrivi un commento.
  Nel taccuino trovi ogni frase con libro, capitolo e versetto; puoi cercarle, filtrarle e scaricarle in un file di testo.
- **Opzioni:** grandezza del testo, colori (chiaro, seppia, notte), backup e ripristino.

## I tuoi dati

Progressi, note ed evidenziati restano **solo sul telefono** (memoria del browser): nessun account, nessun server.
Per cambiare telefono: *Opzioni → Copia backup* sul vecchio, *Ripristina da backup* sul nuovo.

## Il testo

Bibbia Riveduta di Giovanni Luzzi (1927), di pubblico dominio, integrale (31.102 versetti), da due fonti libere
([eBible.org](https://ebible.org/find/details.php?id=ita1927) e [open-bibles](https://github.com/seven1m/open-bibles))
confrontate versetto per versetto. Le sezioni «In breve», «Oggi» e «Per vivere meglio» sono riflessioni aggiunte all’app:
non fanno parte della Bibbia.

## Struttura

```
index.html             l'app (HTML, CSS e JavaScript in un solo file, nessuna dipendenza)
sw.js                  copia offline di tutta l'app e del testo
manifest.webmanifest   nome, colori e icone per l'installazione
data/libri/*.json      il testo, un file per libro
data/piano.json        le 365 letture
data/riflessioni.json  le riflessioni di ogni giorno
icone/                 icone dell'app
```
