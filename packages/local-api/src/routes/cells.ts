import { readFile, writeFile } from 'fs/promises';
import express, { Router } from 'express';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellRouter = (filename: string, dir: string): Router => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  router.use(express.json());
  
  router.get('/cells', async (req, res) => {
    try {
      const result = await readFile(fullPath, { encoding: 'utf8' });

      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf8');
        res.send([]);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[]; } = req.body;
    await writeFile(fullPath, JSON.stringify(cells), 'utf8');

    res.send({ status: 'ok' });
  });

  return router;
};