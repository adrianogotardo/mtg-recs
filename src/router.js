import { Router } from 'express';
import { generateRecs } from './generateRecs.js';

const router = Router();

router.get(`/generate-recs/:commanderName`, generateRecs);

export default router;