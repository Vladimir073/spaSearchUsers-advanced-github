import { memo, useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useLoadingSPAQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { IRepo, IUser } from '../models/models';
import { SContainer, SInput } from '../assets/styles/app.styles';
import { Loader } from '../components/Loader';

export const HomePage = memo(() => {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);

    const debounce = useDebounce(search);
    const { isLoading, isError } = useLoadingSPAQuery('');
    const { isLoading: areUserLoading, data } = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3,
        refetchOnFocus: true,
    });

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

    useEffect(() => {
        setDropdown(debounce.length >= 3 && data?.length! > 0);
    }, [debounce, data]);

    function handleClick(username: string) {
        fetchRepos(username);
        setDropdown(false);
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <h1>Something went wrong...</h1>;
    }

    return (
        <SContainer>
            {!isLoading && (
                <>
                    <h1>HomePage</h1>
                    <div>
                        <input
                            type='text'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder='Search for Github username...'
                        />
                        <ul>
                            {areUserLoading && <>Loading...</>}
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
                    <div>
                        {areReposLoading && <h3>Loading...</h3>}
                        {repos?.map((item: IRepo) => {
                            return (
                                <a href={item.html_url} target='_blank'>
                                    <p>{item.full_name}</p>
                                </a>
                            );
                        })}
                    </div>
                </>
            )}
        </SContainer>
    );
});
