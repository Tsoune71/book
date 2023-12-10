import React, { useState } from "react";
import { isNumber } from "../function";
import axios from "axios";
import { useGlobalState } from "../data";

const Admin = () => {
    const [salle, setSalle] = useState("");
    const [needAsk, setNeedAsk] = useState(true);
    const [dispo, setDispo] = useState(true);
    const [size, setSize] = useState("");
    const setWhere = useGlobalState("where")[1];


    function loadRoom(e) {
        if (isNumber(salle)) {
            axios.post(`${process.env.REACT_APP_IPserver}/room/getRoom`, { room: salle }).then((res) => {
                if (res.data) {
                    setSize(res.data.size);
                    setNeedAsk(res.data.needAsk);
                    setDispo(res.data.available);
                }
            });
        }
    }

    function updateCreate(e) {
        if (size && salle) {
            axios.post(`${process.env.REACT_APP_IPserver}/room/create`, { room: salle, size, needAsk, available: dispo }).then((res) => {
                if (res.data) {
                    alert("salle mise à jour ou la salle a été créer");
                } else {
                    alert("une erreur est survenu");
                }
            });
        } else {
            alert("données invalides");
        }
    }

    return (
        <div className="contentAdmin">
            <button onClick={() => {setWhere(0)}} style={{zIndex:10,cursor:'pointer',fontWeight :800,color:'black',position:'absolute',backgroundColor:'white',margin:'30px auto',padding:'10px 30px'}}>RETOUR</button>
            <div>
                <h2>Demandes réservation</h2>
                <section className="adminrequest">
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                    <section>
                        <p>reunio profs fafugaeuifh feoahfoaefhoae feosksyrktysktsktktsktsktktsktsuktsktsktuktsuktsuktu ktukstuyjtsyjtyjtsyjtsyjtyjtyjtyjuab</p>
                        <h4>salle 205</h4>
                        <h3>8:00 - 12:30</h3>
                        <button>VALIDER</button>
                        <button>REFUSER</button>
                    </section>
                </section>
            </div>
            <div className="createRoom">
                <input
                    onChange={(e) => {
                        setSalle(e.target.value);
                    }}
                    id="adminNumSalle"
                    type="text"
                    placeholder="Numero de la salle"
                />
                <button onClick={loadRoom}>CHARGER LA SALLE {salle}</button>
                <section>
                    <h4>besoin de demander</h4>
                    <button
                        onClick={() => {
                            setNeedAsk((prev) => !prev);
                        }}
                        style={{ backgroundColor: needAsk && "white", color: needAsk && "rgb(21, 21, 23)" }}
                    >
                        OUI
                    </button>
                    <button
                        onClick={() => {
                            setNeedAsk((prev) => !prev);
                        }}
                        style={{ backgroundColor: !needAsk && "white", color: !needAsk && "rgb(21, 21, 23)" }}
                    >
                        NON
                    </button>
                </section>
                <section>
                    <h4>salle disponible</h4>
                    <button
                        onClick={() => {
                            setDispo((prev) => !prev);
                        }}
                        style={{ backgroundColor: dispo && "white", color: dispo && "rgb(21, 21, 23)" }}
                    >
                        OUI
                    </button>
                    <button
                        onClick={() => {
                            setDispo((prev) => !prev);
                        }}
                        style={{ backgroundColor: !dispo && "white", color: !dispo && "rgb(21, 21, 23)" }}
                    >
                        NON
                    </button>
                </section>
                <section>
                    <h4>capacité</h4>
                    <input
                        type="text"
                        onChange={(e) => {
                            if (e.nativeEvent.data !== null) {
                                if (isNumber(e.nativeEvent.data)) {
                                    setSize((prev) => prev + e.nativeEvent.data);
                                }
                            } else {
                                const n = size.slice(0, size.length - 1);
                                setSize(n);
                            }
                        }}
                        value={size}
                    />
                </section>
                <button onClick={updateCreate}>CREER OU MODIFIER LA SALLE</button>
            </div>
        </div>
    );
};

export default Admin;
