import React, { useEffect, useState } from "react";
import { useGlobalState } from "../data";

const Calendar = () => {
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const [monthNumber, setMonthNnumber] = useState(0);
    const [param, setParam] = useState(0);
    const [year, setYear] = useState(0);
    const setDate = useGlobalState("date")[1];
    const setWhere = useGlobalState("where")[1];
    const right = useGlobalState("right")[0];
    function viewOfDay(event) {
        let d = event.target.getAttribute("data");
        d = d.split(",");
        let dd = [];
        for (const c of d) {
            dd.push(+c);
        }
        setDate(dd);
        setWhere(1);
    }

    function load21Day(day, d, m, y) {
        const nbDays = new Date(y, m, 0).getDate();
        setMonthNnumber(m - 1);
        setYear(y);
        var myDiv = document.querySelector(".dateApp");
        while (myDiv.firstChild) {
            myDiv.removeChild(myDiv.firstChild);
        }
        for (let i = 0; i < 7; i++) {
            const d = document.createElement("section");
            const n = document.createElement("h3");
            n.innerText = days[i];
            d.appendChild(n);
            document.querySelector(".dateApp").appendChild(d);
        }
        for (let i = 0; i < day - 1; i++) {
            const d = document.createElement("div");
            d.setAttribute("class", "divEmptyDate");
            document.querySelector(".dateApp").appendChild(d);
        }
        for (let i = d; i < nbDays + 1; i++) {
            let day = i;
            let month = m;
            let ye = y;
            if (day > nbDays) {
                day -= nbDays;
                month += 1;
            }
            if (month === 13) {
                month = 1;
                ye += 1;
            }
            const d = document.createElement("div");
            d.setAttribute("data", `${day},${month},${ye}`);
            d.addEventListener("click", viewOfDay);
            const n = document.createElement("h3");
            n.innerText = day;
            d.appendChild(n);
            document.querySelector(".dateApp").appendChild(d);
        }
    }

    useEffect(() => {
        let monthAllReady = new Date().getMonth();
        let yearAllReady = new Date().getFullYear();
        yearAllReady += parseInt((monthAllReady + param) / 12);
        monthAllReady = (monthAllReady + param) % 12;
        load21Day(new Date(yearAllReady, monthAllReady, 1).getDay(), 1, monthAllReady + 1, yearAllReady);
    }, [param]);
    return (
        <div className="contentApp">
            {right === 2 && (
                <svg
                    onClick={() => {
                        setWhere(3);
                    }}
                    style={{ width: "50px", position: "absolute", top: "20px", left: "20px", cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="white"
                    className="svgOnTopCalendar"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )}
            {right === 1 && (
                <svg
                    style={{ padding:'15px', width: "50px", position: "absolute", top: "20px", right: "20px", cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#2D2D34"
                    className="svgOnTopCalendar"
                >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
            )}

            <svg id="logoFirstWind" className="logoApp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.2 59.34">
                <path d="M79.7 59.34H66.44a1.5 1.5 0 0 1 0-3h11.77V22H45.43v35.84a1.49 1.49 0 0 1-1.49 1.5h-9a1.5 1.5 0 0 1-1.49-1.5V20.5a1.49 1.49 0 0 1 1.46-1.5h7.54v-2.87L22.74 3.28 3 16.81v41a1.49 1.49 0 1 1-3 0V16a1.49 1.49 0 0 1 .65-1.23L21.87.26a1.5 1.5 0 0 1 1.66 0l21.23 13.81a1.5 1.5 0 0 1 .67 1.25V19H79.7a1.49 1.49 0 0 1 1.5 1.49v37.35a1.5 1.5 0 0 1-1.5 1.5m-43.3-3h6.05V22H36.4z" />
                <path d="M71.62 29.05H52.08a.75.75 0 0 0-.74.75v19.53a.75.75 0 0 0 .74.75h19.54a.75.75 0 0 0 .74-.75V29.8a.75.75 0 0 0-.74-.75" fill="#ffed00" />
            </svg>
            <div className="dataApp">
                <button
                    onClick={() => {
                        setParam((prev) => prev - 1);
                    }}
                >
                    Mois précédent
                </button>
                <h3>{months[monthNumber % 12]}</h3>
                <h3> {year} </h3>
                <button
                    onClick={() => {
                        setParam((prev) => prev + 1);
                    }}
                >
                    Mois prochain
                </button>
            </div>
            <div className="dateApp"></div>
        </div>
    );
};

export default Calendar;
