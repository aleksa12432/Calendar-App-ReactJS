import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div>
      <nav class="mx-0 h-20 flex content-center justify-center m-0 border-b-1 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <div class="flex items-center justify-center gap-16">
            <div class="flex-shrink-0">
              <a href="#" class="text-gray-300 font-bold text-xl">
                Logo
              </a>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  class="text-gray-400 hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kalendar
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Planer
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Podsetnik
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-purple-500
                 px-3 py-2 rounded-md text-sm font-medium
                 "
                >
                  Profil
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto my-0  h-screen items-center sm:flex-col flex-col">
        <div className="w-96 h-96 ">
          <div className="flex justify-center items-center">
            <div
              className="flex gap-10 items-center mb-10
             "
            >
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1 className="select-none font-semibold">
                {months[today.month()]}, {today.year()}
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className=" grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-sm "
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-purple-600 text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-purple-900 text-white"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-purple-600 hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
