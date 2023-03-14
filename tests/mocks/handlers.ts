import { rest } from 'msw';
export const handlers = [
  rest.get('https://api.itbook.store/1.0/books/9781098103828', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: '0',
        title: 'Snowflake: The Definitive Guide',
        subtitle: 'Architecting, Designing, and Deploying on the Snowflake Data Cloud',
        authors: 'Joyce Kay Avila',
        publisher: "O'Reilly Media",
        language: 'English',
        isbn10: '1098103823',
        isbn13: '9781098103828',
        pages: '465',
        year: '2022',
        rating: '4',
        desc: 'Snowflake&#039;s ability to eliminate data silos and run workloads from a single platform creates opportunities to democratize data analytics, allowing users at all levels within an organization to make data-driven decisions. Whether you&#039;re an IT professional working in data warehousing or data...',
        price: '$58.90',
        image: 'https://itbook.store/img/books/9781098103828.png',
        url: 'https://itbook.store/books/9781098103828',
      })
    );
  }),

  rest.get('https://api.itbook.store/1.0/search/qwert', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: '0',
        total: '0',
        page: '1',
        books: [],
      })
    );
  }),

  rest.get('https://api.itbook.store/1.0/search/DOME', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        books: [
          {
            image: 'https://itbook.store/img/books/9780735660120.png',
            isbn13: '9780735660120',
            price: '$19.95',
            subtitle: 'Add Interactivity and Motion to Your Web Applications',
            title: 'Building Web Applications with SVG',
            url: 'https://itbook.store/books/9780735660120',
          },
          {
            image: 'https://itbook.store/img/books/9781937785574.png',
            isbn13: '9781937785574',
            price: '$45.11',
            subtitle: 'Build with Lua on iOS and Android',
            title: 'Create Mobile Games with Corona',
            url: 'https://itbook.store/books/9781937785574',
          },
        ],
      })
    );
  }),
];
