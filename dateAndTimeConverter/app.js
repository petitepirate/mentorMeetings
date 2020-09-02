/*
BONUS QUESTION:
You’ve been given a function that takes a date and time, and calculates a new date and time 
based on a provided duration.

Example 1: Starting date -> “2020-07-17 13:21:34”, duration -> “10 days”  → Output: “2020-07-27 13:21:34”
Example 2: Starting date -> “2020-07-17 13:21:34”, duration -> “10 minutes”  → Output: “2020-07-17 13:31:34”
*/

// Provide your solution below. Written text, pseudo code, or JavaScript is acceptable

function timeMachine(dateString, durationChange) {
	let initArray = dateString.split(' '); //["2020-07-17", "13:21:34"]
	let dateArray = initArray[0].split('-'); // ["2020", "07", "17"]
	let timeArray = initArray[1].split(':'); //["13", "21", "34"]
	let durationChangeArray = durationChange.split(' '); //['10', 'days']

	// Extract month day year hour minute seconds into their own variables.
	let year = +dateArray[0];
	let month = +dateArray[1];
	let day = +dateArray[2];
	let hour = +timeArray[0];
	let minute = +timeArray[1];
	let second = +timeArray[2];
	let duration = +durationChangeArray[0];
	let unit = durationChangeArray[1];
	let unitLower = unit.toLowerCase();
	var validUnits = [
		'years',
		'year',
		'month',
		'months',
		'days',
		'day',
		'hour',
		'hours',
		'minute',
		'minutes',
		'second',
		'seconds'
	];

	function pad(num) {
		var s = num + '';
		while (s.length < 2) s = '0' + s;
		return s;
	}

	//compare duration change to month day year hour minute seconds.
	//if it matches one, add the value to the corresponding month day year hour minute seconds variable.
	//inside each if statement, write if statment to handle if the new value is > the unit length
	if (!validUnits.includes(unitLower)) {
		//check if units are valid
		return 'invalid entry';
	} else if (unit.includes('year')) {
		// increase year if duration is in years
		year += duration;
	} else if (unit.includes('month')) {
		// increase months if duration is in months
		month += duration;
		if (month > 12) {
			// handle what happens if the month is greater than December
			let remainder = month % 12;
			let divisor = Math.floor(month / 12);
			month = remainder;
			year += divisor;
		}
	} else if (unit.includes('day')) {
		// increase days if the duration is in days
		day += duration;
		if (day > 30) {
			//handle days in months with 30
			if (month == 4 || month == 6 || month == 8 || month == 9 || month == 11) {
				let remainder = day % 30;
				let divisor = Math.floor(day / 30);
				day = remainder;
				month += divisor;
			} else if (
				// handle days in months with 31
				month == 1 ||
				month == 3 ||
				month == 5 ||
				month == 7 ||
				month == 8 ||
				month == 10 ||
				month == 12
			) {
				let remainder = day % 31;
				let divisor = Math.floor(day / 31);
				day = remainder;
				month += divisor;
			} else {
				//handle february
				//we wont handle leap-years
				let remainder = day % 28;
				let divisor = Math.floor(day / 28);
				day = remainder;
				month += divisor;
			}
		}
	} else if (unit.includes('hour')) {
		hour += duration; // increaes hours if duration is in hours
		if (hour >= 24) {
			let remainder = hour % 24; // handle if hours is greater than 24
			let divisor = Math.floor(hour / 24);
			hour = remainder;
			day += divisor;
		}
	} else if (unit.includes('minute')) {
		//increase minutes if duration is in minutes
		minute += duration;
		if (minute >= 60) {
			//handle if minutes is greater than 60
			let remainder = minute % 60;
			let divisor = Math.floor(minute / 60);
			minute = remainder;
			hour += divisor;
		}
	} else if (unit.includes('second')) {
		// increase seconds if duration is in seconds
		second += duration;
		if (second >= 60) {
			//handle if seconds is greater than 60
			let remainder = second % 60;
			let divisor = Math.floor(second / 60);
			second = remainder;
			minute += divisor;
		}
	} else {
		// throw an error if none of these apply
		return 'invalid entry';
	}

	//could add more handeling for time zone.

	//combine the variables back into a new date
	let endDate = `${pad(year)}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
	return endDate;
	//output new date.
}

console.log('Question 3 Outputs:');
console.log(timeMachine('2020-07-17 13:21:34', '10 minutes'));
console.log(timeMachine('2020-07-17 13:21:34', '10 years'));
console.log(timeMachine('2020-07-17 13:21:34', '10 days'));

console.log('Question 3 Test Output:');
//Testing
if (
	timeMachine('2020-07-17 13:21:34', '10 years') === '2030-07-17 13:21:34' &&
	timeMachine('2020-07-17 13:21:34', '10 months') === '2021-05-17 13:21:34' &&
	timeMachine('2020-07-17 13:21:34', '10 days') === '2020-07-27 13:21:34' &&
	timeMachine('2020-07-17 13:21:34', '10 hours') === '2020-07-17 23:21:34' &&
	timeMachine('2020-07-17 13:21:34', '10 minutes') === '2020-07-17 13:31:34' &&
	timeMachine('2020-07-17 13:21:34', '10 seconds') === '2020-07-17 13:21:44' &&
	timeMachine('2020-07-17 13:21:34', '100 years') === '2120-07-17 13:21:34' &&
	timeMachine('2020-07-17 13:21:34', '14 months') === '2021-09-17 13:21:34' &&
	timeMachine('2020-07-17 13:21:34', '40 days') === '2020-08-26 13:21:34' &&
	timeMachine('2020-07-17 13:21:34', '25 hours') === '2020-07-18 14:21:34' &&
	timeMachine('2020-07-17 13:21:34', '80 minutes') === '2020-07-17 14:41:34' &&
	timeMachine('2020-07-17 13:21:34', '100 seconds') === '2020-07-17 13:23:14' &&
	timeMachine('2020-07-17 13:21:34', '1 second') === '2020-07-17 13:21:35' &&
	timeMachine('2020-07-17 13:21:34', '10 milliseconds') === 'invalid entry' &&
	timeMachine('2020-07-17 13:21:34', '1 Coruscant tropical year') === 'invalid entry'
) {
	console.log('true');
} else {
	console.log('false');
}
