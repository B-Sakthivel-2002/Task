import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import printer from 'printer';
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });
  // Route to handle printing request
  server.get('/print', (req: any, res: any) => {
    alert("sercalled");
    const printableContent = generatePrintableContent(); // Generate or fetch printable content
    sendToPrinter(printableContent); // Send content to printer
    res.json({ success: true }); // Respond with JSON indicating success
  });


  return server;
}



function generatePrintableContent(): string {
  // Function to generate or fetch printable content
  return '<html><head><title>Printable Page</title></head><body><h1>Hello, this is a printable page</h1></body></html>';
}

function sendToPrinter(content: string): void {
  // Function to send content to printer
  printer.printDirect({
    data: content,
    type: 'RAW',
    printer: 'HP LaserJet Pro MFP M127-M128 PCLmS', // Specify your printer name here
    success: function(jobId) {
      console.log('Printed with ID: ' + jobId);
    },
    error: function(err) {
      console.error('Error printing: ', err);
    }
  });
}





function run(): void {
  // const port = process.env['PORT'] || 4000;
   const port=4000;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
