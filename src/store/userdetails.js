import axios from "axios";
import { addUser } from "./store";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
export function UserDetails() {
  const dispatch = useDispatch();

  const initialuser = useCallback(() => {
    async function add() {
      const res = await axios.get(
        "https://free-ap-south-1.cosmocloud.io/development/api/userdetails?limit=100&offset=0",
        {
          headers: {
            projectId: "670e99ff59c9b368f802bb24",
            environmentId: "670e99ff59c9b368f802bb25",
          },
        },
      );
      dispatch(addUser(res.data.data));
    }
    add();
  }, []);

  useEffect(() => initialuser(), [initialuser]);
}
