import { useEffect, useRef, useState } from "react";
import "../css/card.css";

const salary_text = (min,max,currency)=>{
    if(currency=="INR"){
        if (min && max) {
            return `${min} lpa - ${max} lpa ⚠️`;
        } else if (min) {
            return `${min} lpa ⚠️`;
        } else if (max) {
            return `${max} lpa ⚠️`;
        } else {
            return "Salary not specified ⚠️";
        }
    }else{
        min = min*1000
        max = max*1000
        if (min && max) {
            return `${min} ${currency}  - ${max} ${currency} ⚠️`;
        } else if (min) {
            return `${min} ${currency} ⚠️`;
        } else if (max) {
            return `${max} ${currency} ⚠️`;
        } else {
            return "Salary not specified ⚠️";
        }
    }
}

const Card = ({ JobData }) => {

    
    const[showBtn, setShowBtn] = useState(false)
    const elementRef = useRef(null)
    useEffect(()=>{
       
        const text = document.getElementById('text')
        if (text.scrollHeight >= text.offsetHeight) {
            setShowBtn(true);
        }
        
    },[])

    
    
  return (
    <>
      <div className="card-container" id="container">
        <div className="top-section">
          <div className="update"> ⏳posted 6 days ago</div>
          <div className="logo-title-container">
            <div className="logo-container">
              <img src={JobData.logoUrl} alt="logo" />
            </div>
            <div className="title-location-details">
              {JobData.companyName && <p className="company-name">{JobData.companyName}</p>}
              {JobData.jobRole && <p className="role">{JobData.jobRole}</p>}
              {JobData.location && <p className="location">{JobData.location}</p>}
            </div>
          </div>
          <div className="salary">Estimated Salary:  {salary_text(JobData.minJdSalary, JobData.maxJdSalary, JobData.salaryCurrencyCode)}</div>
        </div>
        {JobData.jobDetailsFromCompany && <div className={(JobData.maxExp && JobData.minExp)? 'jd-container' : ((!JobData.maxExp && !JobData.minExp)? 'jd-container_2': 'jd-container_1')} id="text">{JobData.jobDetailsFromCompany}</div>}
        {showBtn && <div className="show-btn">show more</div>}
        {JobData.minExp && <div className="exp-container">
            <div className="exp-heading">Minimum experience </div>
            <p className="exp">{`${JobData.minExp}`} years</p>
        </div>}
        {JobData.maxExp && <div className="exp-container">
            <div className="exp-heading">Maximum experience </div>
            <p className="exp">{`${JobData.maxExp}`} years</p>
        </div>}
        <button className="apply-btn">Easy Apply ⚡</button>
      </div>
    </>
  );
};

export default Card;
