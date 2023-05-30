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
        <div className='flex h-screen'>
            <div className='m-auto'>
                <div class="max-w-sm max-h-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg" src={star.hdurl} alt="Astronomic photo of the day" />
                    </a>
                    <div class="p-5"> invest in the world’s potential
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{star.title}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{star.date}</p>
                        <p class="max-h-56 trucate text-clip overflow-scroll mb-3 font-normal text-gray-700 dark:text-gray-400">{star.explanation}</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Sélectionner une date:
                                    <input
                                        type="date"
                                        name="party"
                                        min="1995-06-16"
                                        max=""
                                        value={selectedDate}
                                        onChange={DateChange}
                                        required
                                    />
                                    <span className="validity"></span>
                                    <button type="submit"></button>
                                </label>
                                <button type="submit">-----------------------------------</button>
                            </form>

                            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Star }






