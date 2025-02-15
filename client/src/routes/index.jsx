import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/MainLayout';

// Lazy load pages
const HomePage = lazy(() => import('../screens/homepage/HomePage'));
const Cards = lazy(() => import('../screens/Cards/Cards'));
const SignIn = lazy(() => import('../screens/auth/Login/index'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // ✅ Wrap everything inside Layout
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/cards',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cards />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
