import Select from "react-select";
import { useState } from "react";
import "../css/search.css"
const Search = ({ searchFunction }) => {
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
  for(let i = 0; i <11; i++){
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
          />
        </div>
        <div className="filter-min-exp">
          <input placeholder="minimum experience in years" name="min_exp" type="numbers" min={0} max={10} className="inp"/>
        </div>

        <div className="filter-max-exp">
          <input placeholder="maximum experience in years" name = "max_exp" type="numbers" min={0} max={10} className="inp"/>
        </div>

        <div className="filter-salary-min">
          <Select
            isMulti
            name="min_salary"
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
          />
        </div>

        <div className="filter-salary-max">
          <Select
            isMulti
            name="max_salary"
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
          />
        </div>
        <div className="filter-company-name">
            <input type="text" name="company" className="inp company" placeholder="company"/>
        </div>

        


        
      </div>
    </>
  )
  
};

export default Search;
