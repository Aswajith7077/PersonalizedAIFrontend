import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";


const getSummary = (setSummary) => {
    axios
      .get("http://localhost:9000/telegram/summarize")
      .then(res => {
        setSummary(res.data.summary);
        console.log("Summary fetched: ", res.data.summary);
      })
      .catch(err => {
        toast("Failed to Fetch Summary", { description: `${err}` });
      });
  };



const Summary = () => {
    const [summary, setSummary] = useState<object[] | undefined>(undefined);
  
    useEffect(() => {
      getSummary(setSummary);  // No data being passed, just calling the function
    }, []);
  
    return (
      <div>
        <h1 className="font-bold text-2xl mx-10 my-10">Summary</h1>
        <div className="flex flex-col">
          {summary && summary.length > 0 ? (
            summary.map((value, key) => {
              return (
                <div key={key} className="flex flex-col px-5 mx-5 my-5 gap-2">
                  <h2 className="font-semibold text-lg ">
                    Chat Summary - Today's Activity
                  </h2>
                  <p className="text-md text-gray-400 mx-4">
                    {value.summary ? value.summary : "No Summary Available"}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">No summary available</div>
          )}
        </div>
      </div>
    );
};
  
export default Summary;  