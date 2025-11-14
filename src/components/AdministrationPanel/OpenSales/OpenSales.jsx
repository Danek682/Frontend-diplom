import { useEffect, useState } from "react"
import "./OpenSales.css"
import axios from "axios"
export function OpenSales (props) {
    const [activeHall, setActiveHall] = useState(null)

    function openSeance (hallid,hallOpen) {
        axios.post(`https://shfe-diplom.neto-server.ru/open/${hallid}`, {
            hallId: hallid,
            hallOpen: Number(hallOpen)
        }).then(response=> {
            console.log(response.data)
            props.setHalls(prev => 
                prev.map((h) => 
                   {
                      return (
                           h.id === hallid 
                        ? {
                            ...h,
                            hall_open: Number(hallOpen)
                            }
                        : h
                    )
                    }
                )
                 )
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        if(activeHall === null && props.hall?.length > 0) {
            setActiveHall(props.hall[0].id)
        }
    },[activeHall,props.hall])

    return (
        <div className="openSales__content"> 
        <span className="openSales__content-heading">Выбирите залл для открытия/закрытия продаж:</span>
        <div className="openSales__content-buttons">
            <div className="openSales__content-halls">
                {props.hall?.map((h,index)=> {
                    return (
                        <button  key={index} onClick={()=> {
                        setActiveHall(h.id)
                    }} className={activeHall === h.id ? "openSales__content-halls-isActive" : "openSales__content-hall"}>{h.hall_name}</button>
                )})
                }
                    
            </div>
        </div>
        <div className="isOpenSale">
           {props.hall?.map((h,index)=> {
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

