<img src="calenda-logo.png" width="20"><h1>CalendaJS</h1>

- [Publication](https://calenda.web.app)

* [Steps](#How-it-works)
  + [Initialization](#Step-1)
  + [Get the month structure](#Step-2)
  + [Get information](#Step-3)

## How it works

### Step 1: Initialization
- Run the command
```
npm install calenda
```
- Import the calenda
```
Import Calenda from 'calenda'
```
- Create a `new` Calendar instance and pass in an object with a `month` property set to any month of the year.

> Note: The year defaults to the current year you are in.

```
const calendar = new Calenda({
  month: 'January'
});
```

### Step 2: Get the month structure
- Call the `getStructure` method on the instance and get the `structure` property.
```
calendar.getStructure().structure;
```

> This returns an object of arrays with the days of the week as keys and an array of numbers as values which are the days of the month that fall on that day of the week.

```
{
  Sun: [ 0, 3, 10, 17, 24, 31 ],
  Mon: [ 0, 4, 11, 18, 25 ],
  Tue: [ 0, 5, 12, 19, 26 ],
  Wed: [ 0, 6, 13, 20, 27 ],
  Thu: [ 0, 7, 14, 21, 28 ],
  Fri: [ 1, 8, 15, 22, 29 ],
  Sat: [ 2, 9, 16, 23, 30 ]
}
```

### Step 3: Get information
-  Chain the `getInfo` method with the `getStructure` method and passing in a day of the month as a number as he first argument and an object with a set of options specifying the information you would like to get as the second argument.
```
calendar.getStructure().getInfo(1, {
  dayNumber: true,
  dayOfWeek: true,
  monthOfYear: true,
  year: true,
  suffix: true
})
```

> This returns an object with the values of the specified options.

```
{
   dayNumber: 1,
   dayOfWeek: 'fri',
   monthOfYear: 'January',
   year: 2021,
   suffix: 'st'
}
```