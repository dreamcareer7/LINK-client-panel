import React, { useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { saveAuthTokenLocalStorage } from '../../helpers/LocalStorageHelper';

function AuthRedirect({ ...options }) {
  const { search } = useLocation();
  const [oppId, setOppId] = useState('');
  useEffect(() => {
    const authToken = new URLSearchParams(search).get('token');
    const opportunityId = new URLSearchParams(search).get('opportunityId');
    setOppId(opportunityId);
    saveAuthTokenLocalStorage({ authToken });
  }, []);
  return (
    <Route {...options}>
      {' '}
      {oppId ? <Redirect to={`/followUps/opportunityDetails/${oppId}`} /> : <Redirect to="/home" />}
    </Route>
  );
}

export default AuthRedirect;
