import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from '../services/api/github.api';

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
