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
        normal: this.props.status === 'normal',
        error: this.props.status === 'error',
        success: this.props.status === 'success',
        warning: this.props.status === 'warning',
        'alert-item': true
    });

    setTimeout(sendUpdate, 5000);

    return (
        <div
            className="alert-container"
            onClick={() => {
                this.sendUpdate();
            }}
        >
            <div className={alertClasses}>
                <p>{this.props.msg}</p>
            </div>
        </div>
    );
}
// export class Alert extends Component {
//     constructor(props) {
//         super(props);

//         this.sendUpdate = this.sendUpdate.bind(this);
//     }

//     sendUpdate() {
//         const payload = { type: HIDE_ALERT, visible: false };
//         return this.props.updateAlert(payload);
//     }

//     render() {
//         const alertClasses = classNames({
//             animated: true,
//             fadeInLeft: true,
//             normal: this.props.status === 'normal',
//             error: this.props.status === 'error',
//             success: this.props.status === 'success',
//             warning: this.props.status === 'warning',
//             'alert-item': true
//         });

//         setTimeout(this.sendUpdate, 5000);

//         return (
//             <div
//                 className="alert-container"
//                 onClick={() => {
//                     this.sendUpdate();
//                 }}
//             >
//                 <div className={alertClasses}>
//                     <p>{this.props.msg}</p>
//                 </div>
//             </div>
//         );
//     }
// }

// Alert.propTypes = {
//     status: T.oneOf(['normal', 'error', 'success', 'warning']),
//     msg: T.string
// };

// const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(Alert);

// export default AlertContainer;
