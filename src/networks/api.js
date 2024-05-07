// A standard function for fetching the data from api just based on request location and params
async function fetchData(input, init) {
  const response = await fetch(input, init);
  if (response.status === 304) {
    alert(304);
  }
  if (response.ok) {
    return response;
  } else {
    const errorbody = await response.json();
    const err = errorbody.error;
    throw Error(err);
  }
}

//fetching the data from weekday api

export async function getJobs() {
  const response = await fetchData(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 10,
        offset: 0,
      }),
    }
  );
  return response.json()
}
