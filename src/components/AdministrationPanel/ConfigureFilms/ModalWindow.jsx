import { useState } from "react"
import "./ModalWindow.css"
import axios from "axios";
export function ModalWindow (props) {
    const [filmName, setFilmName] = useState(""); //название
    const [filmDuration, setFilmDuration] = useState(0); //продолжительность
    const [filmDescription, setFilmDescription] = useState(""); //описание
    const [filmOrigin, setFilmOrigin] = useState(""); //Страна
    const [filePoster, setFilePoster] = useState(null); //Постер
    const [succesClass, setSuccessClass] = useState("succesUpload-default"); //класс ответа от сервера
    const [successValue, setSuccessValue] = useState("")

    function handleFileChange (event) {
        setFilePoster(event.target.files[0])
    }

    function showFileName () {
        if(!filePoster) {
            return("Выберите постер")
        }
        if(filePoster.name.length > 13) {
           return filePoster.name.slice(0,13) + "..."
        }
        return filePoster.name
        }
    return (
        <div className="addFilmModal">
                        <div className="addFilmModal-header">
                            <span className="addFilmModal-heading">Добавление фильма</span>
                            <button className="addFilmModal-buttonClose">
                                <img src="/close.png" alt="крестик" className="addFilmModal-buttonClose-img" onClick={() => { props.setVisible(false)}}/>
                            </button>
                        </div>
                        <form className="addFilm-form" onSubmit={(e)=> {
                            e.preventDefault()
                            const target = e.target
                            const formData = new FormData(target);
                            const entries = formData.entries();
                            const data = Object.fromEntries(entries);
                            formData.append("filmName", String(filmName));
                            formData.append("filmDuration",Number(filmDuration));
                            formData.append("filmDescription",String(filmDescription));
                            formData.append("filmOrigin",String(filmOrigin));
                            formData.append("filePoster", filePoster);
                            axios.post("https://shfe-diplom.neto-server.ru/film", formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }).then((response) => {
                                console.log(response.data)
                                if (response.data.success === false) {
                                    setSuccessClass("succesUpload");
                                    setSuccessValue(response.data.error)
                                }
                            }).catch (error => {
                                console.log(error)
                            })
                            if(!filmName || !filmDuration || !filmDescription ||!filmOrigin) {
                                alert("Пожалуйста, заполните все поля!");
                                setFilmName("");
                                setFilmDuration(0);
                                setFilmDescription("");
                                setFilmOrigin("");
                                return
                            }
                            console.log(data);
                        }}>
                            <div className="addFilm-form-filmName">
                                <label htmlFor="filmName" className="addFilm-form-filmName-labbel">Название фильма</label>
                                <input type="text" name="filmName" id="filmName" className="addFilm-form-filmName-input" placeholder = {`Например, "Гражданин Кейн"`} value={filmName} onChange={(e)=> {setFilmName(e.target.value)}}/>
                            </div>
                            <div className="addFilm-form-filmDuration">
                                <label htmlFor="filmDuration" className="addFilm-form-filmDuration-label">Продолжительность фильма</label>
                                <input type="text" name="filmDuration" id="filmDuration" className="addFilm-form-filmDuration-input" value={filmDuration} onChange={(e)=> {setFilmDuration(e.target.value)}}/>
                            </div>
                            <div className="addFilm-form-filmDescription">
                                <label htmlFor="filmDescription" className="addFilm-form-filmDescription-label">Описание фильма</label>
                                <textarea type="text" name="filmDescription" id="filmDescription" className="addFilm-form-filmDescription-input" value={filmDescription} onChange={(e) => {setFilmDescription(e.target.value)}}/>
                            </div>
                            <div className="addFilm-form-filmOrigin">
                                <label htmlFor="filmOrigin" className="addFilm-form-filmOrigin-label">Страна</label>
                                <input type="text" name="filmOrigin" id="filmOrigin" className="addFilm-form-filmOrigin-input" value={filmOrigin} onChange={(e) => {setFilmOrigin(e.target.value)}}/>
                            </div>
                            <span className={succesClass}>{successValue}</span>
                            <div className="addFilm-form-buttons">
                                <button className="addFilm-form-buttonAddFilm">Добавить фильм</button>
                                <label htmlFor="filePoster" className="addFilm-form-DowloadPoster-label"> {showFileName()}</label > 
                                <input type="file" className="addFilm-form-DowloadPoster-input" name="filePoster" id="filePoster" style={{display: 'none'}} onChange={handleFileChange} /> 
                                <button type="reset" className="addFilm-form-buttonCancel" onClick={() => {
                                    props.setVisible(false)
                                }}>Отменить</button>
                            </div>
                            
                        </form>
                    </div>
    )
}