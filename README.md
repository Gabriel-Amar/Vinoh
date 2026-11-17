# WhatWine

Applicazione web full-stack per esplorare una lista infinita di vini reali, scoprire gli abbinamenti gastronomici di ogni bottiglia, trovare il vino ideale partendo dal piatto (**Cibo → Vino**), gestire **La Mia Cantina** e comporre un **Percorso Cena** multi-portata.

## Funzionalità principali
- **Catalogo Infinito Live**: scorrimento infinito collegato alle API live (Vivino Explore + indice di ricerca SampleAPIs con fallback automatico) e filtri per tipologia, paese, valutazione, fascia di prezzo e abbinamento rapido.
- **Scheda Sommelier (Vino → Cibo)**: pannello laterale con abbinamenti gastronomici, motivazione enologica, profilo organolettico (corpo, acidità, tannini, dolcezza), note aromatiche, temperatura di servizio, calice e decantazione.
- **Ricerca Inversa (Cibo → Vino)**: ricerca libera di piatti italiani e internazionali (es. *carne*, *pasta al ragù*, *carbonara*, *spaghetti alle vongole*, *tartufo*) con modificatori di cottura e punteggio di affinità.
- **La Mia Cantina**: salvataggio preferiti, conteggio bottiglie, valutazioni e note personali con export/import JSON.
- **Confronto Bottiglie**: comparazione affiancata fino a 3 vini.
- **Percorso Cena**: generazione di una carta dei vini coordinata dall'antipasto al dolce.

## Avvio locale

```bash
npm install
npm run dev
```

- Frontend Vite: `http://localhost:5173`
- Backend API Express: `http://localhost:3001`

### Build di produzione

```bash
npm run build
npm start
```
