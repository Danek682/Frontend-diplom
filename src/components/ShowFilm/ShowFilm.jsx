import { useState } from "react"
import "./ShowFilm.css"
import { Link } from "react-router"
export function ShowFilm(props) {
    let massiveCopy = props.hallPlan.map(row =>[...row])
    const [count, setCount] = useState(1)
    function showPlaces (place,rowIndex,placeIndex) {
        if(place === "standart") {
            return <span className="showFilm-hallPlane-buyingScheme__legend-standartPlace" key={placeIndex} onClick={()=> {
                massiveCopy[rowIndex][placeIndex] = "selected"
                props.setHallPlan(massiveCopy)
                setCount(prev => prev + 1)
            }}></span>
        }
        if (place === "vip") {
            return  <span className="showFilm-hallPlane-buyingScheme__legend-VipPlace" key={placeIndex} onClick={() => {
                   massiveCopy[rowIndex][placeIndex] = "selected"
                   props.setHallPlan(massiveCopy)
                   setCount(prev => prev + 1)
            }}></span>
        }
        if (place  === "selected") {
            return (<span className="showFilm-hallPlane-buyingScheme__legend-selectedPlace" key={placeIndex} onClick={()=> {
                massiveCopy[rowIndex][placeIndex] = props.hallPlan[rowIndex][placeIndex]
                props.setHallPlan(massiveCopy)
            }}></span>)
        }
        if (place === "disabled") {
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
                            <span className="showFilm-hallPlane-buyingScheme__legend-VipPlace-price"> {`Свободно (${props.vipPrice}руб)`}</span>
                        </div>
                        <div className="showFilm-hallPlane-buyingScheme__legend-box">
                            <span className="showFilm-hallPlane-buyingScheme__legend-selectedPlace"></span>
                            <span className="showFilm-hallPlane-buyingScheme__legend-standartPlace-price"> {`Выбрано`}</span>
                        </div>
                        {count > 1 ? 
                         <button
                            onClick={() => {
                                props.setHallPlan(props.initialHallPlan.map(row => [...row]));
                                setCount(1)
                            }}
                            >
                            Отменить выбор
                        </button>
                        : ""}
                    </div>
                </div>
            </main>
        </div>
    )
}

                    