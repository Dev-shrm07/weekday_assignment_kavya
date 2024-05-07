import { useEffect, useState } from "react";
import "./css/App.css";
import * as API from "./networks/api";
import Card from "./components/jobCard";

const App = () => {
  //using use effect with [] as dependecny so that whenever the app is loaded it fetches the data from the api
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getjobs() {
      try {
        const jobs = await API.getJobs();
        setData(jobs.jdList[0]);
        console.log(jobs.jdList[0])
        
      } catch (error) {
        console.error(error);
      }
    }

    getjobs();
  }, []);
  useEffect(() => {
    if (data) {
      console.log("data:", data);
    }
  }, [data]);
  
  return <div className="App">{data && <Card JobData={data}/>}</div>;
};

export default App;
