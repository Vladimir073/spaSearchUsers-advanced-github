import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

export const Navigation: FC = memo(() => {
    return (
        <nav>
            <h3>Github Search</h3>
            <span>
                <Link to='/'>Home</Link>
                <Link to='/favorites'>Favorites</Link>
            </span>
        </nav>
    );
});
