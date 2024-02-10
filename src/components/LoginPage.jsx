import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { userLoginReq } from '../actions/user-actions';
import '../styles/LoginPage.css';

export default function LoginPage() {
    const dispatch = useDispatch();

    function handleSignIn(e, provider) {
        e.preventDefault();
        dispatch(userLoginReq(provider));
    }

    function renderLogin() {
        return (
            <div className="login-container">
                <button className="login-button github" onClick={e => handleSignIn(e, 'github')}>
                    <h3>Github</h3>
                </button>
                <button
                    className="login-button facebook"
                    onClick={e => handleSignIn(e, 'facebook')}
                >
                    <h3>Facebook</h3>
                </button>
                <button className="login-button twitter" onClick={e => handleSignIn(e, 'twitter')}>
                    <h3>Twitter</h3>
                </button>
            </div>
        );
    }

    return <div>{renderLogin()}</div>;
}
