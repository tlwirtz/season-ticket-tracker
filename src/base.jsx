// import Rebase from 're-base';

// const base = Rebase.createClass({
//     apiKey: 'AIzaSyAGt32afx0uk5uDIJlFxfKnRH0tqgV-jSg',
//     authDomain: 'season-ticket-tracker.firebaseapp.com',
//     databaseURL: 'https://season-ticket-tracker.firebaseio.com'
// });

// export default base;

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyAGt32afx0uk5uDIJlFxfKnRH0tqgV-jSg',
    authDomain: 'season-ticket-tracker.firebaseapp.com',
    databaseURL: 'https://season-ticket-tracker.firebaseio.com'
};

export const app = initializeApp(firebaseConfig);

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

//todo -- fixme
export const unauth = () => {
    //unauth stuff here
    return;
};

//todo -- fixme
export const authWithOAuthPopup = (provider, authHandler) => {
    //do login stuff here
    return { user: { admin: true } };
};

//not sure we really need this any more...
//todo -- fix me
export const onAuth = authHandler => {
    authHandler();
};

export const update = (route, data) => {
    const updates = {};
    updates[route] = data;

    return update(dbRef, updates);
};

export const base = {
    fetch: route => {},
    update: (reoute, update) => update,
    unauth: () => null
};
