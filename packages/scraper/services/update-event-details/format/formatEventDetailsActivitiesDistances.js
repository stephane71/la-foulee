function getDistance(distance) {
  distance = distance || "";
  distance = distance.trim();
  if (!distance) return null;

  // console.log(distance);
  // let value = distance.match(/[0-9]+m/);
  // debugger;
  // if (value.length) return parseInt(distance.slice(0, -1));
  // return null;

  return parseInt(distance) || null;
}

function formatEventDetailsActivitiesDistances(event) {
  let activities = event.activities.map(({ distance, ...rest }) => ({
    distance: getDistance(distance),
    ...rest,
  }));

  return { ...event, activities };
}

export default formatEventDetailsActivitiesDistances;
