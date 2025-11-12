
import './Overview.css'
import { Link } from "react-router-dom" 
import axios from 'axios'
import moment from 'moment'
import { format, addDays } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useEffect, useState } from 'react'
export function OverView (props) {
    const today = new Date()
    const nextSevenDays = []
    const nextSevenDaysDayOfTheWeek = []
    const nameNextSevenDaysDayOfTheWeek = []
    for (let i = 0; i < 7; i++) {
        const day = addDays(today,i);
        nextSevenDays.push(format(day,"yyyy-MM-dd", {locale: ru}));
        nextSevenDaysDayOfTheWeek.push(format(day,"dd, EEEEEE",{locale: ru}))
        nameNextSevenDaysDayOfTheWeek.push(format(day,"EEEEEE",{locale: ru}))
    }
    function checkDay (date) {
        if (date === "сб" || date === "вс") {
            return "holiday"
        } else {
            return "weekday"
        }
    }

    const dates = [
        {labelDate:"Сегодня", value:nextSevenDays[0], status: checkDay(nameNextSevenDaysDayOfTheWeek[0])},
        {labelDate:nextSevenDaysDayOfTheWeek[1], value:nextSevenDays[1], status: checkDay(nameNextSevenDaysDayOfTheWeek[1])},
        {labelDate:nextSevenDaysDayOfTheWeek[2], value:nextSevenDays[2], status: checkDay(nameNextSevenDaysDayOfTheWeek[2])},
        {labelDate:nextSevenDaysDayOfTheWeek[3], value:nextSevenDays[3], status: checkDay(nameNextSevenDaysDayOfTheWeek[3])},
        {labelDate:nextSevenDaysDayOfTheWeek[4], value:nextSevenDays[4], status: checkDay(nameNextSevenDaysDayOfTheWeek[4])},
        {labelDate:nextSevenDaysDayOfTheWeek[5], value:nextSevenDays[5], status: checkDay(nameNextSevenDaysDayOfTheWeek[5])},
        {labelDate:nextSevenDaysDayOfTheWeek[6], value:nextSevenDays[6], status: checkDay(nameNextSevenDaysDayOfTheWeek[6])}
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

    useEffect(()=>{
        if (!props.valueDate) {
            props.setValueDate(dates[0].value)
        }
    },[props.valueDate,dates])


    return (
        <div className='app'>
          <header className='header'>
            <div className='header__container'>
                <Link to="/Frontend-diplom/">
                    <img src="gotocinema.png" alt="Логотип кинотеатра" />
                </Link>
                <Link to="/Frontend-diplom/signin">
                    <button className='button-login'>Войти</button>
                </Link>
            </div>
          </header>
          <nav className="nav">
        {dates.map((date,index)=> (
            <div className='nav-dates' key={index}>
                {date.status === "holiday"?
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
                                            const isToday = props.valueDate === dates[0].value
                                            const now = new Date()
                                            const timeNow = format(now, "HH:mm",{locale: ru})
                                            const bunttonClass = seacne.seance_time < timeNow && isToday ? "seances-box-seanceTime-buttonNone" : "seances-box-seanceTime-button" 
                                            const isDisabled = seacne.seance_time < timeNow && isToday ? true : false
                                            return ( 
                                                <div key={index}>
                                                    <Link to={`/Frontend-diplom/film/${props.valueDate}`}>
                                                    <button disabled={isDisabled} onClick={() => {
                                                    console.log(seacne.id, String(props.valueDate))
                                                    props.setFilmName(films.film_name)
                                                    props.setSeanceStart(seacne.seance_time)
                                                    props.setSeanceId(seacne.id)
                                                    props.setHallName(hall.hall_name)
                                                    props.setStandartPrice(hall.hall_price_standart)
                                                    props.setVipPrice(hall.hall_price_vip)
                                                    getHallPlan(seacne.id, String(props.valueDate))
                                                    }} className={bunttonClass}>{seacne.seance_time}</button> 
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

