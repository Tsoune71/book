import React from "react";
import Calendar from "./Calendar";
import View from "../components/View";
import Booking from "../components/Booking";
import { useGlobalState } from "../data";
import Admin from "./Admin";

const Home = () => {
    const where = useGlobalState("where")[0];
    return (
        <div className="contentHome">
            {where === 0 ? <Calendar /> : null}
            {where === 1 ? <View /> : null}
            {where === 2 ? <Booking /> : null}
            {where === 3 ? <Admin /> : null}
        </div>
    );
};

export default Home;
