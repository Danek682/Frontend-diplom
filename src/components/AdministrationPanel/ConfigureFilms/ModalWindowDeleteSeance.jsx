import { useState } from "react"
import "./ModalWindowDeleteSeance.css"
import axios from "axios"
export function ModalWindowDeleteSeance (props) {
const [error,setError] = useState("noneError")
const [errorValue, setErrorValue] = useState("")
    function deleteSeance (hallId) {
        axios.delete(`https://shfe-diplom.neto-server.ru/seance/${hallId}`)
        .then(response => {
            console.log(response.data)
            if(response.data.success === true) {
                setError("success")
                setErrorValue("Сеанс успешно удален!")
            }
            if(response.data.success === false) {
                setError("error")
                setErrorValue("Ошибка в удалении сеанса")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="deleteSeanceModal"> 
            <div className="deleteSeanceModal-header">
                <h2 className="deleteSeanceModal-header__heading">Удаление сеанса</h2>
                <button className="deleteSeanseModal-buttonClose">
                     <img src="close.png" alt="крестик" className="addFilmModal-buttonClose-img" onClick={() => { props.setModalVisibleSeance(false)}}/>
                </button>
            </div>
            <div className="deleteSeanceModal-wrapper">
                <span className="deleteSeanceModal-span-filmName">Вы дейтсвительно хотите снять с сеанса фильм: 
                <span className="deleteSeanceModal-filmName">
                    &nbsp;"{props.filmNameIsSeance}"?
                </span>
            </span>
            </div>
            <span className={error}>{errorValue}</span>
            <div className="deleteSeanceModal-buttons">
                <button type="send" className="deleteSeanceModal-buttons-send" onClick={()=> {
                    deleteSeance(props.seanceDraggbleId)
                }}>Отправить</button>
                <button type="reset" className="deleteSeanceModal-buttons-reset"
                onClick={()=> {props.setModalVisibleSeance(false)}} >Отмена</button>
            </div>
        </div>
    )
}