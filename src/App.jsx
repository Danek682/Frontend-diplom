import './App.css'
import { BrowserRouter, NavLink, Routes, Route, Router} from "react-router-dom";
import { Signin } from './components/Signin/Signin';
import { OverView } from './components/Overview/Overview';
import { AdministrationPanel } from './components/AdministrationPanel/AdministrationPanel';
import { HallAdd } from './components/HallAdd/HallAdd';
import { use, useEffect, useState } from "react"
import { ShowFilm } from './components/ShowFilm/ShowFilm';
import axios from "axios";
function App() {
   const [result, setResult] = useState(null)
  useEffect(()=>{
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            console.log(response.data)
            setResult(response.data.result)
        }).catch(err => (console.log(err)))
    },[]) 

    const [valueDate, setValueDate] = useState(""); // Дата сеанса (пользователь)
    const [hallPlan, setHallPlan] = useState([]) //Получаемый план зала после нажатия на сеасн (пользователь)
    const [hallName, setHallName] = useState("")
    const [filmName, setFilmName] = useState("") // название фильма выбранного сеанса
    const [seacneStart, setSeanceStart] = useState(null) //время начала сеанса
    const [standartPrice, setStandartPrice] = useState(null) // стандартная цена за место
    const [vipPrice, setVipPrice] = useState(null) // VIP цена за место
    const [initialHallPlan, setInitialHallPlan] = useState([]) // начальная конфигурация зала
    // useEffect (()=> {
    //   console.log(hallPlan);
    // },[hallPlan]) 
    
  return (
    <BrowserRouter>
       <Routes>

      <Route path='/film/:valueDate' element = {<ShowFilm 
      hallPlan = {hallPlan}
      valueDate = {valueDate}
      filmName = {filmName}
      seacneStart = {seacneStart}
      hallName = {hallName}
      standartPrice = {standartPrice}
      vipPrice = {vipPrice}
      setHallPlan = {setHallPlan}
      setInitialHallPlan = {setInitialHallPlan}
      initialHallPlan = {initialHallPlan}
      />}>
      </Route>

      <Route path='/' element = {<OverView 
      result = {result}
      valueDate = {valueDate}
      setValueDate = {setValueDate}
      hallPlan = {hallPlan}
      setHallPlan = {setHallPlan}
      setFilmName = {setFilmName}
      setSeanceStart = {setSeanceStart}
      setHallName = {setHallName}
      setStandartPrice = {setStandartPrice}
      setVipPrice = {setVipPrice}
      setInitialHallPlan = {setInitialHallPlan}
      />}>
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
