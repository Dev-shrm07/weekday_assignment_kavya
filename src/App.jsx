
import { useEffect, useState, useRef } from "react";
import "./css/App.css";
import { getSampleJdJSON } from "./jd";
import Card from "./components/jobCard";
import "./css/card.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./components/Header";
import Search from "./components/Search";

const App = () => {
  //using use effect with [] as dependecny so that whenever the app is loaded it fetches the data from the api
  const data = getSampleJdJSON();
  const[Data,setData] = useState(data)
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState(10);
  const loader = useRef(null);

  useEffect(() => {
    setDisplayedData(Data.slice(0, itemsToDisplay));
  }, [itemsToDisplay, Data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setItemsToDisplay((prevItemsToDisplay) => prevItemsToDisplay + 10);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = loader.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, []);

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

  const HandleFilters = (filters) => {
    


    let filtered = [...data]; // Create a copy of the data array

    // filter company name
    if (filters.company) {
      filtered = filtered.filter((job) =>
        job.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // filter job role
    if (filters.role.length > 0) {
      filtered = filtered.filter((job) =>
        filters.role.includes(job.jobRole.toLowerCase())
      );
    }

    // filter location
    if (filters.city.length > 0) {
      filtered = filtered.filter((job) =>
        filters.city.includes(job.location.toLowerCase())
      );
    }

    // filter tech stack in description
    if (filters.tech_stack.length > 0) {
      filtered = filtered.filter((job) =>
        filters.tech_stack.every((tech) =>
          job.jobDetailsFromCompany.toLowerCase().includes(tech.toLowerCase())
        )
      );
    }

    // filter job type
    if (filters.loc.length > 0) {
      filtered = filtered.filter((job) =>{
        if (job.location.toLowerCase() === "remote") {
          return filters.loc.includes("remote");
        } else if (job.location.toLowerCase() === "hybrid") {
          return filters.loc.includes("hybrid");
        } else {
          return filters.loc.includes("office");
        }
      }
        
      );
    }
    //filter minimum salary
    if(filters.minsal!=null){
      filtered = filtered.filter((job) =>{
        if (job.minJdSalary == null ) {
          if(job.maxJdSalary==null){
            return true
          }else{
            return job.maxJdSalary>=filters.minsal
          }
        
        } else {
          return job.minJdSalary>= filters.minsal;
        }
      }
        
      );
    }
    //filter minimum experience
    if(filters.min_exp!=null){
      filtered = filtered.filter((job) =>{
        if (job.minExp == null ) {
          if(job.maxExp==null){
            return true
          }else{
            return job.maxExp>=filters.min_exp
          }
        
        } else {
          return job.minExp>= filters.min_exp;
        }
      }
        
      );
    }


    // Update the displayedData state with the filtered data
    setData(filtered)
  };

  return (
    <>
      <div className="app">
        <Header />
        <Search searchFunction={HandleFilters} />
        <div className="card-container-box">
          {displayedData &&
            displayedData.map((m) => {
              return (
                <Card
                  JobData={m}
                  key={m.JdUid}
                  ShowMoreFunction={handleShowMore}
                />
              );
            })}
        </div>
        <div ref={loader}>
          {displayedData.length < data.length && <CircularProgress />}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Job Description</DialogTitle>
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default App;
