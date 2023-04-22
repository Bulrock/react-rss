import { RootState } from './../app/store';
import { ReactNode } from 'react';

interface IHtmlProps {
  children: ReactNode;
  preloadedState: RootState;
}

function Html({ children, preloadedState }: IHtmlProps) {
  const refresh = `
     import RefreshRuntime from 'http://localhost:8000/@react-refresh'
     RefreshRuntime.injectIntoGlobalHook(window)
     window.$RefreshReg$ = () => {}
     window.$RefreshSig$ = () => (type) => type
     window.__vite_plugin_react_preamble_installed__ = true
   `;
  const preload = `
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
  `;
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./src/App.css"></link>
        <title>My App</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="module" dangerouslySetInnerHTML={{ __html: refresh }} />
        <script dangerouslySetInnerHTML={{ __html: preload }}></script>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  );
}

export default Html;
