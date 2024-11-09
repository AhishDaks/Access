import axios from "axios";

export async function fetchTask() {
  const res = await axios.get(
    "https://free-ap-south-1.cosmocloud.io/development/api/taskdetails?limit=100&offset=0",
    {
      headers: {
        projectId: "670e99ff59c9b368f802bb24",
        environmentId: "670e99ff59c9b368f802bb25",
      },
    },
  );
  return res;
}
