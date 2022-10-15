import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AppRouter from './AppRouter';
import NavBar from './components/Common/NavBar/NavBar';
import { Context } from '.';
import { checkIsAuth } from './http/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkIsAuth()
      .then(() => {
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Spinner
        className="d-flex justify-content-center align-items-center"
        animation="border"
        role="status"
        variant="primary"
      />
    );
  }

  return (
    <Router>
      <NavBar />
      <AppRouter />
    </Router>
  );
});

export default App;
