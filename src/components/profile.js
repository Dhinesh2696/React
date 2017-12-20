import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    label: PropTypes.string
};

const Profile = ({onClick, label, selected,details}) => {
    const classes = selected ? 'bold' : '';
    return (
        <div>
        <li onClick={onClick} className={classes}>
            {label}
        </li>

        </div>
    );
};

Profile.propTypes = propTypes;
export default Profile;