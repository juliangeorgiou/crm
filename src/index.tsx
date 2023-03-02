import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from "styled-components"
import { ThemeContext, lightTheme, darkTheme } from "./theme"
import Routes from './components/Routes.jsx'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function ThemeWrapper(){
  //provide context, source of data
  const [theme, setTheme] = useState(lightTheme)
  return <ThemeContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={theme}><Routes /></ThemeProvider>
  </ThemeContext.Provider>
}

root.render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);