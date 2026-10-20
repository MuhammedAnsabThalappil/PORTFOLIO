import { Plugin } from 'vite';

export function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const origin = `http://${req.headers.host || 'localhost:3000'}`;
        const parsedUrl = new URL(req.url, origin);
        const pathname = parsedUrl.pathname;

        // Collect body data
        let bodyData = '';
        if (req.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
          await new Promise<void>((resolve, reject) => {
            req.on('data', chunk => {
              bodyData += chunk.toString();
            });
            req.on('end', () => resolve());
            req.on('error', err => reject(err));
          });
        }

        // Build Web standard Request
        const standardReq = new Request(parsedUrl.toString(), {
          method: req.method,
          headers: req.headers as any,
          body: ['GET', 'HEAD'].includes(req.method || 'GET') ? undefined : bodyData || undefined,
        });

        // Cloudflare Pages context mock for local Vite dev
        const context = {
          request: standardReq,
          env: process.env,
          params: {},
          data: {},
          waitUntil: () => {},
          next: () => {},
        };

        try {
          let mod: any = null;

          if (pathname === '/api/auth/login') {
            mod = await server.ssrLoadModule('/functions/api/auth/login.ts');
          } else if (pathname === '/api/auth/verify') {
            mod = await server.ssrLoadModule('/functions/api/auth/verify.ts');
          } else if (pathname === '/api/auth/change-password') {
            mod = await server.ssrLoadModule('/functions/api/auth/change-password.ts');
          } else if (pathname === '/api/auth/logout') {
            mod = await server.ssrLoadModule('/functions/api/auth/logout.ts');
          } else if (pathname === '/api/contact') {
            mod = await server.ssrLoadModule('/functions/api/contact.ts');
          } else if (pathname === '/api/analytics') {
            mod = await server.ssrLoadModule('/functions/api/analytics.ts');
          } else if (pathname === '/api/admin/content') {
            mod = await server.ssrLoadModule('/functions/api/admin/content.ts');
          }

          const handler = mod?.onRequest || mod?.default;
          if (handler) {
            const response: Response = await handler(context);
            res.statusCode = response.status;
            response.headers.forEach((val, key) => {
              res.setHeader(key, val);
            });
            const text = await response.text();
            res.end(text);
            return;
          }

          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: `API route not found: ${pathname}` }));
        } catch (err: any) {
          console.error('Dev API execution error on ' + pathname + ':', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Server error processing request' }));
        }
      });
    },
  };
}
