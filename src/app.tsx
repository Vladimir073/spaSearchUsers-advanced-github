import { SApp, SHeader, SMain } from './assets/styles/app.styles';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Navigation } from './components/Navigation';

function App() {
    return (
        <SApp>
            <SHeader>
                <Navigation />
            </SHeader>

            <SMain>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                </Routes>
            </SMain>
        </SApp>
    );
}

export default App;
