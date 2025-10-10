import {  use, useEffect, useState } from "react";
import axios from "axios";
import Modal  from "react-modal"
import "./ConfigureFilms.css"
Modal .setAppElement("#root");
import { ModalWindow } from "../ConfigureFilms/ModalWindow";
export function ConfigureFilms () {
    const [visible, setVisible] = useState(false)
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
                    <ModalWindow visible = {visible} setVisible = {setVisible}/>
                </Modal >
            </div>
            <div>
                
            </div>
        </div>
    )
}