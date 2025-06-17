import { Route, Routes } from 'react-router'
import Home from './components/pages/home/Home'
import DefaultLayout from './components/layouts/DefaultLayout'

export default function AppRoutes() {
  return (
    <Routes>
        <Route element={<DefaultLayout/>}>
            <Route element={<Home/>} path='/'/>
        </Route>
    </Routes>
  )
}
