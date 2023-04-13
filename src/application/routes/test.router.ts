import { Router, Request, Response } from 'express';

const router = Router();
const slug = '/test';

router.get('/', (req: Request, res: Response) => {
  res.send('Test route');
});

export { router, slug };
