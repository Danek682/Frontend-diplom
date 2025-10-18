import './App.css'
import { BrowserRouter, NavLink, Routes, Route, Router} from "react-router-dom";
import { Signin } from './components/Signin/Signin';
import { OverView } from './components/Overview/Overview';
import { AdministrationPanel } from './components/AdministrationPanel/AdministrationPanel';
import { HallAdd } from './components/HallAdd/HallAdd';
import { useEffect, useState } from "react"
import axios from "axios";
function App() {
   const [result, setResult] = useState(null)
  useEffect(()=>{
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            console.log(response.data)
            setResult(response.data.result)
        }).catch(err => (console.log(err)))
    },[]) 

  return (
    <BrowserRouter>
       <Routes>

      <Route path='/'element = {<OverView result = {result}/>}>
      </Route>

      <Route path='/signin' element = {<Signin/>}>
      </Route>

      <Route path='/admin' element = {<AdministrationPanel/>}>
      </Route>

      <Route path='/admin/hallAdd' element = {<HallAdd/>}>
      </Route>

    </Routes>
    </BrowserRouter>

  )
}

export default App
