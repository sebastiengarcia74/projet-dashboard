import { useState, useEffect } from "react";
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Token = () => {
  const [tokenValue, setTokenValue] = useState("");
  
  const searchParams = useSearchParams();
  const access = searchParams.get("access_token");
  console.log(access);


  useEffect(() => {
    console.log("access", access);
    // getAccessToken(searchParams)
    if (access !== null) {
      setTokenValue(access);
      const postData = async () => {
        try {
          const res = await axios.post("http://localhost:8001/user-id", {
            user_id: Cookies.get("_id"),
            access_token: access,
          });

          console.log(res.data);
        } catch (err) {
          console.log("❌");
          console.log(err);
        }
      };

      postData();
    }
   
  }, [access]);

  return (
    <div>
      <h1>Spotify token</h1>

      <p>{tokenValue}</p>
    </div>
  );
};

export default Token;
