import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar() {
  const days = ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [modalVisible, setModalVisible] = useState(false);
  const [planovi, setPlanovi] = useState([]);

  const [ime, setIme] = useState("");
  const [beleska, setBeleska] = useState("");
  const [pocetak, setPocetak] = useState("");
  const [satiTrajanja, setSatiTrajanja] = useState("");
  const [minutiTrajanja, setMinutiTrajanja] = useState("");
  
  const [alertText, setAlertText] = useState("");

  /** @type dayjs.Dayjs */
  const [plan, setPlan] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    for (const plan of planovi) {
      if (plan.datum === selectDate.format("DD/MM/YYYY")) {
        setPlan(plan);
        break;
      } else {
        setPlan([]);
      }
    }
  }, [selectDate, planovi]);

  useEffect(() => {
    const planoviLocalStorage = window.localStorage.getItem("planovi");

    console.log(planoviLocalStorage);
    if (planoviLocalStorage) {
      const parsedPlanovi = JSON.parse(planoviLocalStorage);

      
      if (parsedPlanovi.planovi) {
        console.log(parsedPlanovi);
        
        const ucitaniPlanovi = parsedPlanovi.planovi;
        setPlanovi(ucitaniPlanovi);

        for (const plan of ucitaniPlanovi) {
          if (plan.datum === today.format("DD/MM/YYYY")) {
            for (const podsetnik of plan.podsetnici) {
              const [h, m] = podsetnik.vreme.split(":").map(vr => Number.parseInt(vr));
              const now = Date.now();

              const setDate = new Date(Date.now());

              setDate.setHours(h);
              setDate.setMinutes(m);

              const min15 = 15 * 60 * 1000;

              const timediff = setDate.getTime() - now;

              if (timediff <= min15 && setDate.getTime() > now) {
                setAlertText(`Podsetnik! ${podsetnik.text} za ${(timediff / 1000) / 60} minuta`);
              }
            }
          }
        }
      }
    }
  }, [])

  function onModalSubmit(e) {
    e.preventDefault();

    let pronadjeno = false;

    const planovi_copy = JSON.parse(JSON.stringify(planovi));

    for (const plan of planovi_copy) {
      if (plan.datum === selectDate.format("DD/MM/YYYY")) {
        pronadjeno = true;

        plan.podsetnici.push(
          {
            "vreme": pocetak,
            "trajanje": `${("0" + satiTrajanja).slice(-2)}:${("0" + minutiTrajanja).slice(-2)}`,
            "text": ime,
            "tasks": [
              beleska,
            ]
          },
        )

        break;
      }
    }

    if (!pronadjeno) {
      planovi_copy.push(
        {
          "datum": selectDate.format("DD/MM/YYYY"),
          "podsetnici": [
            {
              "vreme": pocetak,
              "trajanje": `${("0" + satiTrajanja).slice(-2)}:${("0" + minutiTrajanja).slice(-2)}`,
              "text": ime,
              "tasks": [
                beleska,
              ]
            },
          ]
        }
      )
    }

    console.log("PLANOVI: ", planovi_copy);
    console.log("STRINGIFIED: ", JSON.stringify(planovi_copy));

    window.localStorage.setItem("planovi", JSON.stringify({"planovi": planovi_copy}));

    setPlanovi(planovi_copy);

    closeModal();
  }

  return (
    <div className="container mx-auto">
      <nav className="mx-0 h-20 flex content-center justify-center m-0 border-b-1 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <div className="flex items-center justify-center gap-16 sm:justify-start">
            <div className="flex-shrink-0">
              <img src={require("./img/logo.png")} className="w-10 h-15" alt="logo" />
            </div>
            <div className="sm:block">
              <div className="ml-10 flex  space-x-20 items-center">
                <button
                  href=""
                  className="text-gray-400 hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kalendar
                </button>
                <button
                  href="#"
                  className="text-gray-400 hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Planer
                </button>
                <button
                  href="#"
                  className="text-gray-400 hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Podsetnik
                </button>
                <button
                  href="#"
                  className="text-gray-400 hover:text-purple-500
                 px-3 py-2 rounded-md text-sm font-medium
                 "
                >
                  Profil
                </button>

                <img
                  src={require("./img/add.png")}
                  className="w-10 add cursor-pointer"
                  onClick={openModal}
                  alt="add"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col gap-10 sm:divide-x justify-center mx-auto my-0 h-screen w-full items-center sm:flex-col relative">
        {alertText !== "" && <div className="text-red-600">{alertText}</div>}
        <div className="w-7/12 ">
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
                        today ? "bg-purple-300 text-white" : "",
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
        {modalVisible && (
          <section className="fixed z-10">
            <form onSubmit={onModalSubmit} name="oglas" className="flex border bg-white px-10 py-10 flex-col justify-center items-center gap-3 max-w-md">
              <div className="absolute top-5 right-5 text-red-500" onClick={closeModal}>X</div>
              <h3>Dodaj novi dogadjaj</h3>
              <div>
                {selectDate.format("DD/MM/YYYY")}
              </div>
              <input
                id="post-name"
                name="name"
                placeholder="Ime dogadjaja*"
                onChange={(e) => setIme(e.target.value)}
                value={ime}
                className="w-full border border-black px-2 py-2 rounded-sm"
              ></input>

              <input
                id="post-name"
                name="beleska"
                placeholder="Dodaj belešku..."
                onChange={(e) => setBeleska(e.target.value)}
                value={beleska}
                className="w-full border border-black px-2 py-2 rounded-sm"
              ></input>

              <div className="grid grid-cols-2 gap-5 justify-center w-full">
                <input
                  id="post-time"
                  name="vreme"
                  placeholder="Početak"
                  type="time"
                  onChange={(e) => setPocetak(e.target.value)}
                  value={pocetak}
                  className="border border-black rounded-sm px-2 py-2  flex-1"
                ></input>
                <div className="flex flex-col justify-center items-stretch">
                  <div className="grid grid-cols-2 gap-5">
                    <input type="number" id="post-time" name="vreme" className="border border-black rounded-sm px-2 py-2" placeholder="HH"
                      onChange={(e) => setSatiTrajanja(e.target.value)}
                      value={satiTrajanja}
                    />
                    <input type="number" id="post-time" name="vreme" className="border border-black rounded-sm px-2 py-2" placeholder="MM"
                      onChange={(e) => setMinutiTrajanja(e.target.value)}
                      value={minutiTrajanja}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <p>Podseti me</p>
                <label
                  className="bg-gray-100 cursor-pointer relative w-16 h-8 rounded-full border border-black"
                >
                  <input
                    type="checkbox"
                    id="check"
                    className="sr-only peer"
                  ></input>
                  <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1 peer-checked:bg-purple-600 peer-checked:left-8 transition-all duration-500"></span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-purple-600 rounded-lg text-white w-7/12 h-12 new-event"
              >
                <strong>Napravi dogadjaj</strong>
              </button>
            </form>
          </section>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-4 mb-10">
        {plan && plan.podsetnici &&
          plan.podsetnici.map((podsetnik, i) =>
            <div key={`podsetnik${i}`} className="card">
              <div className="m-4">
                <div className="badge ">
                  <span>{podsetnik.vreme}-{addHours(podsetnik.vreme, podsetnik.trajanje)}</span>
                </div>
                <span className="font-bold">{podsetnik.text}</span>
                {podsetnik.tasks.map((task, i) =>
                  <span key={`task${i}`} className="block text-gray-400 text-sm font-extralight">
                    {task}
                  </span>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

function addHours(strtime1, strtime2) {
  const date = new Date(Date.now());
  const time1 = strtime1.split(":").map(val => Number.parseInt(val));
  const time2 = strtime2.split(":").map(val => Number.parseInt(val));
  date.setHours(time1[0]);
  date.setMinutes(time1[1]);
  const hoursToMS = (time2[0] * 60) * 60 * 1000;
  const minutesToMS = time2[1] * 60 * 1000;

  const newDate = new Date(date.getTime() + hoursToMS + minutesToMS);

  return `${("0" + newDate.getHours()).slice(-2)}:${("0" + newDate.getMinutes()).slice(-2)}`;
}
