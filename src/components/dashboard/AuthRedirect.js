import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { saveAuthTokenLocalStorage } from '../../helpers/LocalStorageHelper';

function AuthRedirect({ ...options }) {
  const { search } = useLocation();
  const authToken = new URLSearchParams(search).get('token');
  const opportunityId = new URLSearchParams(search).get('opportunityId');
  const redirectTo = new URLSearchParams(search).get('redirectTo');

  useEffect(() => {
    saveAuthTokenLocalStorage({ authToken });
  }, []);
  return (
    <Route {...options}>
      {opportunityId ? (
        <Redirect to={`/followups/opportunityDetails/${opportunityId}`} />
      ) : (
        <Redirect to={redirectTo ? `/${redirectTo}` : '/dashboard'} />
      )}
    </Route>
  );
}

export default AuthRedirect;
