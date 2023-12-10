import { createGlobalState } from "react-hooks-global-state";
export const { GlobalStateProvider, useGlobalState } = createGlobalState({
    right:0,
    autorisation: false,
    bookingFound: [],
    where: 0,
    date: [0, 0, 0],
});
