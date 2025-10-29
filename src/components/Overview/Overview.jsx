
import './Overview.css'
import { Link } from "react-router-dom"
import moment from "moment"
import axios from 'axios'
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
    const activeDate = dates.find(d => d.value === props.valueDate)

    function getHallPlan (seanceId,date) {
        axios.get("https://shfe-diplom.neto-server.ru/hallconfig", {
            params: {
                seanceId: seanceId,
                date: date
            }
        }).then((response) => {
            console.log(response.data)
            props.setHallPlan(response.data.result) 
            props.setInitialHallPlan(response.data.result)
        }).catch((error)=> {
            console.log(error)
        })
    }

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

                <button className={`nav-dates-button--holiday ${props.valueDate === date.value ? "nav-dates-button--holiday-active" : "" }`} 
                onClick={() => {
                props.setValueDate(date.value)
                }}>{date.labelDate}</button> 

                : <button className={`nav-dates-button ${props.valueDate === date.value ? "nav-dates-button-active" : ""}`} onClick={()=> {
                    props.setValueDate(date.value)
                }}>{date.labelDate}</button>}
            </div> 
        ))}
        </nav>
        <main className='seances'>
            {activeDate ? 
                <div className='seance-wrapper'>{
                    props.result?.films.map((films,index)=> {
                        return (
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
                           {props.result?.halls.filter((hall => hall.hall_open === 1)).map((hall,hallIndex)=> {
                            const seances = props.result.seances?.filter(seance => seance.seance_hallid === hall.id && seance.seance_filmid === films.id)
                            if(seances.length === 0) {
                                return null
                             }
                            return (
                                <div key={hallIndex} className='seances-box'>
                                    <span className='seances-box-hallName'>{hall.hall_name}</span>
                                    <div className='seances-box-seancesTimes'>
                                        {seances.sort((a,b)=> moment(a.seance_time, "HH:mm") - moment(b.seance_time, "HH:mm"))
                                        .map((seacne,index)=> {
                                            return ( 
                                                <div key={index}>
                                                    <Link to={`/film/${props.valueDate}`}>
                                                    <button onClick={() => {
                                                    console.log(seacne.id, String(props.valueDate))
                                                    props.setFilmName(films.film_name)
                                                    props.setSeanceStart(seacne.seance_time)
                                                    props.setSeanceId(seacne.id)
                                                    props.setHallName(hall.hall_name)
                                                    props.setStandartPrice(hall.hall_price_standart)
                                                    props.setVipPrice(hall.hall_price_vip)
                                                    getHallPlan(seacne.id, String(props.valueDate))
                                                    }} className='seances-box-seanceTime-button'>{seacne.seance_time}</button> 
                                                    </Link>
                                                </div>
                                             )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                           })}

                        </div>
                        )
                    })}
                </div>
             : ""}
        </main>
        </div>       
    )
}

