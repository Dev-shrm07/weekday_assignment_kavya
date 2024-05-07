import { useEffect, useState } from "react";
import "./css/App.css";
import * as API from "./networks/api";
import Card from "./components/jobCard";
import "./css/card.css"

const App = () => {
  //using use effect with [] as dependecny so that whenever the app is loaded it fetches the data from the api
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getjobs() {
      try {
        const jobs = await API.getJobs();
        setData(jobs.jdList);
        console.log(jobs.jdList);
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

  return (
    <>
      <div className="app">
        <div className="card-container-box">
          { data && data.map((m) => {
            return <Card JobData={m} key={m.JdUid} />;
          })}
        </div>
      </div>
    </>
  );
};

export default App;
