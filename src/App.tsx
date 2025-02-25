import Dashboard from "@/components/Dashboard";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:9000/start_telegram")
      .then(res => console.log(res))
      .catch(err => toast("Failed to Load Messages", { description: `${err}` }));
  });




  return (
    <Dashboard/>
  )
}

export default App
