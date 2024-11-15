import axios from "axios";

export async function fetchUsers() {
  const res = await axios.get(
    "https://free-ap-south-1.cosmocloud.io/development/api/userdetails?limit=100&offset=0",
    {
      headers: {
        projectId: "670e99ff59c9b368f802bb24",
        environmentId: "670e99ff59c9b368f802bb25",
      },
    },
  );
  return res.data.data;
}

export async function addNewUser(apiPostData) {
  await axios.post(
    "https://free-ap-south-1.cosmocloud.io/development/api/userdetails",
    apiPostData,
    {
      headers: {
        environmentId: "670e99ff59c9b368f802bb25",
        projectid: "670e99ff59c9b368f802bb24",
      },
    },
  );
}

export async function updateUser(apiPostData, id) {
  await axios.patch(
    `https://free-ap-south-1.cosmocloud.io/development/api/userdetails/${id}`,
    apiPostData,
    {
      headers: {
        environmentId: "670e99ff59c9b368f802bb25",
        projectid: "670e99ff59c9b368f802bb24",
      },
    },
  );
}
