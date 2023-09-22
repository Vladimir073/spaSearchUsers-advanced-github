import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { SContainer, SLogo } from '../assets/styles/app.styles';

export const Navigation: FC = memo(() => {
    return (
        <SContainer>
            <div className='wrapper'>
                <SLogo>Github Search</SLogo>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/favorites'>Favorites</NavLink>
                </nav>
            </div>
        </SContainer>
    );
});
