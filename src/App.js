import { useEffect } from "react";
import "./css/App.css";
import * as API from "./networks/api";

const App = () => {
  useEffect(() => {
    async function getjobs() {
      try {
        const jobs = await API.getJobs();
        console.log(jobs);
      } catch (error) {
        console.error(error);
      }
    }

    getjobs()
  }, []);
  return <div className="App">hello h</div>;
};

export default App;
