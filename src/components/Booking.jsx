import React, { useState } from "react";
import { useGlobalState } from "../data";
import axios from "axios";

const Booking = () => {
    const date = useGlobalState("date")[0];
    const setWhere = useGlobalState("where")[1];
    const [room, setRoom] = useState("");
    const [askbutton, setAskbutton] = useState(false);
    const [hoursMin, setHourMin] = useState([0, 0, 0, 0]);
    const [roomPos, setRoomPos] = useState([]);

    function searchScedules(event) {
        const [hStart, mStart] = document.querySelector("#inputstartBook").value.split(":");
        const [hEnd, mEnd] = document.querySelector("#inputendBook").value.split(":");
        if (hStart && mStart && hEnd && mEnd) {
            setHourMin([hStart, mStart, hEnd, mEnd]);
            axios.post(`${process.env.REACT_APP_IPserver}/schedule/availableScedule`, { hour: [hStart, mStart, hEnd, mEnd], date }).then((res) => {
                setRoomPos(res.data);
            });
        }
    }

    function book(event) {
        setRoom(event.target.getAttribute("room"));
        document.querySelector('.sendBooking').style.display = 'block'
    }

    function ask(event) {
        setRoom(event.target.getAttribute("room"));
    }

    return (
        <div className="contentBooking">
            <div className="navbarView">
                <button
                    onClick={() => {
                        setWhere(0);
                    }}
                >
                    RETOUR
                </button>
                <svg className="logoApp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.2 59.34">
                    <path d="M79.7 59.34H66.44a1.5 1.5 0 0 1 0-3h11.77V22H45.43v35.84a1.49 1.49 0 0 1-1.49 1.5h-9a1.5 1.5 0 0 1-1.49-1.5V20.5a1.49 1.49 0 0 1 1.46-1.5h7.54v-2.87L22.74 3.28 3 16.81v41a1.49 1.49 0 1 1-3 0V16a1.49 1.49 0 0 1 .65-1.23L21.87.26a1.5 1.5 0 0 1 1.66 0l21.23 13.81a1.5 1.5 0 0 1 .67 1.25V19H79.7a1.49 1.49 0 0 1 1.5 1.49v37.35a1.5 1.5 0 0 1-1.5 1.5m-43.3-3h6.05V22H36.4z" />
                    <path d="M71.62 29.05H52.08a.75.75 0 0 0-.74.75v19.53a.75.75 0 0 0 .74.75h19.54a.75.75 0 0 0 .74-.75V29.8a.75.75 0 0 0-.74-.75" fill="#ffed00" />
                </svg>
                <button
                    onClick={() => {
                        setWhere(0);
                    }}
                >
                    ACCUEIL
                </button>
            </div>
            <h1 style={{ margin: "20px 0", userSelect: "none", width: "100%", textAlign: "center", fontWeight: 100, color: "rgb(21, 21, 23)" }}>
                Trouver une salle pour le {date[0]} / {date[1]} / {date[2]}
            </h1>
            <div className="formBooking">
                <label htmlFor="">Début : </label>
                <input type="time" id="inputstartBook" />
                <label htmlFor="">Fin : </label>
                <input type="time" id="inputendBook" />
                <button onClick={searchScedules}>RECHERCHER</button>
            </div>
            <div className="roomDisponible">
                {roomPos.map((data, key) => (
                    <div key={key}>
                        <h3>salle {data.room}</h3>
                        <h3>capacité {data.size}</h3>
                        {data.needAsk ? (
                            <button room={data.room} onClick={ask}>
                                DEMANDER LA SALLE
                            </button>
                        ) : (
                            <button room={data.room} onClick={book}>
                                RESERVER
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="sendBooking">
                <button style={{position:'absolute',left:'40px'}} onClick={() => {document.querySelector('.sendBooking').style.display = 'none'}}>RETOUR</button>
                <h2>Salle {room}</h2>
                <h3>
                    de {hoursMin[0]}:{hoursMin[1]}h à {hoursMin[2]}:{hoursMin[3]}h
                </h3>
                <textarea id="textArea" rows="4" cols="50" placeholder="Description"></textarea>
                {askbutton ? <button>DEMANDER LA SALLE</button> : <button>RESERVER</button>}
            </div>
        </div>
    );
};

export default Booking;
