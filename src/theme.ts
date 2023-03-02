import React, { Dispatch, SetStateAction } from "react";
export interface Theme {
    background: string;
    textColor: string;
    picIdentifier: string;
}
type ThemeContextValue = [ Theme , Dispatch<SetStateAction<Theme>>]
export const lightTheme = {background: "white", textColor: "black", picIdentifier: ""}
export const darkTheme = {background: "#293542", textColor: "white", picIdentifier: "Dark"}
//this is illegal, fix sometime
export const ThemeContext = React.createContext<ThemeContextValue>(null as unknown as ThemeContextValue);