import {registerClientCreateListener} from "./clients"
import { Repository } from "./model"
//below refers to a module inside folder node_modules (where npm install, installs stuff)
//to make importing work from both custom imports form our own code and from node_modules 3rd party installs, we need a plugin for rollup called plugin -node-resolve
import React from 'react'
import {createRoot} from 'react-dom/client'
import Routes from './components/Routes.jsx'

//declare repository var
const repository = Repository.loadFromLocalStorage()
//# refers to an id in html
const root = createRoot(document.querySelector('#app'));
root.render(<Routes />);

//call imported function
//registerClientCreateListener(repository)


//navigation panel function

export function navigateTo(destination) {
    let hideTabPanes = document.querySelectorAll("*[data-nav-pane]")
    for (const hideTabPane of hideTabPanes) {
        hideTabPane.style.display = "none";
    }
    let tabPane = document.querySelector("*[data-nav-pane=" + destination + "]")
    tabPane.style.display = "block";
    if (destination === "clients") {
        refreshTable()
    }
}

//use quesryselectorall to select all instances that match
//""> li" children of "#nav-links"
//"#"" is for id and "." is for class
const navLinks = document.querySelectorAll("*[data-nav-link]")

//todo
//1.1 iterate over navLinks (for loop) to be able to do 2.
//1.2 for every navlink add a click listener
    //2.1 get attribute "data-nav"
    //2.2 look for html element with class "tab-pane" & "data-nav"
    //2.3 turn display block from style="display:none" to style="display:block"

for (const navLink of navLinks) {
    navLink.addEventListener('click', () => {
        let navLinkName = navLink.getAttribute("data-nav-link")
        navigateTo(navLinkName)
    })
}