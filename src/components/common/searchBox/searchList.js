import React from 'react';
import Role from './role';

function SearchList({ filteredPeople, setSearchTerm }) {

    return (
        <div className='search_list'>
            {
                filteredPeople.length === 0 && <span>No employees found</span>
            }
            {
                filteredPeople?.map(role =>  <Role setSearchTerm={setSearchTerm} role={role} key={role.id} /> )
            }
        </div>
  );
}

export default  SearchList;
