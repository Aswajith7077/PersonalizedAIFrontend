import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

const getDailyDigest = (data,setDailyDigest) => {
  axios
    .post("http://localhost:9000/slack/daily_digest",{...data})
    .then(res => {
      setDailyDigest(res.data);
    })
    .catch(err => {
      toast("Failed to Load Daily Digest", {
        description: `${err}`
      });
    });
};

const DailyDigest = () => {
  const [dailyDigest, setDailyDigest] = useState<object[] | undefined>(undefined);
  const data = useOutletContext();



  useEffect(() => {
    getDailyDigest(data,setDailyDigest);
  }, []);

  // useEffect(() => {
  //   console.log(dailyDigest)
  // },[dailyDigest])

  return <div>
    <h1 className="font-bold text-2xl mx-10 my-10">Daily Digests</h1>
    <div className="flex flex-col">
      {dailyDigest && dailyDigest.map((value,key) => {
        return <div key={key} className="flex flex-col px-5 mx-5 my-5 gap-2">
            <h2 className="font-semibold text-lg ">{value.channel_name}</h2>
            <p className="text-md text-gray-500 mx-4">{value.summary}</p>
          </div>
      })}

    </div>
  </div>;
};

export default DailyDigest;
