import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, IUser, ServerResponse } from '../../models/models';

export const githubApi = createApi({
    reducerPath: 'githubApi', // название захешированного редюсера котрое хранится в сторе
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }), //здесь хранится базовый url, который будет конкатинироваться полный EndPoint по котрому будем делать запрос
    refetchOnFocus: true, //обновлет запрос на сервер, если мы покидали эту вкладку и потом вновь вернулись
    endpoints: build => ({
        loadingSPA: build.query({
            query: () => ({
                url: '',
                params: {},
            }),
        }),
        searchUsers: build.query<IUser[], string>({
            //serachUser-название endpoint по которому мы будем получать пользователя
            //в джинерике 1 параметр описывает что ждем в ответе от сервера, 2 параметр означает какой параметр мы хотим принимать чтобы осуществить запрос
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

export const { useSearchUsersQuery, useLazyGetUserReposQuery, useLoadingSPAQuery } = githubApi;
