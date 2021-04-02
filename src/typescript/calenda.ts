const date = new Date();

const dayWeekNum = date.getDay();

const today = date.getUTCDate();

const defYear = date.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months30 = ["September", "April", "June", "November"];

const getMonthLength = (month: number) => {
  switch (true) {
    case months30.includes(months[month]):
      return 30;

    case month === 1:
      return !(defYear % 4) ? 29 : 28;

    default:
      return 31;
  }
};

const getStartingDay = (dayWeekNum: number, dayNum: number) =>
  (7 + dayWeekNum - (dayNum - 7 * Math.floor(dayNum / 7) - 1)) % 7;

const setDayOfWeekPrefix = (id: number) => {
  let lastNum = `${id}`.slice(-1);

  switch (true) {
    case lastNum === "1" && id !== 11:
      return `st`;

    case lastNum === "2" && id !== 12:
      return `nd`;

    case lastNum === "3" && id !== 13:
      return `rd`;

    default:
      return `th`;
  }
};

interface IInfo {
  dayNumber?: number;
  dayOfWeek?: string;
  monthOfYear?: string;
  year?: number;
  suffix?: string;
}

export default class Calenda {
  public structure:
    | {
        [key: string]: Array<number>;
      }
    | {};

  private monthIdx: number;

  private year: number;

  private info: IInfo | {};

  private currentMonth: number;

  private prevMonth: number | undefined;

  private startingDay: number;

  constructor({ month }: { month: string }) {
    this.startingDay = getStartingDay(dayWeekNum, today);

    this.monthIdx = months.indexOf(month);

    this.year = defYear;

    this.currentMonth = this.monthIdx;

    this.prevMonth = undefined;

    this.structure = {};

    this.info = {};
  }
  public getStructure = () => {
    let currentMonthLength = getMonthLength(this.monthIdx);

    const monthArr = Array(currentMonthLength + this.startingDay).fill(0);

    for (let i = this.startingDay; i < monthArr.length; i++) {
      monthArr[i] = i - (this.startingDay - 1);
    }

    let monthLimit = 0,
      week = 0;

    while (week < 7) {
      monthLimit = 0;

      this.structure[daysOfWeek[week]] = [];

      while (monthArr[monthLimit + week] < currentMonthLength + 1) {
        this.structure[daysOfWeek[week]].push(monthArr[monthLimit + week]);
        monthLimit += 7;
      }
      week++;
    }

    return this;
  };

  public getInfo = (day: number, options: object) => {
    for (const key in this.structure) {
      let daysArr = this.structure[key];

      for (let i = 0; i < daysArr.length; i++) {
        if (daysArr[i] === day) {
          Object.keys(options).forEach(
            e =>
              options[e] &&
              (() => {
                switch (e) {
                  case "dayNumber":
                    return (this.info[e] = day);

                  case "dayOfWeek":
                    return (this.info[e] = key);

                  case "monthOfYear":
                    return (this.info[e] = months[this.monthIdx]);

                  case "suffix":
                    return (this.info[e] = setDayOfWeekPrefix(day));

                  case "year":
                    return (this.info[e] = this.year);

                  default:
                    return;
                }
              })()
          );

          return this.info;
        }
      }
    }
  };

  public moveMonth = (direction: string) => {
    let currentMonthLength = getMonthLength(this.monthIdx);

    return direction === "forward"
      ? (() => {
          const prevMonth = (this.prevMonth = this.currentMonth),
            currentMonth = (this.currentMonth = (this.currentMonth + 1) % 12);

          this.startingDay =
            (currentMonthLength -
              (7 * Math.floor(currentMonthLength / 7) - this.startingDay + 1) +
              1) %
            7; //get what the dayweeknum of any other day will be from the starting day.

          ((prevMonth === 11 && currentMonth === 0) ||
            (prevMonth === 0 && currentMonth === 11)) &&
            (this.year += 1);

          this.monthIdx = currentMonth;

          return this;
        })()
      : direction === "backward" &&
          (() => {
            const monthEndDayNum = this.startingDay - 1,
              finalMonthEndDayNum = monthEndDayNum < 0 ? 6 : monthEndDayNum,
              newMonthIdx = this.monthIdx - 1,
              getMonth = newMonthIdx < 0 ? 11 : newMonthIdx,
              monthEndDay = getMonthLength(getMonth),
              prevMonth = (this.prevMonth = this.currentMonth),
              currentMonth = (this.currentMonth = getMonth);

            this.startingDay = getStartingDay(finalMonthEndDayNum, monthEndDay);

            ((prevMonth === 11 && currentMonth === 0) ||
              (prevMonth === 0 && currentMonth === 11)) &&
              (this.year -= 1);

            this.monthIdx = currentMonth;

            return this;
          })();
  };
}
