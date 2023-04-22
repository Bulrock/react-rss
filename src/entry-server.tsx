import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import { charactersAPI } from './features/ApiSlice';
import Html from './components/Html';
import { storeSetup } from './app/store';
// import { characters } from './data/Characters';
// import { characters } from './data/Characters';

const store = storeSetup({});

export async function render(url: string, opts?: RenderToPipeableStreamOptions) {
  // const INITIAL_SSR_SEARCH = '';
  // const store = storeSetup({ search: { value: INITIAL_SSR_SEARCH } });
  // store.dispatch(charactersAPI.util.prefetch('getCharacters', INITIAL_SSR_SEARCH, {}));

  await store.dispatch(charactersAPI.endpoints.getCharacters.initiate(''));
  // .then(() => {
  //   storeSetup({
  //     characters: {
  //       status: 200,
  //       searchResults: store.getState().charactersAPI.queries['getCharacters("")']?.data,
  //     },
  //   });
  //   // console.log(data.data?.results);
  // })
  // .then(() =>
  //   console.log(store.getState().charactersAPI.queries['getCharacters("")']?.data.results)
  // );

  // await Promise.all(store.dispatch(charactersAPI.util.getRunningQueriesThunk()));
  const preloadedState = store.getState();

  // console.log(store.getState());

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
