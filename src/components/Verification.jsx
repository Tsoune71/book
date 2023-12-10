import React, { useState } from "react";
import { useGlobalState } from "../data";
import axios from "axios";

const Verification = () => {
    const [see, setSee] = useState(false);
    const setAutorisation = useGlobalState("autorisation")[1];
    const setRight = useGlobalState("right")[1];
    return (
        <div className="contentVerification">
            <svg style={{ minWidth: "150px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.2 59.34">
                <path d="M79.7 59.34H66.44a1.5 1.5 0 0 1 0-3h11.77V22H45.43v35.84a1.49 1.49 0 0 1-1.49 1.5h-9a1.5 1.5 0 0 1-1.49-1.5V20.5a1.49 1.49 0 0 1 1.46-1.5h7.54v-2.87L22.74 3.28 3 16.81v41a1.49 1.49 0 1 1-3 0V16a1.49 1.49 0 0 1 .65-1.23L21.87.26a1.5 1.5 0 0 1 1.66 0l21.23 13.81a1.5 1.5 0 0 1 .67 1.25V19H79.7a1.49 1.49 0 0 1 1.5 1.49v37.35a1.5 1.5 0 0 1-1.5 1.5m-43.3-3h6.05V22H36.4z" />
                <path d="M71.62 29.05H52.08a.75.75 0 0 0-.74.75v19.53a.75.75 0 0 0 .74.75h19.54a.75.75 0 0 0 .74-.75V29.8a.75.75 0 0 0-.74-.75" fill="#ffed00" />
            </svg>
            <div>
                <input id="idSign" placeholder="Identifiant" />
            </div>
            <div>
                <input id="codeSign" type={see ? "text" : "password"} placeholder="Mot de passe" />
                {!see ? (
                    <svg
                        onClick={() => {
                            setSee((prev) => !prev);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                    </svg>
                ) : (
                    <svg
                        onClick={() => {
                            setSee((prev) => !prev);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                )}
            </div>
            <section className="loadingverificationcode">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
            </section>
            <button
                onClick={(e) => {
                    e.target.style.display = "none";
                    document.querySelector(".loadingverificationcode").style.display = "flex";
                    document.querySelector(".errorVerif").innerText = "";
                    axios.post(`${process.env.REACT_APP_IPserver}/user/login`, { id: document.querySelector("#idSign").value, password: document.querySelector("#codeSign").value }).then((res) => {
                        if (res.data.right > 0) {
                            setRight(res.data.right);
                            setAutorisation(true);
                        } else {
                            setTimeout(() => {
                                e.target.style.display = "block";
                                document.querySelector(".loadingverificationcode").style.display = "none";
                                document.querySelector(".errorVerif").innerText = "Identifiant ou Mot de passe Invalide !";
                            }, 2000);
                        }
                    });
                }}
            >
                VALIDER
            </button>
            <h3 className="errorVerif"></h3>
        </div>
    );
};

export default Verification;
