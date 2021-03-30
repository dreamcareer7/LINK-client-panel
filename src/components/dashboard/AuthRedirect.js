import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { saveAuthTokenLocalStorage } from '../../helpers/LocalStorageHelper';

function AuthRedirect({ ...options }) {
  const { search } = useLocation();
  const authToken = new URLSearchParams(search).get('token');
  const opportunityId = new URLSearchParams(search).get('opportunityId');

  useEffect(() => {
    saveAuthTokenLocalStorage({ authToken });
  }, []);
  return (
    <Route {...options}>
      <Redirect to={opportunityId ? `/followups/opportunityDetails/${opportunityId}` : '/home'} />
    </Route>
  );
}

export default AuthRedirect;
