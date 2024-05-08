import { useEffect, useState } from "react";
import "./css/App.css";
import * as API from "./networks/api";
import Card from "./components/jobCard";
import "./css/card.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const App = () => {
  //using use effect with [] as dependecny so that whenever the app is loaded it fetches the data from the api
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getjobs() {
      try {
        const jobs = await API.getJobs();
        setData(jobs.jdList);
  
      } catch (error) {
        console.error(error);
      }
    }

    getjobs();
  }, []);
  
  const[open, setOpen] = useState(false)
  const[content, setContent] = useState(null)
  const handleClose = () => {
    setOpen(false);
    setContent(null)
  };

  const handleShowMore = (text) => {
    setOpen(true)
    setContent(text)
  }

  return (
    <>
      <div className="app">
        <div className="card-container-box">
          { data && data.map((m) => {
            return <Card JobData={m} key={m.JdUid} ShowMoreFunction={handleShowMore} />;
          })}
        </div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
};

export default App;
