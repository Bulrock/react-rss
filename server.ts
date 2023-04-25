import express from 'express';
import { createServer as createViteServer } from 'vite';

const PORT = 8000;
async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');
    const pipe = await render(url, {
      bootstrapModule: ['./src/entry-client.tsx'],
      onAllReady() {
        pipe(res);
      },
      onError(error: Error) {
        console.error(error);
      },
    });
  });
  app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
}

createServer();
