import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query({ query: () => 'character' }),
    getCharacters: builder.query({ query: (search: string) => `character/?name=${search}` }),
    getCharacterById: builder.query({ query: (id: string) => `character/${id}` }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharactersQuery, useGetCharacterByIdQuery } =
  charactersAPI;
