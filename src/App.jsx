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
import CircularProgress from '@mui/material/CircularProgress';


const App = () => {
  //using use effect with [] as dependecny so that whenever the app is loaded it fetches the data from the api
  const [prevJobs, setprevJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  

  async function getjobs() {
    try {
      setLoading(true)
      const response = await API.getJobs(offset);
      const newJobs = response.jdList
      setprevJobs(prevJobs => [...prevJobs, ...newJobs]);
      setOffset(offset => offset + newJobs.length);

    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {

    getjobs();
  }, []);
  
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (windowHeight + scrollTop >= documentHeight - 100 && !loading) {
      getjobs();
    }

    if(window.scrollY==0){
      setOffset(0)
      setprevJobs([])
      getjobs()
    }
    
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);


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
          { prevJobs && prevJobs.map((m) => {
            return <Card JobData={m} key={m.JdUid} ShowMoreFunction={handleShowMore} />;
          })}
        </div>
        {loading && <CircularProgress/>}
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


