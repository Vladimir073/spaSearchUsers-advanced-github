import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, IUser, ServerResponse } from '../../models/models';

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
    refetchOnFocus: true, //обновлет запрос на сервер, если мы покидали эту вкладку и пот0м вновь вернулись
    endpoints: build => ({
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 10, //колличество получаемых элементов
                },
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items, //меняет ответ с сервера, получаем только нужное нам поле
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`,
            }),
        }),
    }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
