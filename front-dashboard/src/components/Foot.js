import React, { useState, useEffect } from 'react';

function foot () 
{
const[foot, setFoot]= useState([]);

async function fetchFoot()
{

    const resp = await (await fetch(`https://api-football-standings.azharimm.dev/leagues`)) 
    setFoot(resp)
}





}




import React, { useState, useEffect } from 'react';


function Star() {
    const [star, setStar] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");


    const DateChange = (event) => {
        setSelectedDate(event.target.value);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("La date sélectionnée est: " + selectedDate);
        fetchStar(selectedDate)
    };

    async function fetchStar(date) {
        console.log(date)
        const res = await (await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=2iNGgMVnWeKtfAosPndv5fuQD7B02LirtIFwudVk`)).json();
        //const data = await res.json();
        setStar(res);
    };

    useEffect(() => {
        const curr = new Date();
        const defaultDate = curr.getYear() + curr.getMonth + curr.getDate(); // La date par défaut est aujourd'hui
        console.log(defaultDate)
        fetchStar(defaultDate);
    }, []);
    return (