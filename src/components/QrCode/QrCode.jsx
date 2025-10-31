import "./QrCode.css"
import { Link } from "react-router"
import { QRCodeCanvas } from "qrcode.react"
export function QrCode(props) {
    const ticketData = {
        filmName: props.filmName,
        hallName: props.hallName,
        seanceTime: props.seacneStart,
        seats: props.selectedSeats.map((s,)=> (`Ряд ${s.row}, места/место ${s.place}`)).join(", "),
        price: props.priceForTickets,
        date: props.valueDate,
    }
    const qrText = JSON.stringify(ticketData);
    return (
        <div className="qrcode">
            <header className="qrcode-header">
                <Link to="/">
                    <button onClick={()=> {
                        props.setSelectedSeats([])
                    }} className="logobutton">
                        <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                    </button>
                </Link>
            </header>
            <main className="qrcode-wrapper">
                 <div className="qrcode-wrapper__header">
                    <h1 className="qrcode-wrapper__header-heading">Электронный билет</h1>
                </div>
                <div className="line"></div>
                <div className="qrcode-main">
                    <div className="qrcode-main-ticketinfo">
                        <span className="payment-main__filmName">На фильм: <span className="filmName-main">{props.filmName}</span></span>
                        <span className="payment-main__seats">Места: <span className="seats-main">
                            {props.selectedSeats.map((place)=> place.place).sort((a,b)=> a - b).join(", ")}
                        </span></span>
                        <span className="payment-hall">В зале: <span className="hall-main">{props.hallName}</span></span>
                        <span className="seance-timeStart">Начало сеанса: <span className="timeStart-main">{props.seacneStart}</span></span>
                    </div>
                    <div className="qrCode">
                        <QRCodeCanvas
                        value={qrText}
                        size={256}
                        bgColor="#fff"
                        fgColor="#000"
                        />
                    </div>
                    <div className="qrcode-info">
                        <span className="qrcode-info__ticket-hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</span>
                        <span className="qrcode-info__ticket-hint">Приятного просмотра!</span>
                    </div>
                </div>
            </main>
        </div>
    )
}