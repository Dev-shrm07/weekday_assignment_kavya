import { useEffect, useState } from "react";
import "./css/App.css";
import * as API from "./networks/api";
import Card from "./components/jobCard";
import "./css/card.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./components/Header";

const App = () => {
  //using use effect with [] as dependecny so that whenever the app is loaded it fetches the data from the api
  const [prevJobs, setprevJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

 function getjobs() {
    setLoading(true)
    const response = API.getJobs(offset)
    const newJobs = response
    console.log(newJobs)
    setprevJobs((prevJobs) => [...prevJobs, ...newJobs]);
    setOffset((offset) => offset + newJobs.length);
    setLoading(false)
    
  }
  useEffect(() => {
    getjobs();
  }, []);

  

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0);

    if (windowHeight + scrollTop >= documentHeight - 100 && !loading) {
      getjobs();
    }

    if (window.scrollY == 0 && prevJobs.length > 10) {
      setprevJobs(prevJobs.slice(0,10))
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setContent(null);
  };

  const handleShowMore = (text) => {
    setOpen(true);
    setContent(text);
  };

  const array = [
    "frontend",
    "backend",
    "ios",
    "techlead",
    "mobile",
    "andorid",
    "fullstack",
    "design",
  ];
  const options = [];
  array.forEach((element) => {
    options.push({ label: element, value: element });
  });

  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <div className="app">
        
        <Header/>

          {/* <div className="search-filter-containers">
            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="role"
              
              styles={{
                input:(baseStyles,state)=>({
                  ...baseStyles,
                  width:"70px",
                  height: "10px",
                  
                }),
              }}
            />
          </div> */}
        </div>
        <div className="card-container-box">
          {prevJobs &&
            prevJobs.map((m) => {
              return (
                <Card
                  JobData={m}
                  key={m.JdUid}
                  ShowMoreFunction={handleShowMore}
                />
              );
            })}
        </div>
        {loading && <CircularProgress />}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Job Description</DialogTitle>
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      {/* </div> */}
    </>
  );
};

export default App;
