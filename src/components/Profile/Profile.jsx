import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

export default function Profile() {
  const { user } = useSelector(userSelector);
  const { username } = user;
  console.log(user);

  return (
    <div>Profile name = { username }</div>
  );
}
