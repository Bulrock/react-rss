import { rest } from 'msw';
export const handlers = [
  rest.get('https://api.itbook.store/1.0/books/9781098103828', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        authors: 'Penaz',
        desc: 'This is a small project that aims to gather some knowledge about game development and make it available to everyone.As well as being a source of knowledge this project aims to be a learning experience for everyone involved too, by gathering contributions from the community, teaching others how to ma...',
        error: '0',
        image: 'https://itbook.store/img/books/1001591780142.png',
        isbn10: '1591780144',
        isbn13: '1001591780142',
        language: 'English',
        pages: '260',
        pdf: { 'Free eBook': 'https://www.dbooks.org/d/5591524177-1591780138-d3bc2cc71fbbd84f/' },
        price: '$0.00',
        publisher: 'Self-publishing',
        rating: '0',
        subtitle: 'A compendium of the community knowledge on game design and development',
        title: '2D Game Development: From Zero to Hero',
        url: 'https://itbook.store/books/1001591780142',
        year: '2020',
      })
    );
  }),
];
