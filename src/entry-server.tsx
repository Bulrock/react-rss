import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import { charactersAPI } from './features/ApiSlice';
import Html from './components/Html';
import { storeSetup } from './app/store';

const store = storeSetup({});

export async function render(url: string, opts?: RenderToPipeableStreamOptions) {
  await store.dispatch(charactersAPI.endpoints.getCharacters.initiate(''));
  const preloadedState = store.getState();

  const { pipe } = renderToPipeableStream(
    <Html preloadedState={preloadedState}>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </Html>,
    opts
  );

  return pipe;
}
