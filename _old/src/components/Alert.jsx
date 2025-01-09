import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import '../styles/Alert.css';

import { HIDE_ALERT, updateAlert } from '../actions/alert-actions';

export default function Alert() {
    const status = useSelector(state => state.alert.status);
    const msg = useSelector(state => state.alert.msg);
    const dispatch = useDispatch();

    function dispatchUpdateAlert(payload = {}) {
        return dispatch(updateAlert(payload));
    }

    function sendUpdate() {
        const payload = { type: HIDE_ALERT, visible: false };
        return dispatchUpdateAlert(payload);
    }

    const alertClasses = classNames({
        animated: true,
        fadeInLeft: true,
        normal: status === 'normal',
        error: status === 'error',
        success: status === 'success',
        warning: status === 'warning',
        'alert-item': true
    });

    setTimeout(sendUpdate, 5000);

    return (
        <div
            className="alert-container"
            onClick={() => {
                sendUpdate();
            }}
        >
            <div className={alertClasses}>
                <p>{msg}</p>
            </div>
        </div>
    );
}
