import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    user: PropTypes.object
};

const Selection = ({ user }) => {
    return (
        <ul>
            <li> Name: { user.name }</li>
            <li> Email: { user.email }</li>
            <li> Gender: { user.gender }</li>
            <li>City: {user.City}</li>
        </ul>
    );
};

Selection.propTypes = propTypes;

export default Selection;