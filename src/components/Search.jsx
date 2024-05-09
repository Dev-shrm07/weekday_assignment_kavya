import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useState, useEffect } from "react";
import "../css/search.css";


//this function in the prop will change the job listings based on filters
const Search = ({ searchFunction }) => {

  //filters for jobs
  const [filter, setFilter] = useState({
    company: "",
    min_exp: null,
    role: [],
    loc: [],
    city: [],
    tech_stack:[],
    minsal: null,
  });


  //everytime filters are changed change jobs based on that
  useEffect(() => {
    searchFunction(filter);
  }, [filter]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const HandleRoleChange = (selected, actionMeta) => {
    const value = selected.map((obj) => obj.value);
    setFilter({ ...filter, role: value });
  };

  const HandleLocChange = (selected) => {
    const value = selected.map((obj) => obj.value);
    setFilter({ ...filter, loc: value });
  };
  const HandleCityChange = (selected) => {
    const value = selected.map((obj) => obj.value);
    setFilter({ ...filter, city: value });
  };

  const HandleTCChange = (selected) => {
    const value = selected.map((obj) => obj.value);
    setFilter({ ...filter, tech_stack: value });
  };

  const HandleMinSal = (selected) => {
    setFilter({ ...filter, minsal: selected.value });
  };
  
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
    { label: "remote", value: "remote" },
    { label: "hybrid", value: "hybrid" },
    { label: "office", value: "office" },
  ];

  const array_city = [
    "delhi ncr",
    "mumbai",
    "banglore",
    "gurgaon",
    "chennai",
    "hyderabad",
    "pune",
    "nyc",
    "LA",
    "london",
  ];
  const options_city = [];
  array_city.forEach((element) => {
    options_city.push({ label: element, value: element });
  });

  const array_tech_stack = [
    "react.js",
    "mern",
    "javascript",
    "react-native",
    "python",
    "llm",
    "huggingface",
    "flask",
    "pytorch",
    "angular",
    "express",
  ];

  const options_tc = [];
  array_tech_stack.forEach((element) => {
    options_tc.push({ label: element, value: element });
  });

  const options_salary = [];
  for (let i = 0; i < 31; i++) {
    options_salary.push({ label: `${i * 10}K USD`, value: i * 10 });
  }





  return (
    <>
      <div className="search-filters">
        <div className="filter-role">
          <CreatableSelect
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
            placeholder="job type"
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
        <div className="filter-city">
          <CreatableSelect
            isMulti
            name="city"
            options={options_city}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="city"
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                width: "70px",
                height: "10px",
              }),
            }}
            onChange={HandleCityChange}
          />
        </div>
        <div className="filter-tc">
          <CreatableSelect
            isMulti
            name="tech_stack"
            options={options_tc}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={HandleTCChange}
            placeholder="tech stack"
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
          <input
            placeholder="minimum experience in years"
            name="min_exp"
            type="numbers"
            min={0}
            max={10}
            className="inp"
            value={null}
            onChange={handleChange}
          />
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

        <div className="filter-company-name">
          <input
            type="text"
            name="company"
            className="inp company"
            placeholder="company"
            value={filter.company}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
