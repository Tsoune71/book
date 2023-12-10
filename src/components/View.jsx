import React, { useEffect } from "react";
import { useGlobalState } from "../data";
import axios from "axios";

const View = () => {
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "décenbre"];
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const [bookingFound, setBookingFound] = useGlobalState("bookingFound");
    const date = useGlobalState("date")[0];
    const setWhere = useGlobalState("where")[1];

    useEffect(() => {
        const [day, month, year] = date;
        if (day && month && year) {
            axios.post(`${process.env.REACT_APP_IPserver}/schedule/getDay`, { day, month, year }).then((res) => {
                if (res.data) {
                    let step = [];
                    for (const schud of res.data) {
                        step.push({ start: schud.start, end: schud.end, reason: schud.reason, room: schud.room });
                    }
                    setBookingFound(step);
                }
            });
        }
    }, []);

    return (
        <div className="contentView">
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
                        setWhere(2);
                    }}
                >
                    RESERVER
                </button>
            </div>
            <h1 style={{ userSelect: "none", width: "100%", textAlign: "center", fontWeight: 100, color: "rgb(21, 21, 23)" }}>
                réservations du {date[0]} / {date[1]} / {date[2]}
            </h1>
            <div className="hours">
                {bookingFound.length === 0 && <h2 style={{ color: "rgb(20,20,20)" }}>auncune réservation</h2>}
                {bookingFound.map((data, key) => (
                    <div key={key}>
                        <h3>
                            {" "}
                            {data.start}h - {data.end}h
                        </h3>
                        <h5>{data.reason}</h5>
                        <h2>salle {data.room}</h2>
                    </div>
                ))}
            </div>
            <div className="reserve"></div>
        </div>
    );
};

export default View;
