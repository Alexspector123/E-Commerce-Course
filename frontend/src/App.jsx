import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import CourseLayout from "./layout/CourseLayout";

import HomePage from './pages/HomePage';
import AuthPage from './pages/authpage/AuthPage';
import CategoryPage from "./pages/CategoryPage";
import CoursePage from "./pages/CoursePage";

import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path='auth' element={<AuthPage />}/>
      <Route path='courses' element={<CourseLayout />}>
        <Route path="search" element={<CategoryPage />} />
        <Route path=":id" element={<CoursePage />} />
      </Route>
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
