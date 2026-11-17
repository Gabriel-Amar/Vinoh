import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FOOD_CATALOG, COOKING_MODIFIERS } from './pairingEngine.mjs';
import { queryWines, reverseFoodSearch, buildDinnerFlight, getWineById, warmCatalog } from './wineService.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'WhatWine API' });
});

app.get('/api/meta', (_req, res) => {
  res.json({
    foods: FOOD_CATALOG.map(({ id, slug, label, category, dishes }) => ({
      id,
      slug,
      label,
      category,
      dishes,
    })),
    modifiers: Object.values(COOKING_MODIFIERS).map(({ id, label, note }) => ({
      id,
      label,
      note,
    })),
    countries: [
      { code: 'it', label: 'Italia' },
      { code: 'fr', label: 'Francia' },
      { code: 'es', label: 'Spagna' },
      { code: 'us', label: 'Stati Uniti' },
      { code: 'pt', label: 'Portogallo' },
      { code: 'ar', label: 'Argentina' },
      { code: 'cl', label: 'Cile' },
      { code: 'de', label: 'Germania' },
      { code: 'au', label: 'Australia' },
      { code: 'nz', label: 'Nuova Zelanda' },
    ],
    types: [
      { id: 'red', typeId: 1, label: 'Rosso' },
      { id: 'white', typeId: 2, label: 'Bianco' },
      { id: 'sparkling', typeId: 3, label: 'Bollicine' },
      { id: 'rose', typeId: 4, label: 'Rosato' },
      { id: 'dessert', typeId: 7, label: 'Dolce & Passito' },
      { id: 'port', typeId: 24, label: 'Porto & Fortificato' },
    ],
  });
});

app.get('/api/wines', async (req, res) => {
  try {
    const parseList = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);
    const result = await queryWines({
      page: req.query.page || 1,
      q: req.query.q || '',
      typeIds: parseList(req.query.type),
      foodIds: parseList(req.query.foodId),
      countryCodes: parseList(req.query.country),
      minRating: req.query.minRating || 1,
      priceMin: req.query.priceMin || null,
      priceMax: req.query.priceMax || null,
      orderBy: req.query.orderBy || 'ratings_count',
      order: req.query.order || 'desc',
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Impossibile recuperare i vini al momento.', detail: err.message });
  }
});

app.get('/api/wines/:id', (req, res) => {
  const wine = getWineById(req.params.id);
  if (!wine) {
    return res.status(404).json({ error: 'Vino non trovato' });
  }
  return res.json(wine);
});

app.get('/api/pairings/search', async (req, res) => {
  try {
    const parseList = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);
    const result = await reverseFoodSearch({
      dish: req.query.dish || '',
      foodId: req.query.foodId || null,
      modifier: req.query.modifier || '',
      page: req.query.page || 1,
      priceMax: req.query.priceMax || null,
      countryCodes: parseList(req.query.country),
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella ricerca abbinamenti.', detail: err.message });
  }
});

app.post('/api/menu-pairing', async (req, res) => {
  try {
    const courses = Array.isArray(req.body?.courses) ? req.body.courses : [];
    const flight = await buildDinnerFlight(courses);
    res.json({ flight });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella creazione del percorso degustazione.', detail: err.message });
  }
});

// Serve production build if present
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('/{*path}', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WhatWine] API Server listening on http://127.0.0.1:${PORT}`);
  warmCatalog().catch(() => {});
});
