import './App.css'
import { BrowserRouter, NavLink, Routes, Route, Router} from "react-router-dom";
import { Signin } from './components/Signin/Signin';
import { OverView } from './components/Overview/Overview';
import { AdministrationPanel } from './components/AdministrationPanel/AdministrationPanel';
import { HallAdd } from './components/HallAdd/HallAdd';
import { use, useEffect, useState } from "react"
import { ShowFilm } from './components/ShowFilm/ShowFilm';
import { Payment } from './components/confirmTickets/Payment';
import { QrCode } from './components/QrCode/QrCode';
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
    const [hallName, setHallName] = useState("") // Имя зала
    const [filmName, setFilmName] = useState("") // название фильма выбранного сеанса
    const [seacneStart, setSeanceStart] = useState(null) //время начала сеанса
    const [seanceId, setSeanceId] = useState(null)
    const [standartPrice, setStandartPrice] = useState(null) // стандартная цена за место
    const [vipPrice, setVipPrice] = useState(null) // VIP цена за место
    const [initialHallPlan, setInitialHallPlan] = useState([]) // начальная конфигурация зала
    const [priceForTickets,setPriceForTickets] = useState(0) //общая цена за все билеты
    const [selectedSeats, setSelectedSeats] = useState([]) // Выбранные места
    useEffect (()=> {
      console.log(hallPlan);
    },[hallPlan]) 

    // useEffect(()=> (
    //   console.log(priceForTickets)
    // ),[priceForTickets])

    useEffect(()=>(console.log(selectedSeats)),[selectedSeats])
    useEffect(()=> (console.log(priceForTickets)),[priceForTickets])
  return (
    <BrowserRouter>
       <Routes>

      <Route path='/Frontend-diplom/QrCode' element = {<QrCode
          filmName = {filmName}
          selectedSeats = {selectedSeats}
          hallName = {hallName}
          seacneStart = {seacneStart}
          priceForTickets = {priceForTickets}
          valueDate = {valueDate}
          setSelectedSeats = {setSelectedSeats}
      />}>
      </Route>

      <Route path='/Frontend-diplom/Payment' element = {<Payment
          priceForTickets = {priceForTickets}
          filmName = {filmName}
          selectedSeats = {selectedSeats}
          hallName = {hallName}
          seacneStart = {seacneStart}
          seanceId = {seanceId}
          valueDate = {valueDate}
      />}
      >
      </Route>

      <Route path='/Frontend-diplom/film/:valueDate' element = {<ShowFilm 
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
      setPriceForTickets = {setPriceForTickets}
      setSelectedSeats = {setSelectedSeats}
      selectedSeats = {selectedSeats}
      priceForTickets = {priceForTickets}
      />}>
      </Route>

      <Route path='/Frontend-diplom/' element = {<OverView 
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
      setSeanceId = {setSeanceId}
      />}>
      </Route>

      <Route path='/Frontend-diplom/signin' element = {<Signin/>}>
      </Route>

      <Route path='/Frontend-diplom/admin' element = {<AdministrationPanel/>}>
      </Route>

      <Route path='/Frontend-diplom/admin/hallAdd' element = {<HallAdd/>}>
      </Route>

    </Routes>
    </BrowserRouter>

  )
}

export default App
