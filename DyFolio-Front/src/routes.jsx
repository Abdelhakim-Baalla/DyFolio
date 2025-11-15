import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Projects from './pages/Projects';
import Competences from './pages/Competences';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/:username',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projets',
        element: <Projects />,
      },
      {
        path: 'competences',
        element: <Competences />,
      },
      {
        path: 'experiences',
        element: <Experiences />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);
