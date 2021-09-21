const NO_TAGS = "0";
const TAGS = {
  "10km": 1,
  "20km": 2,
  "Semi-Marathon": 3,
  Marathon: 4,
  "Trail-Court": 5,
  Trail: 6,
  "Ultra-Trail": 7,
};

const trailREXP = /trail/i;
const marathonREXP = /marathon/i;
const semiMarathonREXP = /semi/i;

function getEventTypeValue(title, activities) {
  if (!activities || !activities.length) {
    return NO_TAGS;
  }

  let typeValue = [];

  activities.forEach(({ distance }) => {
    if (!distance) {
      if (trailREXP.test(title) && !typeValue.includes(TAGS["Trail"]))
        typeValue.push(TAGS["Trail"]);
      else if (
        semiMarathonREXP.test(title) &&
        !typeValue.includes(TAGS["Semi-Marathon"])
      )
        typeValue.push(TAGS["Semi-Marathon"]);
      else if (
        marathonREXP.test(title) &&
        !typeValue.includes(TAGS["Marathon"])
      )
        typeValue.push(TAGS["Marathon"]);
    } else if (trailREXP.test(title)) {
      if (distance < 42000 && !typeValue.includes(TAGS["Trail-Court"]))
        typeValue.push(TAGS["Trail-Court"]);
      else if (
        distance >= 42000 &&
        distance < 80000 &&
        !typeValue.includes(TAGS["Trail"])
      )
        typeValue.push(TAGS["Trail"]);
      else if (distance >= 80000 && !typeValue.includes(TAGS["Ultra-Trail"]))
        typeValue.push(TAGS["Ultra-Trail"]);
    } else {
      if (distance === 10000 && !typeValue.includes(TAGS["10km"]))
        typeValue.push(TAGS["10km"]);
      else if (distance === 20000 && !typeValue.includes(TAGS["20km"]))
        typeValue.push(TAGS["20km"]);
      else if (
        distance > 21000 &&
        distance < 22000 &&
        semiMarathonREXP.test(title) &&
        !typeValue.includes(TAGS["Semi-Marathon"])
      )
        typeValue.push(TAGS["Semi-Marathon"]);

      if (
        distance > 42000 &&
        distance < 43000 &&
        marathonREXP.test(title) &&
        !typeValue.includes(TAGS["Marathon"])
      )
        typeValue.push(TAGS["Marathon"]);
    }
  });

  return typeValue.length ? typeValue.sort((a, b) => a - b).join("") : NO_TAGS;
}

function getEventType(event) {
  const { title, activities } = event;
  return getEventTypeValue(title, activities);
}

export default getEventType;
