import { Outlet } from "react-router-dom"
import {useState} from "react"
//components
import HeaderComponent from "./components/HeaderComponent"
import NavbarComponent from "./components/NavbarComponent"
import CategoryComponent from "./components/CategoryComponent"

//axios
import axios from 'axios'

axios.defaults.baseURL = 'https://dummyjson.com'

function AppLayout() {
  
  const [activeHeader, setActiveHeader] = useState(true);



  return (
    <>
      <div>
        {activeHeader && <HeaderComponent setActiveHeader={setActiveHeader}/>}
        <NavbarComponent/>
        <CategoryComponent/>
        <Outlet/>
      </div>
    </>
  )
}

export default AppLayout
