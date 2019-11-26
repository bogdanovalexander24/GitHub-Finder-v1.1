import React, { useState, useContext } from 'react';
import GitHubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContex';

const Search = () => {
  const githubContext = useContext(GitHubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');
  const showClear = githubContext.users.length > 0 ? true : false;
  const { clearUsers, searchUsers } = githubContext;

  const onSubmit = e => {
    e.preventDefault(); // prevent update of the page
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };
  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} action='' className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
