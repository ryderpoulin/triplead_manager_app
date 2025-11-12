import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger, type LogLevel } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";

const viteConfig = {
  root: process.cwd(),
  logLevel: "info" as LogLevel,
};

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Serve the production build of the client (client/dist)
 */
export function serveStatic(app: Express) {
  const distPath = path.join(process.cwd(), "client", "dist");
  const indexHtml = path.join(distPath, "index.html");

  if (!fs.existsSync(indexHtml)) {
    console.log(
      `⚠️  No client build found at ${indexHtml}. ` +
      `Run "npm run build:client" or let Render build it automatically.`
    );
    return;
  }

  // Serve static assets
  app.use(express.static(distPath));

  // Single-page app fallback
  app.get("*", (_req, res) => {
    res.sendFile(indexHtml);
  });

  log(`Serving static client from ${distPath}`);
}

