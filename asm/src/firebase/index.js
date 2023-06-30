import axios from "axios";

export const setData = async (data) => {
  return await axios.post(
    "https://enverx-546c6-default-rtdb.firebaseio.com/data.json",
    data
  );
};

export const getData = async () => {
  const res = await axios.get(
    "https://enverx-546c6-default-rtdb.firebaseio.com/data.json"
  );
  return res;
};
