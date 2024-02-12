import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { userLoginReq } from '../actions/user-actions';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSignIn(e, provider) {
        e.preventDefault();
        dispatch(userLoginReq(provider));
        //this works, but isn't great b/c the redirect happens immediately.
        //might need to also fire of an "alert" or some type of loading.
        navigate('/');
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
