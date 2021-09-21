const NULL_ATTRIBUTE = null;

const KEPT_ATTRIBUTES = [
  "Conditions",
  "Organisateur",
  "Site Web",
  "Engagement en ligne",
  "Autres Infos",
  "Infos Epreuve",
  "Montant Inscription",
  "Organisation",
  "Epreuves",
  "activities",
  "ffaCode",
];

const FORMATED_NAME = {
  Conditions: "conditions",
  Organisateur: "organisateur",
  "Site Web": "webSite",
  "Engagement en ligne": "inscriptionsWebSite",
  "Autres Infos": "divers",
  "Infos Epreuve": "info",
  "Montant Inscription": "inscriptionFee",
  activities: "activities",
  ffaCode: "ffaCode",
  Organisation: "organisation",
  Epreuves: "epreuves",
};

function getAttribute(data, name) {
  return data.find((attributes) => attributes.name === name) || {};
}

function getInfo(data) {
  //let inscriptionFee = getAttribute(data, "inscriptionFee");
  //let conditions = getAttribute(data, "conditions");
  let info = getAttribute(data, "info");
  let divers = getAttribute(data, "divers");
  let epreuves = getAttribute(data, "epreuves");

  //inscriptionFee = inscriptionFee.value ? `${inscriptionFee.value}\n` : "";
  //conditions = conditions.value ? `${conditions.value}\n` : "";
  info = info.value ? `${info.value}\n` : "";
  divers = divers.value || "";
  epreuves = epreuves.value || "";

  let ret = `${info}${divers}`.trim();

  return ret.length ? ret : epreuves.trim();
}

function getWebSite(data) {
  let sites = [];

  let webSite = getAttribute(data, "webSite");
  let inscriptionsWebSite = getAttribute(data, "inscriptionsWebSite");

  if (webSite.value) sites.push(webSite.value);
  if (inscriptionsWebSite.value) sites.push(inscriptionsWebSite.value);

  // Only one website, all the informations should be present in it.
  // TODO: add a dedicated attribute for inscriptions
  return sites[0];
}

function getOrganizer(organizer) {
  return {
    name: organizer || NULL_ATTRIBUTE,
  };
}

function getEventDetails(data) {
  const ffaCode = getAttribute(data, "ffaCode");
  const activities = getAttribute(data, "activities");
  let organisateur = getAttribute(data, "organisateur");
  let organisation = getAttribute(data, "organisation");

  organisateur = organisateur.value ? organisateur.value : "";
  organisation = organisation.value ? organisation.value : "";

  return {
    info: getInfo(data) || NULL_ATTRIBUTE,
    webSite: getWebSite(data) || NULL_ATTRIBUTE,
    organizer: getOrganizer(organisateur || organisation),
    activities: activities.value || [],
    ffaCode: ffaCode.value || NULL_ATTRIBUTE,
  };
}

function formatEventDetails(event) {
  // EXTRACT attributes
  let data = event.filter(({ name }) => KEPT_ATTRIBUTES.includes(name));

  // FORMAT attributes names
  data = data.map(({ name, ...rest }) => ({
    name: FORMATED_NAME[name],
    ...rest,
  }));

  // MERGE attributes
  return getEventDetails(data);
}

export default formatEventDetails;
