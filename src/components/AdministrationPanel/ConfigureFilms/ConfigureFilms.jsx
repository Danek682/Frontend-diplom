import {useEffect, useState } from "react";
import axios from "axios";
import Modal  from "react-modal"
import "./ConfigureFilms.css"
Modal .setAppElement("#root");
import { ModalWindow } from "../ConfigureFilms/ModalWindow";
import moment from "moment"
export function ConfigureFilms () {
    const [visible, setVisible] = useState(false);
    const [films, setFilms] = useState([]); //список всех фильмов(box)
    const [result,setResult] = useState([]) //ответ от сервера
    const [draggedFilm, setDraggedFilm] = useState(null) //какой фильм тянется
    const [dropHall, setDropHall] = useState(null) //на какой зал бросили
    const [modalVisible, setModalVisible] = useState(false) //Модальное окно для добавления сеанса
    const [time, setTime] = useState("") //устанавливаемое время сеанса

    const [error, setError] = useState("noneError")
    const [errorVlaue, setErrorValue] = useState("")
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
        if (!visible || !modalVisible) {
            axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
                setFilms(response.data.result.films)
                setResult(response.data.result)
            })
        }
    },[visible,modalVisible])

    useEffect(()=> {
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            setResult(response.data.result)
        })
    },[])
    
    function handleDragStart (film) {
        setDraggedFilm(film); //перетаскиваемый фильм
    }

    function handleDragOver(e) { //Разрешаем бросание на timeline
        e.preventDefault()
    }

    function handleDrop(hall) { //при отпускании сохраняем зал и открываем окно
        setDropHall(hall);
        setModalVisible(true)
    }

    function checkTime(time) {
        if(!/^[0-9:]*$/.test(time)) {
            return ""
        }
        if (time.length > 5) {
            return time.slice(0,5)
        }
        if (time.length === 5 && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
            return "";
        }
        return time
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
                                <div className="hallls-block-timeline" 
                                onDragOver={handleDragOver} onDrop={() => handleDrop(hall)}
                                > {
                                    seances.length > 0 ? 
                                    seances.map((seance, seanceIndex)=> {
                                        const film = result.films?.find(film => film.id === seance.seance_filmid);
                                        const filmIsHall = film?.film_name
                                        const timeIsFilm  = seance?.seance_time;
                                        
                                        return (
                                            <div className="hallls-block-timeline-film" key={seanceIndex} > 
                                                <button className="hallls-block-timeline-filmName" draggable> {filmIsHall} </button>
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
                     <div className="addSeanseModal">
                        <div className="addSeanseModal-header">
                            <h2 className="addSeanseModal-header__heading">Добавление сеанса</h2>
                            <button className="addSeanseModal-buttonClose">
                                <img src="/close.png" alt="крестик" className="addFilmModal-buttonClose-img" onClick={() => { setModalVisible(false)}}/>
                            </button>
                        </div>
                        <form className="addSeanse-form" onSubmit={(e)=> {
                            e.preventDefault();
                            axios.post("https://shfe-diplom.neto-server.ru/seance",{
                                seanceHallid: Number(dropHall.id),
                                seanceFilmid: Number(draggedFilm.id),
                                seanceTime: time
                            })
                            .then(response => {
                                console.log(response.data)
                                if(response.data.success === false) {
                                    setError("error")
                                    setErrorValue(response.data.error)
                                }
                            }).catch(error => {
                                console.log(error)
                            })
                        }}>
                            <div className="addSeanse-form-hallName">
                                <label htmlFor="seanceHall" className="addSeanse-form-hallName-label">Название зала</label>
                                <input type="text" name="seanceHall" id="seanceHall" className="addSeanse-form-hallName-input" value={dropHall?.hall_name} readOnly/>
                            </div>
                            <div className="addSeanse-form-filmName">
                                <label htmlFor="seanceHall" className="addSeanse-form-filmName-label">Название фильма</label>
                                <input type="text" name="seanceHall" id="seanceHall" className="addSeanse-form-filmName-input" value={draggedFilm?.film_name} readOnly/>
                            </div>
                            <div className="addSeance-form-seanceTime">
                                <label htmlFor="seanceTime" className="addSeanse-form-seanceTime-label">Время начала</label>
                                <input type="text" name="seanceTime" id="seanceTime" className="addSeanse-form-seanceTime-input" value={time}  onChange={(e)=> (setTime(checkTime(e.target.value)))}/>
                            </div>
                                <span className={error}>{errorVlaue}</span>
                            <div className="addSeanse-form-buttons">
                                <button type="submit" className="addSeanse-form-buttons-send">Отправить</button>
                                <button type="reset" className="addSeanse-form-buttons-reset" onClick={() => {
                                    setModalVisible(false)
                                    setError("noneError");
                                    setTime("")
                                }}>Отменить</button>
                            </div>
                        </form>
                    </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
