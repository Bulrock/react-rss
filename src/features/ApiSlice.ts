import * as rtkQuery from '@reduxjs/toolkit/dist/query/react';

export type TypeRTKQuery = typeof rtkQuery & { default?: unknown };
const { fetchBaseQuery, createApi } = ((rtkQuery as TypeRTKQuery).default ??
  rtkQuery) as typeof rtkQuery;

import { ICharactersResult, ICharacter } from '@/models/types';

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ICharactersResult, string>({
      query: (search: string) => `character/?name=${search}`,
    }),
    getCharacterById: builder.query<ICharacter, string>({
      query: (id: string) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = charactersAPI;
