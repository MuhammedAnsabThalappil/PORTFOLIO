import { Plugin } from 'vite';
import url from 'url';

export function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname || '';

        // Helper response methods for Express/Vercel compatibility
        (res as any).status = function (code: number) {
          this.statusCode = code;
          return this;
        };

        (res as any).json = function (data: any) {
          this.setHeader('Content-Type', 'application/json');
          this.end(JSON.stringify(data));
        };

        (req as any).query = parsedUrl.query;

        // Collect body for POST/PUT
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          let bodyData = '';
          req.on('data', chunk => {
            bodyData += chunk.toString();
          });

          await new Promise<void>(resolve => {
            req.on('end', () => {
              try {
                (req as any).body = bodyData ? JSON.parse(bodyData) : {};
              } catch {
                (req as any).body = bodyData;
              }
              resolve();
            });
          });
        }

        try {
          let handler: any = null;

          if (pathname === '/api/auth/login') {
            handler = (await server.ssrLoadModule('/api/auth/login.ts')).default;
          } else if (pathname === '/api/auth/verify') {
            handler = (await server.ssrLoadModule('/api/auth/verify.ts')).default;
          } else if (pathname === '/api/auth/change-password') {
            handler = (await server.ssrLoadModule('/api/auth/change-password.ts')).default;
          } else if (pathname === '/api/auth/logout') {
            handler = (await server.ssrLoadModule('/api/auth/logout.ts')).default;
          } else if (pathname === '/api/contact') {
            handler = (await server.ssrLoadModule('/api/contact.ts')).default;
          } else if (pathname === '/api/analytics') {
            handler = (await server.ssrLoadModule('/api/analytics.ts')).default;
          } else if (pathname === '/api/admin/content') {
            handler = (await server.ssrLoadModule('/api/admin/content.ts')).default;
          }

          if (handler) {
            await handler(req, res);
            return;
          }

          res.statusCode = 404;
          (res as any).json({ error: 'Dev API endpoint not found: ' + pathname });
        } catch (err: any) {
          console.error('Error executing dev API handler:', err);
          res.statusCode = 500;
          (res as any).json({ error: 'Dev API execution error: ' + err.message });
        }
      });
    },
  };
}
