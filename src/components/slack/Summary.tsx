import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { toast } from "sonner";

const getSummary = (data,summary,setSummary) => {
  axios.post("http://localhost:9000/slack/summarize",{
    data:data
  })
  .then(res => {
    setSummary(res.data);
    console.log(data,summary)
  })
  .catch(err => {
    toast("Failed to Fetch Summary", { description: `${err}` });
  })

};



const Summary = () => {
    const data = useOutletContext();
    const [summary,setSummary] = useState<object | undefined>(undefined);


    useEffect(() => {
        console.log(summary)
    },[summary])
    useEffect(() => {
        getSummary(data,summary,setSummary);
    },[]);

  return (
    <div>

    </div>
  )
}

export default Summary