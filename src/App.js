import "./App.css";
import GreekKeyboard from "./pages/GreekKeyboard";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <GreekKeyboard />
    </Provider>
  );
}

export default App;
