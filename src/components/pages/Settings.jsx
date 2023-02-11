import React, { useContext } from 'react';
import { Outlet, Link, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { darkTheme, ThemeContext, lightTheme } from '../../theme';

const ThemeBox = styled.nav`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 5mm;
`

const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`

export default function Settings() {
  const [theme, setTheme] = useContext(ThemeContext)
  function onThemeChange (newTheme) {
    setTheme(newTheme)
  }  
    return (
    <Container>
        <h2>
          Theme
        </h2>
          <ThemeBox>
            <label>
              <input onChange={() => onThemeChange(lightTheme)} checked={theme === lightTheme} type="radio" value="light" name="theme"/>
              Light
            </label>
            <label>
              <input onChange={() => onThemeChange(darkTheme)} checked={theme === darkTheme} type="radio" value="dark" name="theme"/>
              Dark
            </label>
            <label>
              <input disabled={true} type="radio" value="auto" name="theme"/>
              Automatic
            </label>
          </ThemeBox>
        <Outlet />
    </Container>
    );
  }