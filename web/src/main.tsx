import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './components/loginPage';
import { SignUpPage } from './components/signupPage';

const router = createBrowserRouter([
  {
    path: "/",
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/siginup",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
