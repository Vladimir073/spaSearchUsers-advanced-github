import { FC } from 'react';
import { SLoader } from '../assets/styles/app.styles';

export const Loader: FC = () => {
    return (
        <SLoader>
            <div className='loader'></div>
        </SLoader>
    );
};
