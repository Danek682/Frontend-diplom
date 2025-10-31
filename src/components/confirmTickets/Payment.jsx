import axios from "axios"
import "./Payment.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
export function Payment (props) {
    const navigate = useNavigate();
    const [classNameError, setClassNameError] = useState("errorNone")
    const [errorValue, setErrorValue] = useState("")
    return (
        <div className="payment">
            <header className="payment-header"> 
                <Link to="/">
                    <button onClick={()=> {
                        props.setSelectedSeats([])
                    }} className="logobutton">
                        <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                    </button>
                </Link>
            </header>
            <main className="payment-wrapper">
                <div className="payment-wrapper__header">
                    <h1 className="payment-wrapper__header-heading">Вы выбрали билеты:</h1>
                </div>
                <div className="line"></div>
                <div className="payment-main">
                    <div className="payment-main__ticketInfo">
                        <span className="payment-main__filmName">На фильм: <span className="filmName-main">{props.filmName}</span></span>
                        <span className="payment-main__seats">Места: <span className="seats-main">
                            {props.selectedSeats.map((place)=> place.place).sort((a,b)=> a - b).join(", ")}
                        </span></span>
                        <span className="payment-hall">В зале: <span className="hall-main">{props.hallName}</span></span>
                        <span className="seance-timeStart">Начало сеанса: <span className="timeStart-main">{props.seacneStart}</span></span>
                        <span className="price-count">Стоимость: <span className="price-count-main">{`${props.priceForTickets} рублей`}</span></span>
                </div>
                        <span className={classNameError}>{errorValue}</span>
                    <div className="payment-main__button">
                        <button className="button" onClick={()=> {
                            axios.post("https://shfe-diplom.neto-server.ru/ticket", {
                                seanceId: props.seanceId,
                                ticketDate: props.valueDate,
                                tickets: JSON.stringify(props.selectedSeats)
                                })
                                .then(response => {
                                    if(response.data.success === false) {
                                        setClassNameError("errorTrue")
                                        setTimeout(() => {
                                            setClassNameError("errorNone")
                                        }, 3000);
                                        setErrorValue(response.data.error)
                                        return
                                    } 
                                (navigate("/QrCode"))
                                console.log(response.data);
                                })
                                .catch(error => {
                                console.log(error);
                                });
                        }} >Получить код бронирования</button>
                    </div>
                    <div className="payment-main-info">
                        <span className="payment-main-infoHeading">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал</span>
                        <span className="payment-main-infoHeading">Приятного просмотра!</span>
                    </div>
                </div>
            </main>
        </div>
    )
}