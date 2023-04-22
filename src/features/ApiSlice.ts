import * as rtkQuery from '@reduxjs/toolkit/dist/query/react';
// import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';

export type TypeRTKQuery = typeof rtkQuery & { default?: unknown };
const { fetchBaseQuery, createApi } = ((rtkQuery as TypeRTKQuery).default ??
  rtkQuery) as typeof rtkQuery;

// const createApi = buildCreateApi(
//   coreModule(),
//   reactHooksModule({ unstable__sideEffectsInRender: true })
// );

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: () => `character`,
    }),
    getCharacters: builder.query({
      query: (search: string) => `character/?name=${search}`,
    }),
    getCharacterById: builder.query({
      query: (id: string) => `character/${id}`,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharactersQuery, useGetCharacterByIdQuery } =
  charactersAPI;
