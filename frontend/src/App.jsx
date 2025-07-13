import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import HomePage from './pages/HomePage';
import AuthPage from './pages/authpage/AuthPage';

import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path='auth' element={<AuthPage />}/>
    </Route>
    </>
  )
)

export default function App() {
  return (
    <div className='font-sans'>
      <RouterProvider router={router} />
    </div>
  )
}
