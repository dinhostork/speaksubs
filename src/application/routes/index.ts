import { Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

const mainRouter = Router();
const routesPath = path.join(__dirname);

readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.router.ts')) {
    const { router: subRouter, slug } = require(`./${file}`);
    mainRouter.use(slug, subRouter);
    console.log(`Route ${slug} loaded`);
  }
});

export default mainRouter;
