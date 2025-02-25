import axios from "axios"
import { useEffect } from "react"


const getDailyDigest = () => {
    axios.get('http://localhost:9000/slack/summarize')
}


const DailyDigest = () => {

  useEffect(() => {

  },[])
  return (
    <div>DailyDigest</div>
  )
}

export default DailyDigest