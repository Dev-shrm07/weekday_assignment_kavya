import Select from "react-select";
import { useState, useEffect } from "react";
import "../css/search.css"
const Search = ({ searchFunction }) => {
  
  const [filter,setFilter] = useState({
    company:"",
    min_exp:null,
    max_exp:null,
    role:[],
    loc:[],
    minsal:null,
    maxsal:null
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFilter({...filter, [name]:value})
  }

  

  const HandleRoleChange = (selected) =>{
    const value = selected.map(obj=>obj.value)
    setFilter({...filter, ["role"]:value})
    

  }

  const HandleLocChange = (selected) =>{
    const value = selected.map(obj=>obj.value)
    setFilter({...filter, ["loc"]:value})
  }
  
  const HandleMinSal = (selected) =>{
    setFilter({...filter, ["minsal"]:selected.value})
    
  }

  const HandleMaxSal = (selected) =>{
    setFilter({...filter, ["maxsal"]:selected.value})
    
  }
  
  

  const array_role = [
    "frontend",
    "backend",
    "ios",
    "techlead",
    "mobile",
    "andorid",
    "fullstack",
    "design",
    "manager",
    "product",
    "sales",

  ];
  const options_role = [];
  array_role.forEach((element) => {
    options_role.push({ label: element, value: element });
  });

  const options_location = [
    {label:"remote",value:"remote"},
    {label:"hybrid",value:"hybrid"},
    {label:"office",value:"office"}
  ]

  const options_salary = []
  for(let i = 0; i <31; i++){
    options_salary.push({label:`${i*10}K USD`, value:i*10})
  }
  

  return(
    <>
      <div className="search-filters">
        <div className="filter-role">
          <Select
            isMulti
            name="role"
            options={options_role}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={HandleRoleChange}
            placeholder="role"
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                width: "70px",
                height: "10px",
              }),
            }}
          />
        </div>
        <div className="filter-location">
          <Select
            isMulti
            name="location"
            options={options_location}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="location"
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                width: "70px",
                height: "10px",
              }),
            }}
            onChange={HandleLocChange}
          />
        </div>
        <div className="filter-min-exp">
          <input placeholder="minimum experience in years" name="min_exp" type="numbers" min={0} max={10} className="inp" value={null} onChange={handleChange}/>
        </div>

        <div className="filter-max-exp">
          <input placeholder="maximum experience in years" name = "max_exp" type="numbers" min={0} max={10} className="inp" value={null} onChange={handleChange}/>
        </div>

        <div className="filter-salary-min">
          <Select
            name="min_sal"
            options={options_salary}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="min salary"
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                width: "70px",
                height: "10px",
              }),
            }}
            onChange={HandleMinSal}
          />
        </div>

        <div className="filter-salary-max">
          <Select
            name="max_sal"
            options={options_salary}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="max salary"
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                width: "70px",
                height: "10px",
              }),
            }}
            onChange={HandleMaxSal}
          />
        </div>
        <div className="filter-company-name">
            <input type="text" name="company" className="inp company" placeholder="company" value={filter.company} onChange={handleChange}/>
        </div>

        


        
      </div>
    </>
  )
  
};

export default Search;
