function getLaFouleeEvent(currentEvent) {
  const {
    keyword,
    date,
    title,
    city,
    type,
    status,
    infos,
    organizer,
    activities,
    websites,
  } = currentEvent;

  return {
    keyword,
    date,
    title,
    type,
    geohash: city.geohash,
    place: city.slug,
    county: city.county,
    status,
    infos,
    organizer,
    activities,
    websites,
  };
}

export default getLaFouleeEvent;
