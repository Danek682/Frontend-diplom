import { useEffect, useState } from "react"
import "./ShowFilm.css"
import { Link } from "react-router"
export function ShowFilm(props) {
    const [count, setCount] = useState(1)
    const [isActive, setIsActive] = useState(false)
    function showPlaces (place,rowIndex,placeIndex) {
        let massiveCopy = props.hallPlan.map(row =>[...row])
        if(place === "standart") {
            return <span className="showFilm-hallPlane-buyingScheme__legend-standartPlace" key={placeIndex} onClick={()=> {
                massiveCopy[rowIndex][placeIndex] = "selected"
                props.setHallPlan(massiveCopy)
                setCount(prev => prev + 1)
                setIsActive(true)
                props.setPriceForTickets(prev => prev + props.standartPrice)
                props.setSelectedSeats(prev => [
                    ...prev,
                    {row: rowIndex + 1, place: placeIndex + 1, coast: props.standartPrice}
                ])
            }}></span>
        }
        if (place === "vip") {
            return  <span className="showFilm-hallPlane-buyingScheme__legend-VipPlace" key={placeIndex} onClick={() => {
                massiveCopy[rowIndex][placeIndex] = "selected"
                props.setHallPlan(massiveCopy)
                setCount(prev => prev + 1)
                setIsActive(true)
                props.setPriceForTickets(prev => prev + props.vipPrice)
                props.setSelectedSeats(prev => [
                ...prev,
                {row: rowIndex + 1, place: placeIndex + 1, coast: props.vipPrice}
                ])
            }}></span>
        }
        if (place  === "selected") {
            return (<span className="showFilm-hallPlane-buyingScheme__legend-selectedPlace" key={placeIndex} onClick={()=> {
                props.setHallPlan(massiveCopy)
            }}></span>)
        }
        if (place === "taken") {
            return  <span className="showFilm-hallPlane-buyingScheme__legend-reservedPlace"key={placeIndex}></span>
        }
    }

    return (
        <div className="showFilm">
            <header className="showFilm-header"> 
                <Link to="/">
                    <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                </Link>
            </header>
            <main className="showFilm-main">
                <div className="showFilm-main__header">
                    <div className="showFilm-main__header-buying-info">
                        <span className="showFilm-main__header-buying-info-filmName">{props.filmName}</span>
                        <span className="showFilm-main__header-buying-info-filmStart">{`Начало сеанса: ${props.seacneStart}`}</span>
                        <span className="showFilm-main__header-buying-info-hallName">{props.hallName}</span>
                    </div>
                </div>
                <div className="showFilm-hallPlane">
                    <span className="showFilm-hallPlane-screen">&nbsp;Экран</span>
                    <div className="showFilm-hallPlane-buyingScheme">
                        {props.hallPlan.map((rows,rowIndex)=> (
                            <div className="showFilm-hallPlane-buyingScheme__hall-row" key={rowIndex}>
                                {rows.map((place,placeIndex)=> (
                                    showPlaces(place,rowIndex,placeIndex)
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="showFilm-hallPlane-buyingScheme__legend">
                        <div className="showFilm-hallPlane-buyingScheme__legend-box">
                            <span className="showFilm-hallPlane-buyingScheme__legend-standartPlace"></span>
                            <span className="showFilm-hallPlane-buyingScheme__legend-standartPlace-price"> {`Свободно (${props.standartPrice}руб)`}</span>
                        </div>
                        <div className="showFilm-hallPlane-buyingScheme__legend-box">
                            <span className="showFilm-hallPlane-buyingScheme__legend-reservedPlace"></span>
                            <span className="showFilm-hallPlane-buyingScheme__legend-reservedPlace-status"> {`Занято`}</span>
                        </div>
                        <div className="showFilm-hallPlane-buyingScheme__legend-box">
                            <span className="showFilm-hallPlane-buyingScheme__legend-VipPlace"></span>
                            <span className="showFilm-hallPlane-buyingScheme__legend-VipPlace-price"> {`Свободно VIP (${props.vipPrice}руб)`}</span>
                        </div>
                        <div className="showFilm-hallPlane-buyingScheme__legend-box">
                            <span className="showFilm-hallPlane-buyingScheme__legend-selectedPlace"></span>
                            <span className="showFilm-hallPlane-buyingScheme__legend-standartPlace-price"> {`Выбрано`}</span>
                        </div>
                    </div>
                </div>
                    <div className="showFilm-buttons-wrapper">

                            <Link to ={"/Payment"}><button disabled = {!isActive} className="showFilm-buttons__send" onClick={() => {setCount(0)}}
                            >Забронировать</button></Link>
                                
                            {count >= 1 ? 
                         <button className="showFilm-buttons__reset"
                            onClick={() => {
                                props.setHallPlan(props.initialHallPlan.map(row => [...row]));
                                setCount(0)
                                props.setPriceForTickets(0)
                                props.setSelectedSeats([])
                            }}
                            >
                            Отменить выбор
                        </button>
                        : ""}
                    </div>
            </main>
        </div>
    )
}

                    