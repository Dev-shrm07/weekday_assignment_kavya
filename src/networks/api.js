import { getSampleJdJSON } from "../jd";

//fetching the data from weekday api

export function getJobs(offset) {
  const data = getSampleJdJSON()
  return data.slice(offset, offset+10)
  
}
