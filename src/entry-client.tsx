import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeSetup } from './app/store';
import { RootState } from './app/store';
import App from './App';

type CustomWindowInstanse = Window &
  typeof globalThis & {
    __PRELOADED_STATE__?: RootState;
  };

hydrate();

async function hydrate() {
  const store = storeSetup((window as CustomWindowInstanse).__PRELOADED_STATE__);

  delete (window as CustomWindowInstanse).__PRELOADED_STATE__;

  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
