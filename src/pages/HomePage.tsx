import { memo, useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useLoadingSPAQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { IRepo, IUser } from '../models/models';
import { SContainer, SInput, SItem, SLink } from '../assets/styles/app.styles';
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
    const [visibleRepos, setVisibleRepos] = useState(false);

    useEffect(() => {
        setDropdown(debounce.length >= 3 && data?.length! > 0);
    }, [debounce, data]);

    function handleClick(username: string) {
        fetchRepos(username);
        setDropdown(false);
        setVisibleRepos(true);
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        setVisibleRepos(false);
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
                <div>
                    <h1>HomePage</h1>
                    <SInput
                        type='text'
                        value={search}
                        onChange={handleOnChange}
                        placeholder='Search for Github username...'
                    />

                    {areUserLoading && <>Loading...</>}
                    {dropdown && (
                        <ul className='list_users'>
                            {data?.map((item: IUser, id) => {
                                return (
                                    <SItem key={item.id} onClick={() => handleClick(item.login)}>
                                        {id + 1}. {item.login}
                                    </SItem>
                                );
                            })}
                        </ul>
                    )}

                    {areReposLoading && <h3>Loading...</h3>}
                    {visibleRepos && (
                        <ul className='list_repos'>
                            {repos?.map((item: IRepo, id) => {
                                return (
                                    <SLink href={item.html_url} target='_blank'>
                                        {id + 1}. {item.full_name}
                                    </SLink>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </SContainer>
    );
});
