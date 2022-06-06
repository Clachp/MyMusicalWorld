import './style.scss';

import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { checkUser } from 'src/actions/user';

import Header from 'src/components/Header';
import About from 'src/components/About';
import Legal from 'src/components/Legal';
import Footer from 'src/components/Footer';
import Homepage from 'src/components/Homepage';
import Dashboard from 'src/components/Dashboard';
import NotFound from 'src/components/NotFound';

const App = () => {
  const dispatch = useDispatch();

  const { actionLogged, actionUnLogged } = useSelector((state) => state.user);

  useEffect(() => {
    const action = checkUser();
    dispatch(action);
  }, []);

  return (
    <div className="app">
      <div className="app__main">
        <Header />
        <Routes>
          <Route path="/" element={!actionLogged ? <Homepage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={!actionUnLogged ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path="/shared-space/:pseudoSharedSpace" element={!actionLogged ? <Dashboard /> : <Navigate to="/dashboard" replace />} />
          <Route path="/about" element={!actionLogged ? <About /> : <Navigate to="/dashboard" replace />} />
          <Route path="/legal" element={!actionLogged ? <Legal /> : <Navigate to="/dashboard" replace />} />
          <Route path="*" element={!actionLogged ? <NotFound /> : <Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
