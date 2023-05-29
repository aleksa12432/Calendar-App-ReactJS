import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar() {
  const days = ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const btnAdd = document.querySelector(".add");
  const container = document.querySelector(".post-name-container");
  const btnNewEvent = document.querySelector(".new-event");

  btnAdd.addEventListener("click", function (e) {
    e.preventDefault();
    container.classList.remove("hidden");
    container.classList.add("flex");
  });

  btnNewEvent.addEventListener("click", function (e) {
    e.preventDefault();
    container.classList.add("hidden");
    container.classList.remove("flex");
  });
  return (
    <div>
      <nav class="mx-0 h-20 flex content-center justify-center m-0 border-b-1 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <div class="flex items-center justify-center gap-16">
            <div class="flex-shrink-0">
              <img src={require("./img/logo.png")} className="w-10 h-15" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex  space-x-20 items-center">
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

                <img
                  src={require("./img/add.png")}
                  className="w-10 add cursor-pointer"
                  onClick={btnAdd}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex gap-10 sm:divide-x justify-center mx-auto my-0  h-screen w-full items-center sm:flex-col flex-col relative">
        <div className="w-7/12">
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
              <div className="flex flex-col text-center">
                <h1 className="select-none font-semibold text-xl">
                  {months[today.month()]}
                </h1>
                <h2 className="select-none font-extralight text-xs">
                  {today.year()}
                </h2>
              </div>
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
                  className="text-sm text-center h-14  grid place-content-center text-gray-500 select-none"
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
                          ? "bg-purple-700 text-white"
                          : "",
                        "h-10 w-10 rounded-md grid place-content-center hover:bg-purple-600 hover:text-white transition-all cursor-pointer select-none"
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
        <section className="flex">
          <form name="oglas" class="post-name-container self-center hidden">
            <h3>Dodaj novi dogadjaj</h3>
            <input
              id="post-name"
              name="name"
              placeholder="Ime dogadjaja*"
            ></input>

            <input
              id="post-name"
              name="beleska"
              placeholder="Dodaj belešku..."
            ></input>

            <input type="date" id="post-date" />
            <div className="flex gap-5 justify-center">
              <input id="post-time" name="vreme" placeholder="Početak"></input>
              <input id="post-time" name="vreme" placeholder="Kraj"></input>
            </div>
            <div className="flex gap-52">
              <p>Podseti me</p>
              <label
                for="check"
                className="bg-gray-100 cursor-pointer relative w-16 h-8 rounded-full"
              >
                <input type="checkbox" id="check" class="sr-only peer"></input>
                <span class="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1 peer-checked:bg-purple-600 peer-checked:left-8 transition-all duration-500"></span>
              </label>
            </div>

            <button
              type="submit"
              className="bg-purple-600 rounded-lg text-white w-7/12 h-12 new-event"
              onClick={btnNewEvent}
            >
              <strong>Napravi dogadjaj</strong>
            </button>
          </form>
        </section>
      </div>
      <div class="mt-8 flex flex-col gap-4 mb-10">
        <div class="card">
          <div class="m-4">
            <div class="badge ">
              <span>10:00-13:00</span>
            </div>
            <span class="font-bold">Osmisli dizajn za USP</span>
            <span class="block text-gray-400 text-sm font-extralight">
              Kreni od ikonice aplikacije
            </span>
          </div>
        </div>
        <div class="card">
          <div class="m-4">
            <div class="badge ">
              <span>14:00-15:00</span>
            </div>
            <span class="font-bold">Odradi Frontend</span>
            <span class="block text-gray-400 text-sm font-extralight">
              Definisi probleme i moguca resenja...
            </span>
          </div>
        </div>
        <div class="card">
          <div class="m-4">
            <div class="badge ">
              <span>19:00-20:00</span>
            </div>
            <span class="font-bold">Zapisi beleske</span>
            <span class="block text-gray-400 text-sm font-extralight">
              Podeli beleske sa clanovima tima
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
