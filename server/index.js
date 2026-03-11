import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import jwt from 'jsonwebtoken';
import { ensureAdmin, verifyAdmin, getConfig, saveConfig, getLeads, createLead, updateLeadStatus, deleteLead } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const JWT_SECRET = process.env.JWT_SECRET || 'expressit-jwt-secret-change-in-production';
const PORT = process.env.PORT || 3001;
const DIST_PATH = join(__dirname, '..', 'dist');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Требуется авторизация' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Недействительный токен' });
  }
}

app.post('/api/auth/login', async (req, res) => {
  try {
    const { password } = req.body || {};
    if (!password) return res.status(400).json({ error: 'Укажите пароль' });
    const ok = await verifyAdmin(password);
    if (!ok) return res.status(401).json({ error: 'Неверный пароль' });
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

app.get('/api/config', async (req, res) => {
  try {
    const data = await getConfig();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка чтения конфига' });
  }
});

app.put('/api/config', authMiddleware, async (req, res) => {
  try {
    await saveConfig(req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сохранения' });
  }
});

app.get('/api/leads', authMiddleware, async (req, res) => {
  try {
    const leads = await getLeads();
    res.json(leads);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка получения заявок' });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const lead = await createLead(req.body);
    res.status(201).json(lead);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка создания заявки' });
  }
});

app.put('/api/leads/:id/status', authMiddleware, async (req, res) => {
  try {
    await updateLeadStatus(req.params.id, req.body.status);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка обновления' });
  }
});

app.delete('/api/leads/:id', authMiddleware, async (req, res) => {
  try {
    await deleteLead(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
});

const isProduction = existsSync(DIST_PATH);
if (isProduction) {
  app.use(express.static(DIST_PATH));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(join(DIST_PATH, 'index.html'));
    }
  });
}

function startServer(port = PORT) {
  if (port > PORT + 10) {
    console.error('No free port found. Stop other processes using ports', PORT, '-', PORT + 10);
    process.exit(1);
  }
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    if (!isProduction) console.log('API: /api/auth/login, /api/config, /api/leads');
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

ensureAdmin()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.error('Failed to init DB:', err);
    process.exit(1);
  });
