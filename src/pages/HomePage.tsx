import { memo, useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../services/api/github.api';
import { useDebounce } from '../hooks/debounce';
import { IUser } from '../models/models';
import { SInput } from '../assets/styles/app.styles';

export const HomePage = memo(() => {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);

    const debounce = useDebounce(search);
    const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3,
        refetchOnFocus: true,
    });

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

    useEffect(() => {
        setDropdown(debounce.length >= 3 && data?.length! > 0);
    }, [debounce, data]);

    function handleClick(username: string) {
        fetchRepos(username);
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>Something went wrong...</h1>;
    }

    return (
        <div>
            <h1>HomePage</h1>
            <div>
                <input
                    type='text'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search for Github username...'
                />
                <ul>
                    {dropdown &&
                        data?.map((item: IUser) => {
                            return (
                                <SInput key={item.id} onClick={() => handleClick(item.login)}>
                                    {item.login}
                                </SInput>
                            );
                        })}
                </ul>
            </div>
            <div>{areReposLoading && <h3>Loading...</h3>}</div>
        </div>
    );
});
