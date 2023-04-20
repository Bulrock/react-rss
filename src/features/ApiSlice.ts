import * as rtkQuery from '@reduxjs/toolkit/dist/query/react';

export type TypeRTKQuery = typeof rtkQuery & { default?: unknown };
const { createApi, fetchBaseQuery } = ((rtkQuery as TypeRTKQuery).default ??
  rtkQuery) as typeof rtkQuery;

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: (search: string) => `character/${search}`,
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
