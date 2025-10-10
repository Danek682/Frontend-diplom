import {  use, useEffect, useState } from "react";
import axios from "axios";
import Modal  from "react-modal"
import "./ConfigureFilms.css"
Modal .setAppElement("#root");
import { ModalWindow } from "../ConfigureFilms/ModalWindow";
export function ConfigureFilms () {
    const [visible, setVisible] = useState(false);
    const [films, setFilms] = useState([]);

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
                    {films.map ((h,index)=> (
                        <div className="filmBox" key={index}>
                            <img src={h.film_poster} alt="постер фильма" className="filmPoster"/>
                            <div className="filmBox-content">
                            <span className="filmBox-content-filmName">{h.film_name}</span>
                            <span className="filmBox-content-filmDuration">{`${h.film_duration} минут`}</span>
                            <button className="deleteButton" onClick={()=> {
                                deleteFilm(h.id)
                            }}>
                                <img className="bashImage" src="/bash.png" alt="Удалить"/>
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}