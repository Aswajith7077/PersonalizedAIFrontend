import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const getSummary = (data, summary, setSummary) => {
  console.log("Data : ", data);
  axios
    .post("http://localhost:9000/slack/summarize", {
      ...data
    })
    .then(res => {
      setSummary(res.data.summary);
      console.log(data, summary);
    })
    .catch(err => {
      toast("Failed to Fetch Summary", { description: `${err}` });
    });
};

const Summary = () => {
  const data = useOutletContext();
  const [summary, setSummary] = useState<object | undefined>(undefined);

  // useEffect(
  //   () => {
  //     console.log(summary);
  //   },
  //   [summary]
  // );
  useEffect(() => {
    getSummary(data, summary, setSummary);
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl mx-10 my-10">Summary</h1>
      <div className="flex flex-col">
        {summary &&
          summary.map((value, key) => {
            return (
              <div key={key} className="flex flex-col px-5 mx-5 my-5 gap-2">
                <h2 className="font-semibold text-lg ">
                  {value.channel_name}
                </h2>
                <p className="text-md text-gray-400 mx-4">
                  {value.summary ? value.summary : "No Summary Available"}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
