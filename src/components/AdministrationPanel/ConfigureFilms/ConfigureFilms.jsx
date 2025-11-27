import {useEffect, useState } from "react";
import axios from "axios";
import Modal  from "react-modal"
import "./ConfigureFilms.css"
Modal .setAppElement("#root");
import { ModalWindow } from "../ConfigureFilms/ModalWindow";
import moment from "moment"
import { ModalWindowAddSeance } from "./ModalWindowAddSeance";
import { ModalWindowDeleteSeance } from "./ModalWindowDeleteSeance";
export function ConfigureFilms () {
    const [visible, setVisible] = useState(false);
    const [films, setFilms] = useState([]); //список всех фильмов(box)
    const [result,setResult] = useState([]) //ответ от сервера
    const [draggedFilm, setDraggedFilm] = useState(null) //какой фильм тянется
    const [dropHall, setDropHall] = useState(null) //на какой зал бросили
    const [modalVisible, setModalVisible] = useState(false) //Модальное окно для добавления сеанса
    const [time, setTime] = useState("") //устанавливаемое время сеанса
    const [seanceDraggble, setSeanceDraggble] = useState(null) //Какой сеанс тянется
    const [seanceDraggbleId,setSeanceDraggbleId] = useState(null)
    const [modalVisibleSeance, setModalVisibleSeance] = useState(false)
    const [filmNameIsSeance , setFilmNameIsSeance] = useState("")
    
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
        if (!visible && !modalVisible && !modalVisibleSeance) {
            axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
                setFilms(response.data.result.films)
                setResult(response.data.result)
                console.log(response.data)
            })
        }
    },[visible, modalVisible, modalVisibleSeance])

    
    function handleDragStart (film) {
        setDraggedFilm(film); //перетаскиваемый фильм
    }

     function handleDragStartSeance (seance) {
        setSeanceDraggble(seance); //перетаскиваемый сеанс
    }

    function handleDragEndSeance() {
        setSeanceDraggble(null)
    }

    function handleDragOver(e) { //Разрешаем бросание на timeline
        e.preventDefault()
    }

    function handleDropFilm(hall) { //при отпускании сохраняем зал и открываем окно
        setDropHall(hall);
        setModalVisible(true)
    }

    function handleDropSeance(seance,film,seanceId) {
        setSeanceDraggble(seance);
        setModalVisibleSeance(true);
        setFilmNameIsSeance(film)
        setSeanceDraggbleId(seanceId)
    }

    function checkTime(time) {
        if(!/^[0-9:]*$/.test(time)) {
        }
        if (time.length > 5) {
            return time.slice(0,5)
        }
        if (time.length === 5 && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
            return "";
        }
        return time
    }

      function timeToPercent(timeStr) {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(":").map(Number);
        const total = (h || 0) * 60 + (m || 0);
        const day = 24 * 60;
        return (total / day) * 100; }

    // длительность в мин -> ширина в процентах
    function durationToPercent(durationMinutes) {
    const dur = Number(durationMinutes) || 90; // запасная длительность
    const day = 24 * 60;
    return (dur / day) * 100;}
                                            
    function seanceNameLength(name,count) {
        if ( name.length > count) {
            return name.slice(0, count) + "..."
        }
        return name
    }

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
                    <ModalWindow setVisible = {setVisible} setFilms = {setFilms}/>
                </Modal >
            </div>
            <div className="films">
                <div className="films-wrapper">
                    {films.map ((h, index)=> (
                        <div className="filmBox" key={index} draggable onDragStart={() => handleDragStart(h)}>
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
                        const seances = result.seances?.filter(seance => seance.seance_hallid === hall.id).sort((a,b)=> moment(a.seance_time, "HH:mm") - moment(b.seance_time, "HH:mm"))
                        //?. — чтобы избежать ошибки, пока result ещё undefined (до загрузки данных).
                        return (
                            <div className="halls-block" key={hallIndex}>
                                <h2 className="halls-block-name">{hall.hall_name}</h2>
                                 <div className="halls-block-timeline-wrapper">
                                {seanceDraggble ? 
                                <button className="deleteSeance"
                                onDragOver={handleDragOver}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    const film = result.films.find((f)=> f.id === seanceDraggble.seance_filmid)
                                    const filmInSeance = film?.film_name;
                                    const seanceId = seanceDraggble.id;
                                    handleDropSeance(seanceDraggble,filmInSeance,seanceId)
                                }}
                                >
                                    <img className="trashButton" src="delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Удалить" />
                                </button> : ""}
                                <div className="hallls-block-timeline" 
                                onDragOver={handleDragOver} 
                                onDrop={() => handleDropFilm(hall)}
                                > {
                                    seances.length > 0 ? 
                                    seances.map((seance, seanceIndex)=> {
                                            
                                        const film = result.films?.find(f => f.id === seance.seance_filmid);
                                        const filmName = film?.film_name || '';
                                        const startPercent = timeToPercent(seance.seance_time);
                                        const widthPercent = durationToPercent(film?.film_duration);

                                        // если блок выходит за правый край — сдвинуть старт
                                        let adjustedStart = startPercent;
                                        if (adjustedStart + widthPercent > 105) {
                                        adjustedStart = Math.max(0, 102 - widthPercent);
                                        }
                                        // немного отступов от краёв (опционально)
                                        const leftClamped = Math.max(5, adjustedStart);
                                        
                                            return (
                                        <div
                                            key={seanceIndex}
                                            className="hallls-block-timeline-film"
                                            style={{
                                            left: `${leftClamped}%`,
                                            width: `${widthPercent}%`,
                                            position: 'absolute'
                                            }}
                                        >
                                        <button
                                            className="hallls-block-timeline-filmName"
                                            draggable
                                            onDragStart={() => handleDragStartSeance(seance)}
                                            onDragEnd={handleDragEndSeance}>
                                            {seanceNameLength(filmName,20)}
                                        </button>
                                        <span className="hallls-block-timeline-time">{seance.seance_time}</span>
                                        </div>
                                        
                                        )
                                    })
                                    : "Нет сеансов"
                                    }
                                </div>
                                </div>
                            </div>
                        )
                    })}
                    <Modal
                    isOpen = {modalVisibleSeance}
                    onRequestClose={()=>(setModalVisibleSeance(false))}
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
                        closeTimeoutMS={200}
                    >
                        <ModalWindowDeleteSeance 
                        filmNameIsSeance = {filmNameIsSeance}
                        setModalVisibleSeance = {setModalVisibleSeance}
                        seanceDraggbleId = {seanceDraggbleId}
                        />
                    </Modal>
                    <Modal
                    isOpen = {modalVisible}
                    onRequestClose={()=> (setModalVisible(false))}
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
                        closeTimeoutMS={200}
                    >
                     <ModalWindowAddSeance 
                        setModalVisible = {setModalVisible}
                        draggedFilm = {draggedFilm}
                        dropHall = {dropHall}   
                        time = {time}
                        setTime = {setTime}
                        checkTime = {checkTime}
                     />
                    </Modal>
                </div>
            </div>
        </div>
    )
}
