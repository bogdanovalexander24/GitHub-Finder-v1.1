import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from '../types';

let gitHubClientId;
let gitHubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  gitHubClientId = process.env.GITHUB_CLIENT_ID;
  gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GitHubReducer, initialState);

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   this.setState({ users: res.data, loading: false });
  // }

  //Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  //Get User
  const getUser = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //Get Repos
  const getUserRepos = async userName => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GithubState;
