import "./ModalWindowAddSeance.css"
import axios from "axios"
import { useState } from "react"

export function ModalWindowAddSeance (props) {
    const [error, setError] = useState("noneError")
    const [errorVlaue, setErrorValue] = useState("")
    return (
        <div className="addSeanseModal">
                        <div className="addSeanseModal-header">
                            <h2 className="addSeanseModal-header__heading">Добавление сеанса</h2>
                            <button className="addSeanseModal-buttonClose">
                                <img src="/close.png" alt="крестик" className="addFilmModal-buttonClose-img" onClick={() => { props.setModalVisible(false)}}/>
                            </button>
                        </div>
                        <form className="addSeanse-form" onSubmit={(e)=> {
                            e.preventDefault();
                            if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(props.time)) {
                                setError("error")
                                setErrorValue("Введите корректное время в формате ЧЧ:ММ")
                                props.setTime("")
                                setTimeout(() => {
                                            setErrorValue("")
                                            setError("noneError")
                                        }, 3000);
                                return
                            }
                            axios.post("https://shfe-diplom.neto-server.ru/seance",{
                                seanceHallid: Number(props.dropHall.id),
                                seanceFilmid: Number(props.draggedFilm.id),
                                seanceTime: props.time
                            })
                            .then(response => {
                                console.log(response.data)
                                if(response.data.success === false) {
                                    setError("error")
                                    setErrorValue(response.data.error)
                                }
                                if(response.data.success === true) {
                                    setError("success")
                                    setErrorValue("Сеанс успешно добавлен")
                                }
                            }).catch(error => {
                                console.log(error)
                            })
                        }}>
                            <div className="addSeanse-form-hallName">
                                <label htmlFor="seanceHall" className="addSeanse-form-hallName-label">Название зала</label>
                                <input type="text" name="seanceHall" id="seanceHall" className="addSeanse-form-hallName-input" value={props.dropHall?.hall_name} readOnly/>
                            </div>
                            <div className="addSeanse-form-filmName">
                                <label htmlFor="seanceHall" className="addSeanse-form-filmName-label">Название фильма</label>
                                <input type="text" name="seanceHall" id="seanceHall" className="addSeanse-form-filmName-input" value={props.draggedFilm?.film_name} readOnly/>
                            </div>
                            <div className="addSeance-form-seanceTime">
                                <label htmlFor="seanceTime" className="addSeanse-form-seanceTime-label">Время начала</label>
                                <input type="text" name="seanceTime" id="seanceTime" className="addSeanse-form-seanceTime-input" value={props.time}  onChange={(e)=> (props.setTime(props.checkTime(e.target.value)))} placeholder={`Например: "08:00"`}/>
                            </div>
                                <span className={error}>{errorVlaue}</span>
                            <div className="addSeanse-form-buttons">
                                <button type="submit" className="addSeanse-form-buttons-send" onClick={()=> {
                                    props.checkTime(props.time)
                                }}>Отправить</button>
                                <button type="reset" className="addSeanse-form-buttons-reset" onClick={() => {
                                    props.setModalVisible(false)
                                    setError("noneError");
                                    props.setTime("")
                                }}>Отменить</button>
                            </div>
                        </form>
                    </div>
    )
}