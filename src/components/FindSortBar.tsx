import { getUser } from "../app/userSlice";
import { useAppSelector } from "../app/hooks";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import Mytip from "./Mytip";

type Props = {
  data: any[];
  storedData: any[];
  checkboxVisible?: boolean;
  setData: React.Dispatch<SetStateAction<any[]>>;
};

export default function FindSortBar({
  storedData,
  data,
  setData,
  checkboxVisible = false,
}: Props) {
  const { user } = useAppSelector(getUser);
  const [isVisible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const sortByDate = (byGrowth = 0) => {
    setVisible((prev) => !prev);
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      if (byGrowth) {
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    setData(sortedData);
  };

  const findByMatch = (value: string) => {
    let filtered = data.filter(
      ({ title, userName }: { title: string; userName: string }) => {
        if (title) return title.toLowerCase().includes(value.toLowerCase());
        if (userName)
          return userName.toLowerCase().includes(value.toLowerCase());
      }
    );
    setData(filtered);
    if (value === "") {
      setData(storedData);
      setChecked(false);
    }
  };
  const findMyTests = () => {
    if (checked) {
      const filtered = [...data].filter((item) => item.userId === user.id);
      setData(filtered);
    } else {
      setData(storedData);
      setChecked(false);
    }
  };
  useEffect(() => {
    findByMatch(value);
  }, [value]);
  useEffect(() => {
    findMyTests();
  }, [checked]);
  return (
    <div className="bg-slate-800 rounded text-white p-1 flex justify-between items-center ">
      <div className="flex items-center gap-2  justify-between w-full flex-wrap sm:flex-nowrap">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="placeholder:text-slate-700 p-2 bg-slate-50 outline-none text-slate-700 rounded w-full sm:w-64 "
          type="text"
          name="filter"
          id=""
          placeholder="Find"
        />
        <div className="w-full flex  items-center">
          <div className="flex-grow">
            {checkboxVisible ? (
              <div className="flex items-center gap-2 ">
                <input
                  checked={checked}
                  className="appearance-none bg-slate-200 w-4 h-4 border-2 border-slate-50 rounded checked:bg-slate-800 cursor-pointer shadow-custom"
                  type="checkbox"
                  id="check"
                  onChange={() => {
                    setChecked((prev) => !prev);
                  }}
                />
                <label htmlFor="check" className="text-slate-50">
                  {checked ? "Show all tests" : "Show my tests"}
                </label>
              </div>
            ) : null}
          </div>
          {isVisible ? (
            <Mytip text="From newest">
              <FaSortDown
                className="text-3xl text-slate-50 mb-2 cursor-pointer"
                onClick={() => {
                  sortByDate(1);
                }}
              />
            </Mytip>
          ) : (
            <Mytip text="From oldest">
              <FaSortUp
                className="text-3xl text-slate-50  mt-2 cursor-pointer self-end"
                onClick={() => {
                  sortByDate();
                }}
              />
            </Mytip>
          )}
        </div>
      </div>
    </div>
  );
}
