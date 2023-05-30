import { useState, useEffect } from 'react';
const axios = require('axios');

function News() {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('');

    async function fetchNews() {
        let url = 'http://localhost:3006/api/news-sources';

        if (query) {
            url += `/${query}`;
        }

        try {
            console.log(url)
            const response = await axios.get(url);
            setNews(response.data.articles);
        } catch (error) {
            console.error(error);
            setNews(`Error retrieving news`)
        }
    }


    function handleQuery(event) {
        event.preventDefault();
        fetchNews()
    }

    useEffect(() => {
        fetchNews();
    }, [])


    if (news.length <= 0)
        return (<p>loading</p>)

    console.log(query);
    console.log(news);
    return (
        <div className='w-3/12 rounded-lg p-2 m-3 min-w-[360px] border-double

        border border-sky-500 flex flex-col max-h-[38rem]	' >
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text mr-2.5">Choose a subject</span>
                    <span className="label-text-alt ml-2.5">This will display top 10 articles related</span>
                </label>
                <form onSubmit={handleQuery} >
                    <input onChange={event => setQuery(event.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <button></button>
                </form>
            </div>
            <div className="max-h-80 h-80 overflow-y-scroll w-full">
            {news.map(function (item, i) {
                return (
                    <div key={i} >
                        <div className="card w-96 bg-base-100 shadow-xl image-full m-auto mt-10">
                            <figure><img src={item.urlToImage} alt="photo" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.author}</h2>
                                <p>{item.title}</p>
                                <div className="card-actions justify-end">
                                    <a href={item.url} target="_blank" className="btn glass">Go to article </a>
                                </div>
                            </div>
                        </div>
                    </div>

            )
            })}
            </div>
        </div>
    )
}
export { News };

