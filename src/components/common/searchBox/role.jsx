import React from 'react';
import { setCurrentRole } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

function Role({ role, setCurrentRole, setSearchTerm }) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${role?.id}/scorecard`);
        setCurrentRole(role);
        setSearchTerm("");
    }

    return (
        <div className='role' onClick={ handleClick } >
            <span className='name'>{role?.user.first_name}</span> &nbsp;
            <span className='name'>{role?.user.second_name}</span>
        </div>
  );
}

export default  connect(null, { setCurrentRole, })(Role);
