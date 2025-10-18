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

    const activeDate = dates.find(d => d.value === valueDate)

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
                <div className='nav-dates' key={index}>
                {date.status === "holiday" ? 

                <button className={`nav-dates-button--holiday ${valueDate === date.value ? "nav-dates-button--holiday-active" : "" }`} 
                onClick={() => {
                setValueDate(date.value)
                }}>{date.labelDate}</button> 

                : <button className={`nav-dates-button ${valueDate === date.value ? "nav-dates-button-active" : ""}`} onClick={()=> {
                    setValueDate(date.value)
                }}>{date.labelDate}</button>}
            </div> 
        ))}
        </nav>
        <main className='seances'>
            {activeDate ? 
                <div className='seance-wrapper'>{
                    props.result?.films.map((films,index)=> (
                        <div className='seance-box' key={index}>
                            <div className='seance-box__info'>
                                <img src={films.film_poster} alt="Постер фильма" className='filmPosters'/>
                                <div className='seance-box__info-descriptions'>
                                    <h2 className='seance-box__info-descriptions-filmName'>{films.film_name}</h2>
                                    <p className='seance-box__info-descriptions-filmDescription'>{films.film_description}</p>
                                    <div className='seance-box__info-descriptions-durationAndOrigins'>
                                        <span className='seance-box__info-descriptions-duration'>
                                            {`${films.film_duration} минут`}
                                        </span>
                                        <span className='seance-box__info-descriptions-duration-origin'>
                                            {`${films.film_origin}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             : ""}
        </main>
        </div>       
    )
}
