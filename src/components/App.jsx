import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import Alert from './Alert';
import Footer from './Footer';
import SeasonDelay from './SeasonDelay';
import { Outlet } from 'react-router-dom';
import '../styles/App.css';

export default function App({ children }) {
    const alert = useSelector(state => state.alert.visible);
    const seasonStatus = useSelector(state => state.seasonStatus);

    console.log('season status', seasonStatus);
    function contentSelector() {
        if (seasonStatus.isFetching) {
            return null;
        }

        if (seasonStatus.data.isSeasonDelayed) {
            return <SeasonDelay />;
        }

        return (
            <>
                <Outlet />
            </>
        );
    }

    return (
        <div>
            <NavBar />
            {alert ? <Alert /> : null}
            {contentSelector()}
            <Footer />
        </div>
    );
}
