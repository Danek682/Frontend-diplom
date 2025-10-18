import { useState } from 'react'
import './Overview.css'
import { Link } from "react-router-dom"
export function OverView (props) {

    const dates = [
        {labelDate:"6, пн", value:"2025-10-06", status: "weekday"},
        {labelDate:"7, вт", value:"2025-10-07", status: "weekday"},
        {labelDate:"8, ср", value:"2025-10-08", status: "weekday"},
        {labelDate:"9, чт", value:"2025-10-09", status: "weekday"},
        {labelDate:"10, пт", value:"2025-10-10", status: "weekday"},
        {labelDate:"11, сб", value:"2025-10-11", status: "holiday"},
        {labelDate:"12, вс", value:"2025-10-12", status: "holiday"}
    ]

    const [valueDate, setValueDate] = useState("") 

    return (
        <div className='app'>
          <header className='header'>
            <div className='header__container'>
                <Link to="/">
                    <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                </Link>
                <Link to="/signin">
                    <button className='button-login'>Войти</button>
                </Link>
            </div>
          </header>
          <nav className="nav">
        {dates.map((date,index)=> (
            <main key={index}>
                <div className='nav-dates'>
                {date.status === "holiday" ? 

                <button className={`nav-dates-button--holiday ${valueDate === date.value ? "nav-dates-button--holiday-active" : "" }`} 
                onClick={() => {
                setValueDate(date.value)
                }}>{date.labelDate}</button> 

                : <button className={`nav-dates-button ${valueDate === date.value ? "nav-dates-button-active" : ""}`} onClick={()=> {
                    setValueDate(date.value)
                }}>{date.labelDate}</button>}
            </div> 

            </main>
            
        ))}
        </nav>
        </div>       
    )
}
