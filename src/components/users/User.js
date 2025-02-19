import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GitHubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GitHubContext);
  const { user, repos, loading, getUser, getUserRepos } = githubContext;
  useEffect(() => {
    const login = match.params.login;
    getUser(login);
    getUserRepos(login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    company,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Seatch
        </Link>
        Hirebale:{''}
        {hireable ? (
          <i className='fas fa-check text-success'></i>
        ) : (
          <i className='fas fa-times-circle text-danger'></i>
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt='avatar'
              className='round-img'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>{location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1 '>
              Visit GitHub Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>WebSite: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
};

export default User;
