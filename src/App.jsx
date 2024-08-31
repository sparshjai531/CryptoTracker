import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router-dom'
import Coins from "./components/Coins"
import Exchanges from "./components/Exchanges"
import CoinDetails from "./components/CoinDetails"
import Home from "./components/Home"
import App1 from "./App1"

function App() {
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App1/>}>
        <Route path="" element={<Home/>}/>
        <Route path="coins" element={<Coins/>}/>
        <Route path="exchanges" element={<Exchanges/>}/>
        <Route path="coin/:id" element={<CoinDetails/>}/>
      </Route>
    )
  )

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
