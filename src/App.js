import { useGlobalState } from "./data";
import Home from "./pages/Home";
import Verification from './components/Verification'

const App = () => {
    const autorisation = useGlobalState("autorisation")[0];
    return <div className="App">{autorisation ? <Home /> : <Verification/>}</div>;
};

export default App;
