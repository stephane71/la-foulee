function getPrice(inscriptionFee = null) {
  if (!inscriptionFee) return null;

  let price = inscriptionFee.match(/[0-9]+\ *(€|euros|euro|eur)/g);
  if (price) {
    price = price.map((p) => p.replace(/\ */g, "").match(/[0-9]*/)[0]);
    return parseInt(price.sort((a, b) => b - a)[0]);
  }

  price = inscriptionFee.match(/(euros|eur|€)[0-9]+/g);
  if (price) {
    price = price.map((p) => p.replace(/\ */g, "").match(/[0-9]+/)[0]);
    return parseInt(price.sort((a, b) => b - a)[0]);
  }

  price = parseInt(inscriptionFee);
  if (!Number.isNaN(price)) {
    return price;
  }

  price = inscriptionFee.match(/gratuit/i);
  if (price) return 0;

  return null;
}

function formatEventDetailsActivitiesPrices(event) {
  const { activities = [], ...rest } = event;

  if (!activities.length) return event;

  return {
    ...rest,
    activities: activities.map(({ inscriptionFee, ...activity }) => ({
      ...activity,
      price: getPrice(inscriptionFee),
      inscriptionFee,
    })),
  };
}

export default formatEventDetailsActivitiesPrices;
