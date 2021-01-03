"use strict";
exports.__esModule = true;
var date = new Date(), dayWeekNum = date.getDay(), today = date.getUTCDate(), defYear = date.getFullYear(), months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], months30 = ['September', 'April', 'June', 'November'], getMonthLength = function (month) {
    switch (true) {
        case months30.includes(months[month]):
            return 30;
        case month === 1:
            return !(defYear % 4) ? 29 : 28;
        default:
            return 31;
    }
}, getStartingDay = function (dayWeekNum, dayNum) { return ((7 + dayWeekNum) - (dayNum - (7 * Math.floor(dayNum / 7)) - 1)) % 7; }, setDayOfWeekPrefix = function (id) {
    var lastNum = ("" + id).slice(-1);
    switch (true) {
        case lastNum === '1' && id !== 11:
            return "st";
        case lastNum === '2' && id !== 12:
            return "nd";
        case lastNum === '3' && id !== 13:
            return "rd";
        default:
            return "th";
    }
};
var Calenda = /** @class */ (function () {
    function Calenda(_a) {
        var _this = this;
        var month = _a.month;
        this.getStructure = function () {
            var currentMonthLength = getMonthLength(_this.monthIdx);
            var monthArr = Array(currentMonthLength + _this.startingDay).fill(0);
            for (var i = _this.startingDay; i < monthArr.length; i++) {
                monthArr[i] = i - (_this.startingDay - 1);
            }
            var monthLimit = 0, week = 0;
            while (week < 7) {
                monthLimit = 0;
                _this.structure[daysOfWeek[week]] = [];
                while (monthArr[monthLimit + week] < currentMonthLength + 1) {
                    _this.structure[daysOfWeek[week]].push(monthArr[monthLimit + week]);
                    monthLimit += 7;
                }
                week++;
            }
            return _this;
        };
        this.getInfo = function (day, options) {
            var _loop_1 = function (key) {
                var daysArr = _this.structure[key];
                for (var i = 0; i < daysArr.length; i++) {
                    if (daysArr[i] === day) {
                        Object.keys(options).forEach(function (e) { return options[e] && (function () {
                            switch (e) {
                                case 'dayNumber':
                                    return _this.info[e] = day;
                                case 'dayOfWeek':
                                    return _this.info[e] = key;
                                case 'monthOfYear':
                                    return _this.info[e] = months[_this.monthIdx];
                                case 'suffix':
                                    return _this.info[e] = setDayOfWeekPrefix(day);
                                case 'year':
                                    return _this.info[e] = _this.year;
                                default:
                                    return;
                            }
                        })(); });
                        return { value: _this.info };
                    }
                }
            };
            for (var key in _this.structure) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        };
        this.moveMonth = function (direction) {
            var currentMonthLength = getMonthLength(_this.monthIdx);
            return direction === 'forward' ?
                (function () {
                    var prevMonth = _this.prevMonth = _this.currentMonth, currentMonth = _this.currentMonth = (_this.currentMonth + 1) % 12;
                    _this.startingDay = ((currentMonthLength - (((7 * Math.floor(currentMonthLength / 7)) - _this.startingDay) + 1)) + 1) % 7; //get what the dayweeknum of any other day will be from the starting day.
                    ((prevMonth === 11 && currentMonth === 0) || (prevMonth === 0 && currentMonth === 11)) && (_this.year += 1);
                    _this.monthIdx = currentMonth;
                    return _this;
                })() :
                direction === 'backward' && (function () {
                    var monthEndDayNum = _this.startingDay - 1, finalMonthEndDayNum = monthEndDayNum < 0 ? 6 : monthEndDayNum, newMonthIdx = _this.monthIdx - 1, getMonth = newMonthIdx < 0 ? 11 : newMonthIdx, monthEndDay = getMonthLength(getMonth), prevMonth = _this.prevMonth = _this.currentMonth, currentMonth = _this.currentMonth = getMonth;
                    _this.startingDay = getStartingDay(finalMonthEndDayNum, monthEndDay);
                    ((prevMonth === 11 && currentMonth === 0) || (prevMonth === 0 && currentMonth === 11)) && (_this.year -= 1);
                    _this.monthIdx = currentMonth;
                    return _this;
                })();
        };
        this.startingDay = getStartingDay(dayWeekNum, today);
        this.monthIdx = months.indexOf(month);
        this.year = defYear;
        this.structure = {};
        this.info = {};
        this.currentMonth = this.monthIdx;
        this.prevMonth = undefined;
    }
    return Calenda;
}());
exports["default"] = Calenda;
