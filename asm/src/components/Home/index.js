import { useEffect } from "react";
import { getData, setData } from "../../firebase";
import AddExpense from "../AddExpense";
import ViewExpense from "../ViewExpense";
import { setStoreData } from "../../store/dataSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getData();
      dispatch(setStoreData(res.data || {}));
      // setting up dummy data in case nothing is present
      const keys = Object.keys(res.data || {});
      if (keys.length === 0) {
        await setData({
          itemName: "First Item",
          description: "Random Description",
          amount: "100",
          category: "Groceries",
          date: new Date(),
        });
        const res = await getData();
        dispatch(setStoreData(res.data || {}));
      }
    })();
  }, []);
  return (
    <div>
      <AddExpense />
      <ViewExpense />
    </div>
  );
};

export default Home;
