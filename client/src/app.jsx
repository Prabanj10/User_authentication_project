import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const app = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="signup"
          element={<Signup />}
        />
        <Route
          path="login"
          element={<Login />}
        />
      </Routes>
    </div>
  );
};

export default app;
