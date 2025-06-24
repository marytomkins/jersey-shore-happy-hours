const data = [
  {
    name: "Deal Lake Bar & Co",
    town: "Asbury Park",
    dayText: "Every Monday & Wednesday",
    dayFilter: {
      Monday: ["7:30PM", "9:30PM"],
      Wednesday: ["7:00PM", "9:00PM"],
    },
    timeFilter: ["7:00PM", "8:00PM", "9:00PM"],
    eventFilter: ["Trivia"],
    description:
      "Monday 7:30PM - 9:30PM: Quizzaholics Trivia | Wednesday 7:00PM - 9:00PM: Boozy Trivia",
    link: "https://www.deallakebarco.com/calendar",
  },
  {
    name: "Beach Haus Brewery",
    town: "Belmar",
    dayText: "Every Monday, Tuesday, Thursday",
    dayFilter: {
      Monday: ["5:00PM", "11:00PM"],
      Tuesday: ["4:00PM", "9:00PM"],
      Thursday: ["7:00PM", "9:00PM"],
    },
    timeFilter: [
      "4:00PM",
      "5:00PM",
      "6:00PM",
      "7:00PM",
      "8:00PM",
      "9:00PM",
      "10:00PM",
      "11:00PM",
    ],
    eventFilter: ["Trivia", "Bingo"],
    description:
      "Monday 5:00PM - 11:00PM: Cigar & Whiskey Night on The Rooftop | Tuesday 4:00PM - 9:00PM: Music Bingo | Thursday 7:00PM - 9:00PM: Trivia Night Thursdays",
    link: "https://www.beachhausbeer.com/weekly-fun",
  },
  {
    name: "Anchor Tavern",
    town: "Belmar",
    link: "https://www.anchortavernnj.com/",
    dayText: "Every Friday & Saturday Night, 6:00PM - 9:00PM",
    dayFilter: {
      Friday: ["6:00PM", "9:00PM"],
      Saturday: ["6:00PM", "9:00PM"],
    },
    timeFilter: ["6:00PM", "7:00PM", "8:00PM", "9:00PM"],
    eventFilter: ["Live Music"],
    description: "Live Music",
  },
  {
    name: "Johnny Mac House of Spirits",
    town: "Asbury Park",
    link: "hhttps://www.johnnymacbar.com/",
    dayText: "Wednesdays",
    timeText: "",
    description: "Speed Dating every 2nd Wednesday of the Month",
    dayFilter: {
      Wednesday: ["6:00PM", "9:00PM"],
    },
    timeFilter: [],
  },
  {
    name: "Spring Lake Tap House",
    town: "Spring Lake",
    link: "https://www.springlaketaphouse.com/upcoming-events",
    dayText: "Every Tuesday",
    timeText: "8:00PM - 9:00PM",
    description: "Trivia with DJ Barry",
    dayFilter: {
      Wednesday: ["8:00PM", "9:00PM"],
    },
    timeFilter: ["8:00PM", "9:00PM"],
    eventFilter: ["Trivia"],
  },
  {
    name: "Leggetts Sand Bar",
    town: "Manasquan",
    link: "https://www.leggetts.us/calendar",
    dayText: "Every Thursday & Saturday",
    // timeText: "6:00PM - 9:00PM",
    description:
      "Thursday 6:30PM: Trivia, 10:00PM: Shot Wheel | Saturday 2:00PM: Bingo",
    dayFilter: {
      Thursday: ["6:30PM", "10:00PM"],
      Saturday: ["2:00PM", "3:00PM"],
    },
    timeFilter: ["2:00PM", "6:00PM", "10:00PM"],
    eventFilter: ["Trivia", "Bingo"],
  },
  {
    name: "Reef & Barrel",
    town: "Manasquan",
    link: "https://www.reefandbarrel.com/events",
    dayText: "Every Tuesday",
    timeText: "7:00PM",
    description: "Trivia",
    dayFilter: {
      Tuesday: ["7:00PM", "8:00PM"],
    },
    timeFilter: ["7:00PM"],
    eventFilter: ["Trivia"],
  },
  {
    name: "Pig and Parrot",
    town: "Brielle",
    link: "https://www.thepigandparrot.com/events-brielle",
    dayText: "Every Tuesday",
    timeText: "8:00PM - 11:00PM",
    description: "Bingo with $20 lobster rolls",
    dayFilter: {
      Tuesday: ["8:00PM", "11:00PM"],
    },
    timeFilter: ["8:00PM", "9:00PM", "10:00PM", "11:00PM"],
    eventFilter: ["Bingo"],
  },
    {
    name: "Asbury Ale House",
    town: "Asbury Park",
    link: "https://asburyalehouse.com/events/",
    dayText: "Every Tuesday & Thursday",
    description: "Tuesdays @ 7:00PM: Salsa Night | Thursdays @ 8:30PM: Karaoke",
    dayFilter: {
      Tuesday: ["7:00PM", "8:00PM"],
      Thursday: ["8:30PM", "9:30PM"],
    },
    timeFilter: ["8:00PM", "9:00PM", "7:00PM"],
    eventFilter: ["Karaoke"],
  },
];

export const specialEvents = data.sort((a, b) => a.name.localeCompare(b.name));
