import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const RootReducer = {
    [githubApi.reducerPath]: githubApi.reducer,
};

export const store = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true }).concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
