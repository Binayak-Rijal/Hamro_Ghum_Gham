import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

async function loadPackages() {
  const file = path.resolve('./data/packages.json');
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw);
}

function matchesQuery(pkg, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (pkg.name && pkg.name.toLowerCase().includes(s)) ||
         (pkg.location && pkg.location.toLowerCase().includes(s)) ||
         (pkg.description && pkg.description.toLowerCase().includes(s));
}

function matchesCategory(pkg, category) {
  if (!category || category === 'all') return true;
  return pkg.category === category;
}

function matchesDates(pkg, start, end) {
  if (!start && !end) return true;
  try {
    const availFrom = pkg.availableFrom ? new Date(pkg.availableFrom) : null;
    const availTo = pkg.availableTo ? new Date(pkg.availableTo) : null;
    if (start) {
      const s = new Date(start);
      if (availFrom && s < availFrom) return false;
    }
    if (end) {
      const e = new Date(end);
      if (availTo && e > availTo) return false;
    }
    return true;
  } catch (err) {
    return true;
  }
}

function matchesGuests(pkg, guests) {
  if (!guests) return true;
  return pkg.maxGuests == null ? true : pkg.maxGuests >= Number(guests);
}

// GET /api/search
// GET /api/tours
router.get(['/search', '/tours'], async (req, res) => {
  try {
    const { q, category, start, end, guests } = req.query;
    const packages = await loadPackages();

    const filtered = packages.filter(pkg => {
      return matchesQuery(pkg, q) &&
             matchesCategory(pkg, category) &&
             matchesDates(pkg, start, end) &&
             matchesGuests(pkg, guests);
    });

    res.json({ success: true, packages: filtered });
  } catch (error) {
    console.error('Error in search route:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
