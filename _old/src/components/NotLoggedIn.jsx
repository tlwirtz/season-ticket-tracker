import React, { Component } from 'react';

export default function NotLoggedIn() {
    return (
        <div>
            <h1 className="match-detail-title"> Oh no! You're not logged in.</h1>
            <h3 className="medium-grey-text centered">You need to be logged in to see this page</h3>
        </div>
    );
}
