import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutReq, checkIfAdmin } from '../actions/user-actions';
import '../styles/NavBar.css';
import '../styles/Colors.css';

export default function NavBar() {
    const [hideNav, setHideNav] = useState(false);
    const [innerWidth, setInnerWidth] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => (state.user ? state.user : null));
    const isSeasonStatusFetching = useSelector(state => state.seasonStatus.isFetching);
    console.log('isSeasonFetch', isSeasonStatusFetching);
    const isSeasonDelayed = useSelector(state => state.seasonStatus.data.isSeasonDelayed);

    function logout(e) {
        e.preventDefault();
        return dispatch(userLogoutReq());
    }

    function windowResize() {
        const { innerWidth } = window;
        setHideNav(innerWidth < 660);
        setInnerWidth(innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', windowResize);
        return () => window.removeEventListener('resize', windowResize);
    }, []);

    //probably don't need an effect here but...?
    //should run everytime user changes
    useEffect(() => {
        checkIfAdmin(user?.user?.uid).then(result => setIsAdmin(result));
    }, [user]);

    return (
        <div className="nav-bar-container">
            <div className="nav-bar-item nav-bar-heading">
                <Link to="/">
                    <h1 className="nav-bar-title">Match Finder</h1>
                </Link>
                <h3 className="nav-bar-subheading soft-grey-text">
                    Seattle Sounders {new Date(Date.now()).getFullYear()} Season
                </h3>
            </div>

            {user?.user ? (
                <div className="nav-bar-group">
                    <div className="nav-bar-item">
                        <Link to="/">
                            <div className="nav-link">Home</div>
                        </Link>
                    </div>
                    <div className="nav-bar-item">
                        <Link to="/about">
                            <div className="nav-link">About</div>
                        </Link>
                    </div>

                    <div className="nav-bar-item">
                        <Link to="/profile">
                            <div className="nav-link">My Matches</div>
                        </Link>
                    </div>

                    {isAdmin ? (
                        <div className="nav-bar-item">
                            <Link to="/admin">
                                <div className="nav-link">Admin</div>
                            </Link>
                        </div>
                    ) : null}
                    <div className="nav-bar-item">
                        <img
                            alt="user-logo"
                            className="nav-bar-user-logo"
                            src={user.user.photoURL}
                        />
                    </div>
                    <div className="nav-bar-item">
                        <button
                            className="action-button"
                            onClick={e => {
                                logout(e);
                            }}
                        >
                            {' '}
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                !isSeasonStatusFetching &&
                !isSeasonDelayed && (
                    <div className="nav-bar-group">
                        <Link to="/login" className="nav-bar-item">
                            <button className="action-button">Login</button>
                        </Link>
                    </div>
                )
            )}
        </div>
    );
}

// class NavBar extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {};
//         this.windowResize = this.windowResize.bind(this);
//     }

//     windowResize() {
//         const { innerWidth } = window;
//         this.setState({ hideNav: innerWidth < 660, innerWidth });
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.user && nextProps.user.user) {
//             checkIfAdmin(nextProps.user.user.uid).then(result =>
//                 this.setState({ isAdmin: result })
//             );
//         }
//     }

//     componentWillMount() {
//         this.windowResize();
//         window.addEventListener('resize', this.windowResize);
//     }

//     componentWillUnMount() {
//         window.removeEventListener('resize', this.windowResize);
//     }

//     //TODO -- display menu icon if small window
//     //TODO -- display nav menu if hamburger menu clicked
//     //TODO -- hide nav menu if 'close' is clicked

//     render() {
//         return (
//             <div className="nav-bar-container">
//                 <div className="nav-bar-item nav-bar-heading">
//                     <Link to="/">
//                         <h1 className="nav-bar-title">Match Finder</h1>
//                     </Link>
//                     <h3 className="nav-bar-subheading soft-grey-text">
//                         Seattle Sounders {new Date(Date.now()).getFullYear()} Season
//                     </h3>
//                 </div>

//                 {this.props.user.user ? (
//                     <div className="nav-bar-group">
//                         <div className="nav-bar-item">
//                             <Link to="/">
//                                 <div className="nav-link">Home</div>
//                             </Link>
//                         </div>
//                         <div className="nav-bar-item">
//                             <Link to="/about">
//                                 <div className="nav-link">About</div>
//                             </Link>
//                         </div>

//                         <div className="nav-bar-item">
//                             <Link to="/profile">
//                                 <div className="nav-link">My Matches</div>
//                             </Link>
//                         </div>

//                         {this.state.isAdmin ? (
//                             <div className="nav-bar-item">
//                                 <Link to="/admin">
//                                     <div className="nav-link">Admin</div>
//                                 </Link>
//                             </div>
//                         ) : null}
//                         <div className="nav-bar-item">
//                             <img
//                                 alt="user-logo"
//                                 className="nav-bar-user-logo"
//                                 src={this.props.user.user.photoURL}
//                             />
//                         </div>
//                         <div className="nav-bar-item">
//                             <button
//                                 className="action-button"
//                                 onClick={e => {
//                                     this.props.logout(e);
//                                 }}
//                             >
//                                 {' '}
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     !this.props.isSeasonStatusFetching &&
//                     !this.props.isSeasonDelayed && (
//                         <div className="nav-bar-group">
//                             <Link to="/login" className="nav-bar-item">
//                                 <button className="action-button">Login</button>
//                             </Link>
//                         </div>
//                     )
//                 )}
//             </div>
//         );
//     }
// }

// NavBar.propTypes = {
//     user: T.object.isRequired,
//     logout: T.func.isRequired,
//     isSeasonDelayed: T.bool.isRequired,
//     isSeasonStatusFetching: T.bool.isRequired
// };

// const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

// export default NavBarContainer;
