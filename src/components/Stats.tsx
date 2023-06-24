import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser } from "../app/userSlice";
import axios from "axios";
import { IResults } from "../interfaces/interfaces";
import Card from "./Card";
import { getResult, setResults } from "../app/resultsSlice";

function Stat() {
  const { user } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const results = useAppSelector(getResult);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/${user.id}`).then((res) => {
      dispatch(setResults(res.data));
    });
  }, []);
  return (
    <div className="px-5 flex flex-col justify-between h-full">
      <h1 className="text-3xl text-white text-center my-3">Statistics</h1>
      <div>
        <h2 className="text-2xl text-white text-center ">Tests history</h2>
        <div className="bg-white bg-opacity-20 mb-5 p-2 h-56 rounded-lg shadow overflow-y-scroll">
          <div className="flex flex-col gap-2 rounded-lg">
            {results.map((el: IResults, index: number) => {
              return (
                <Card
                  key={el.id}
                  title={el.title}
                  path={`/stats/${el.id}`}
                  listNumber={index + 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stat;
