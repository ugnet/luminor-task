import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { HomeScreen } from "./navigation/HomeScreen";
import { store } from "./state/store";
import theme from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* Did not add Router, since it's a one page aplication */}
        <HomeScreen />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
