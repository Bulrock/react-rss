import { rest } from 'msw';

const mockCharacterResult = {
  error: 'There is nothing here',
};

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    const name = req.url.searchParams.get('name');
    const id = req.url.pathname.split('/').slice(3).join();
    if (name === 'qwert') {
      return res(ctx.status(404));
    } else if (name === 'kyl') {
      return res(
        ctx.status(200),
        ctx.json({
          info: {
            count: 1,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            {
              id: 197,
              name: 'Kyle',
              status: 'Dead',
              species: 'Humanoid',
              type: 'Miniverse inhabitant',
              gender: 'Male',
              origin: {
                name: "Zeep Xanflorp's Miniverse",
                url: 'https://rickandmortyapi.com/api/location/49',
              },
              location: {
                name: "Kyle's Teenyverse",
                url: 'https://rickandmortyapi.com/api/location/50',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/17'],
              url: 'https://rickandmortyapi.com/api/character/197',
              created: '2017-12-30T12:39:09.025Z',
            },
          ],
        })
      );
    } else if (name === 'reject') {
      return res(
        ctx.status(200),
        ctx.json({
          results: mockCharacterResult,
        })
      );
    } else if (name === '' || name === ' ') {
      return res(
        ctx.status(200),
        ctx.json({
          info: {
            count: 800,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            {
              id: 101010,
              name: 'Passed',
              status: 'Dead',
              species: 'Humanoid',
              type: 'Miniverse inhabitant',
              gender: 'Male',
              origin: {
                name: "Zeep Xanflorp's Miniverse",
                url: 'https://rickandmortyapi.com/api/location/49',
              },
              location: {
                name: "Kyle's Teenyverse",
                url: 'https://rickandmortyapi.com/api/location/50',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/17'],
              url: 'https://rickandmortyapi.com/api/character/197',
              created: '2017-12-30T12:39:09.025Z',
            },
          ],
        })
      );
    } else if (id === '11111') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 11111,
          name: 'Single',
          status: 'Dead',
          species: 'Humanoid',
          type: 'Miniverse inhabitant',
          gender: 'Male',
          origin: {
            name: "Zeep Xanflorp's Miniverse",
            url: 'https://rickandmortyapi.com/api/location/49',
          },
          location: {
            name: "Kyle's Teenyverse",
            url: 'https://rickandmortyapi.com/api/location/50',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/17'],
          url: 'https://rickandmortyapi.com/api/character/197',
          created: '2017-12-30T12:39:09.025Z',
        })
      );
    }
  }),
];
