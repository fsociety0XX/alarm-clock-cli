const readline = require("readline");

class Alarm {
  constructor(day, time) {
    this.day = day;
    this.time = time;
    this.snoozeCount = 0;
  }

  snooze() {
    if (this.snoozeCount < 3) {
      const [hours, minutes] = this.time.split(":").map(Number);
      const newTime = new Date(0, 0, 0, hours, minutes + 5);
      this.time = newTime.toTimeString().slice(0, 5);
      this.snoozeCount += 1;
    } else {
      console.log("You have reached the snooze limit.");
    }
  }
}

class AlarmClock {
  constructor() {
    this.alarms = [];
  }

  displayCurrentTime() {
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    console.log(
      `Your current time is: ${new Date().toLocaleTimeString("en-US", options)}`
    );
  }

  addAlarm(day, time) {
    this.alarms.push(new Alarm(day, time));
    console.log(`Your new alarm is set for: ${day} - ${time}`);
  }

  deleteAlarm(index) {
    if (index >= 0 && index < this.alarms.length) {
      this.alarms.splice(index, 1);
      console.log(`Alarm number ${index} deleted.`);
    } else {
      console.log("Please give a valid alarm number.");
    }
  }

  snoozeAlarm(index) {
    if (index >= 0 && index < this.alarms.length) {
      this.alarms[index].snooze();
      console.log(
        `Alarm number ${index} snoozed to ${this.alarms[index].time}`
      );
    } else {
      console.log("Please give a valid alarm number.");
    }
  }

  listAlarms() {
    if (this.alarms.length === 0) {
      console.log(`You haven't set any alarms yet.`);
    } else {
      console.log("Your alarms:");
      this.alarms.forEach((alarm, index) => {
        console.log(`Alarm number ${index} - ${alarm.day} at ${alarm.time}`);
      });
    }
  }
}

const alarmClock = new AlarmClock();
const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Alarm Clock CLI");
console.log("Please use below commands to interact with Alarm clock:");
console.log("1. time - Display current time");
console.log("2. add <day> <time> - Add alarm");
console.log("3. delete <alarm number> - Delete alarm");
console.log("4. snooze <alarm number> - Snooze alarm");
console.log("5. list - Get all alarms");
console.log("6. exit - Exit alarm clock");

userInput.on("line", (input) => {
  const [command, ...rest] = input.trim().split(" ");

  switch (command) {
    case "time":
      alarmClock.displayCurrentTime();
      break;
    case "add":
      const [day, time] = rest;
      alarmClock.addAlarm(day, time);
      break;
    case "delete":
      alarmClock.deleteAlarm(parseInt(rest[0]));
      break;
    case "snooze":
      alarmClock.snoozeAlarm(parseInt(rest[0]));
      break;
    case "list":
      alarmClock.listAlarms();
      break;
    case "exit":
      rl.close();
      process.exit(0);
      break;
    default:
      console.log("Please type a valid command.");
      break;
  }
});
