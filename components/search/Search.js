import React, { useEffect, useState } from 'react';
import { SEARCH_USERS } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const Search = () => {
  const [inputVal, setInputVal] = useState('');
  const [searchUsers] = useMutation(SEARCH_USERS);
  const [results, setResults] = useState([]);
  const [noResultsMsg, setNoResultsMsg] = useState('');

  const handleSearchUsers = async () => {
    try {
      const { data } = await searchUsers({
        variables: {
          searchVal: inputVal
        }
      });
      if (data) {
        setResults(data.searchUsers);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSearch = (e) => {
    setInputVal(e.target.value);
  }

  useEffect(() => {
    if (inputVal !== '') {
      handleSearchUsers();
    } else {
      setResults([]);
      setNoResultsMsg('');
    }
  }, [inputVal])


  useEffect(() => {
    if (results.length === 0 && inputVal !== '') {
      setNoResultsMsg('No Users Found : (');
    } else if (results.length > 0 && inputVal !== '') {
      setNoResultsMsg('');
    }
  }, [results, inputVal])

  return (
    <div>
      <input value={inputVal} onChange={handleSearch} />
      {results.map((user, idx) => (
        <div key={user.id}>
          <p> {idx + 1}: {user.userName}</p>
        </div>
      ))}
      <p>{noResultsMsg}</p>
    </div>
  )
}

export default Search