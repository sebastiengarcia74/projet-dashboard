import { useState, useEffect } from "react";

function Profile() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);

  const fetchData = async () => {
    await fetch("http://localhost:3020/CO")
      .then((res) => res.json())
      .then((kij) => {
        console.log(kij.stations)
        setData(kij.stations);
      });
  };

  const fetchCity = async () => {
    await fetch("http://localhost:3020/getcity")
      .then((res) => res.json())
      .then((kij) => {
        console.log(kij)
        setCity(kij);
      });
  };
  // const objectarray = {

  //   Paris:"lat 40.4251","lng:74.0021",
  //   New-York: "lat:"40.4251""

  // };

  useEffect(() => {
    fetchData();
    fetchCity();
  }, []);

  if (data.length == 0) {
    console.log("nothing");
    return <div>loading</div>;
  }

  console.log(data);

  return (
    <div>
      
      {data?.map(function (item, index) {
        return (
          <div>
            <div className="stats shadow">
              <div className="stat place-items-center">
               
                <div key={index} className="stat-value">
                  {item.city}
                </div>
                <div>


                </div>
                {/* menu select */}
                  <div class="dropdown">
                    <button class="dropbtn">City</button>
                    <div class="dropdown-content">
                      {city.map(function(item, i){
                        return( <a href="">{item.city}</a>)
                      })}
                  </div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">CO</div>
                <div className="stat-value text-secondary">{item.CO}</div>
                <div className="stat-desc text-secondary">µg/m³</div>

                <div className="stat place-items-center">
                  <div className="stat-title">AQI</div>
                  <div className="stat-value text-secondary">{item.AQI}</div>
                  <div className="stat-desc text-secondary">µg/m³</div>
                </div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">NO2</div>
                <div className="stat-value">{item.NO2}</div>
                <div className="stat-desc">µg/m³</div>

                <div className="stat place-items-center">
                  <div className="stat-title">PM2.5</div>
                  <div className="stat-value">{item.PM25}</div>
                  <div className="stat-desc">µg/m³</div>
                </div>

                </div>

              <div className="stat place-items-center">
                <div className="stat-title">PM10</div>
                <div className="stat-value text-secondary">{item.PM10}</div>
                <div className="stat-desc text-secondary">µg/m³</div>

                <div className="stat place-items-center">
                  <div className="stat-title">SO2</div>
                  <div className="stat-value text-secondary">{item.SO2}</div>
                  <div className="stat-desc text-secondary">µg/m³</div>
                </div>
              </div>
            </div>
              </div>
            </div>

          
        );
      })}
      {/* //(ca fonctionne) */}

      
    </div>
  );

  
}
export default Profile;
