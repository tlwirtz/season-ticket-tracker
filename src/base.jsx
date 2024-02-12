// import Rebase from 're-base';

// const base = Rebase.createClass({
//     apiKey: 'AIzaSyAGt32afx0uk5uDIJlFxfKnRH0tqgV-jSg',
//     authDomain: 'season-ticket-tracker.firebaseapp.com',
//     databaseURL: 'https://season-ticket-tracker.firebaseio.com'
// });

// export default base;

import _ from 'lodash';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import {
    getAuth,
    onAuthStateChanged,
    GithubAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAGt32afx0uk5uDIJlFxfKnRH0tqgV-jSg',
    authDomain: 'season-ticket-tracker.firebaseapp.com',
    databaseURL: 'https://season-ticket-tracker.firebaseio.com'
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);
const dbRef = ref(db);

export const fetch = path => {
    return get(child(dbRef, path)).then(snapshot => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            throw new Error('Could not find matches');
        }
    });
};

export const update = (route, data) => {
    const updates = {};
    updates[route] = data;

    return update(dbRef, updates);
};

export const unAuth = () => {
    return auth.signOut();
};

export const authWithOAuthPopup = provider => {
    let authProvider = null;
    switch (provider) {
        case 'facebook':
            authProvider = FacebookAuthProvider;
            break;
        case 'twitter':
            authProvider = TwitterAuthProvider;
            break;
        case 'github':
            authProvider = GithubAuthProvider;
            break;
        default:
            break;
    }

    if (!authProvider) {
        throw new Error('Auth provider must be specified');
    }

    const initProvider = new authProvider();

    return signInWithPopup(auth, initProvider).then(result => {
        const user = result.user;
        return { user: user.toJSON() };
    });
};

//not sure we really need this any more...
export const onAuth = authHandler => {
    return onAuthStateChanged(auth, authHandler);
};
