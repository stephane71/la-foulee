const KEPT_ATTRIBUTES = [
  "Conditions",
  "Infos Epreuve",
  "Montant Inscription",
  "activity",
  "Epreuves",
];

const FORMATED_NAME = {
  Conditions: "conditions",
  "Infos Epreuve": "info",
  "Montant Inscription": "inscriptionFee",
  activity: "activity",
  Epreuves: "epreuves",
};

function getAttribute(data, name) {
  return data.find((attributes) => attributes.name === name) || {};
}

function getActivities(activities) {
  /*
   * activities: [{name: 'activity'}, {...}, ..., {name: 'activity'}, {...}, ...,]
   * An object with attr name = 'activity' is followed by all attr of this current activity
   * Until the next attr name = 'activity'
   * */
  const reducedActivities = activities.reduce((current, next) => {
    if (!current.length) return [[next]];
    if (next.name === "activity") current.push([next]);
    else current[current.length - 1].push(next);
    return current;
  }, []);

  return reducedActivities.map((data) => {
    let conditions = getAttribute(data, "conditions");
    let info = getAttribute(data, "info");
    let inscriptionFee = getAttribute(data, "inscriptionFee");
    let epreuves = getAttribute(data, "epreuves");

    conditions = conditions.value ? `${conditions.value}\n` : "";
    info = info.value ? info.value : "";
    epreuves = epreuves.value || "";

    let globalInfo = getAttribute(data, "activity");
    // { name: 'activity', title: 'title', time: 'time', distance: 'distance' }
    let { title = "", distance = "", time = "" } = globalInfo;

    return {
      info: `${conditions}${info}`.trim() || null,
      inscriptionFee: inscriptionFee.value || null,
      title: title.trim() || null,
      distance: distance.trim() || epreuves.trim() || null,
      time: time.trim() || null,
    };
  });
}

function formatEventDetailsActivities(event) {
  // EXTRACT attributes
  let activities = event.activities.filter(({ name }) =>
    KEPT_ATTRIBUTES.includes(name)
  );

  // FORMAT attributes names
  activities = activities.map(({ name, ...rest }) => ({
    name: FORMATED_NAME[name],
    ...rest,
  }));

  // MERGE
  return { ...event, activities: getActivities(activities) };
}

export default formatEventDetailsActivities;
