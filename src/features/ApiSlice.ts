import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: (search: string) => `character/${search}`,
      keepUnusedDataFor: 1,
    }),
    getCharacters: builder.query({
      query: (search: string) => `character/?name=${search}`,
      keepUnusedDataFor: 1,
    }),
    getCharacterById: builder.query({
      query: (id: string) => `character/${id}`,
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharactersQuery, useGetCharacterByIdQuery } =
  charactersAPI;
