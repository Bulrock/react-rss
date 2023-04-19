import express from 'express';
import fsp from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

function resolve(p: string) {
  return path.resolve(__dirname, p);
}

async function createServer() {
  const app = express();
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: ViteDevServer;

  if (!isProduction) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(express.static(resolve('dist/client')));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render: (
        request: express.Request,
        options: RenderToPipeableStreamOptions
      ) => Promise<PipeableStream>;

      if (!isProduction) {
        template = await fsp.readFile(resolve('index.html'), 'utf8');
        template = await vite.transformIndexHtml(url, template);
        render = await vite.ssrLoadModule('src/entry-server.tsx').then((m) => m.render);
      } else {
        template = await fsp.readFile(resolve('dist/client/index.html'), 'utf8');
        render = (await import('./dist/server/entry-server.tsx'!)).render;
      }

      const parts = template.split('<!--app-->');
      try {
        res.write(parts[0]);
        const stream = await render(req, {
          onShellReady() {
            stream.pipe(res);
          },
          onAllReady() {
            res.write(parts[1]);
            res.end();
          },
        });
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get('Location')!);
        }
        throw e;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (!isProduction) {
          vite.ssrFixStacktrace(error);
        }

        console.log(error.stack);
        res.status(500).end(error.stack);

        return;
      }

      console.log(error);
    }
  });

  return app;
}

createServer().then((app) => {
  app.listen(3000, () => {
    console.log('Server is running at: http://localhost:3000');
  });
});
