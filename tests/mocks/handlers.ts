import { rest } from 'msw';
import { persons } from '../../src/data/data';
export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character/:name', (req, res, ctx) => {
    const { name } = req.params;
    if (name === 'qwert') {
      return res(ctx.status(404), ctx.json({ persons }));
    }
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
  }),
];
