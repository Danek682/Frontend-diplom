import { useEffect, useState } from "react"
import "./OpenSales.css"
import axios from "axios"
export function OpenSales () {
    const [resultHalls, setResultHalls] = useState(null)
    const [activeHall, setActiveHall] = useState(null)

    useEffect(()=> {
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response=> {
            setResultHalls(response.data.result.halls)
        })
    },[])

    function openSeance (hallid,hallOpen) {
        axios.post(`https://shfe-diplom.neto-server.ru/open/${hallid}`, {
            hallId: hallid,
            hallOpen: Number(hallOpen)
        }).then(response=> {
            console.log(response.data)
            axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response=> {
            setResultHalls(response.data.result.halls)
        })
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="openSales__content"> 
        <span className="openSales__content-heading">Выбирите залл для открытия/закрытия продаж:</span>
        <div className="openSales__content-buttons">
            <div className="openSales__content-halls">
                {resultHalls?.map((h,index)=> (
                    <button  key={index} onClick={()=> {
                        setActiveHall(h.id)
                    }} className={activeHall === h.id ? "openSales__content-halls-isActive" : "openSales__content-hall"}>{h.hall_name}</button>
                ))}
            </div>
        </div>
        <div className="isOpenSale">
           {resultHalls?.map((h,index)=> {
            const status = h.hall_open === 1 ? "Этот зал уже открыт!" : "Все готово к открытию!"
           return  (<div className="setIsStatus-wrapper" key={index}>
                {activeHall === h.id ?
                 <div className="setIsStatus-box">
                    <span className="setIsStatus">{status}</span>
                    <div className="setIsStatus-buttons">
                        <button className="setIsStatus-button-send" onClick={() => {
                        openSeance(activeHall,1)
                    }}> Открыть продажу билетов </button>
                    <button className="setIsStatus-button-unSend" onClick={() => {
                        openSeance(activeHall,0)
                    }}> Остановить продажу билетов </button>    
                     </div>
                 </div> 
                 : ""}
            </div>)
            })}
        </div>
        </div>
    )
}