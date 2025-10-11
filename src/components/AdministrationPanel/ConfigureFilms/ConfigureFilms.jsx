import {  use, useEffect, useState } from "react";
import axios from "axios";
import Modal  from "react-modal"
import "./ConfigureFilms.css"
Modal .setAppElement("#root");
import { ModalWindow } from "../ConfigureFilms/ModalWindow";
export function ConfigureFilms () {
    const [visible, setVisible] = useState(false);
    const [films, setFilms] = useState([]);
    const [result,setResult] = useState([]) //ответ от сервера

    function deleteFilm(filmId) {
        axios.delete(`https://shfe-diplom.neto-server.ru/film/${filmId}`)
        .then(response => {
            console.log(response.data)
            setFilms(response.data.result.films)
        }).catch(error => (
            console.log(error)
        ))
    }

    useEffect(()=> {
        if (!visible) {
            axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
                setFilms(response.data.result.films)
            })
        }
    },[visible])

    useEffect(()=> {
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            setResult(response.data.result)
        })
    })

    return (
        <div className="configureFilms__content">
            <div className="configureFilms__addFilms">
                <button className="configureFilms__addFilms-button" onClick={() => {
                    setVisible(true)
                }}> Добавить фильм</button>
                <Modal  
                isOpen = {visible} 
                onRequestClose={() => {setVisible(false)}}
                className={{
                            base: "modalContent", 
                            afterOpen: "modalContent_after-open",
                            beforeClose: "modalContent_before-close",
                            }}
                            overlayClassName={{ //фон
                            base: "modalOverlay",
                            afterOpen: "modalOverlay_after-open",
                            beforeClose: "modalOverlay_before-close",
                        }}
                closeTimeoutMS={300} // время для анимации закрытия
                > 
                    <ModalWindow visible = {visible} setVisible = {setVisible} setFilms = {setFilms}/>
                </Modal >
            </div>
            <div className="films">
                <div className="films-wrapper">
                    {films.map ((h, index)=> (
                        <div className="filmBox" key={index}>
                            <img src={h.film_poster} alt="постер фильма" className="filmPoster"/>
                            <div className="filmBox-content">
                            <span className="filmBox-content-filmName">{h.film_name}</span>
                            <span className="filmBox-content-filmDuration">{`${h.film_duration} минут`}</span>
                            <button className="deleteButton" onClick={()=> {
                                deleteFilm(h.id)
                            }}>
                                <img className="bashImage" src="bash.png" alt="Удалить"/>
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="halls">
                    {result.halls?.map((hall, hallIndex)=> {
                        const seances = result.seances?.filter(seance => seance.seance_hallid === hall.id); //?. — чтобы избежать ошибки, пока result ещё undefined (до загрузки данных).
                        return (
                            <div className="halls-block" key={hallIndex}>
                                <h2 className="halls-block-name">{hall.hall_name}</h2>
                                <div className="hallls-block-timeline"> {
                                    seances.length > 0 ? 
                                    seances.map((seance, seanceIndex)=> {
                                        const film = result.films?.find(film => film.id === seance.seance_filmid);
                                        const filmIsHall = film?.film_name
                                        const timeIsFilm  = seance?.seance_time
                                        return (
                                            <div key={seanceIndex}>
                                            <div className="hallls-block-timeline-film">{filmIsHall}</div>
                                                <span className="hallls-block-timeline-time">{timeIsFilm}</span>
                                            </div>
                                        )
                                    })
                                    : "Нет сеансов"
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}



        




{/* {result.halls?.map((h,index)=> { ?. — чтобы избежать ошибки, пока result ещё undefined (до загрузки данных).
let seance = result.seances?.filter(seance => seance.seance_hallid === h.id)
    return (
    <div className="halls-block" key={index}>
        <h2 className="halls-block-name">{h.hall_name}</h2>
    </div>
)
})} */}