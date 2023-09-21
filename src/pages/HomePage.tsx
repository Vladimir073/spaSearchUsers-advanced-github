import { memo } from 'react';
import { useSearchUsersQuery } from '../services/api/github.api';

export const HomePage = memo(() => {
    const { isLoading, isError, data } = useSearchUsersQuery('vladimir');
    return <h1>HomePage</h1>;
});
