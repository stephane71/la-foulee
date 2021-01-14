/*
  Some events has been declared multiple times.
  The organizor declared one event per race !
  Solution:
  When I compared the details page of some this events, they all seems to be identical.
  A simple solution will be to keep the first event in the list
  WARNING: Number of races ?
*/

module.exports = function removeDuplicateKeyword(events) {
  let uniqKeywordList = [];
  return events.filter(({ keyword }) => {
    let duplicate = uniqKeywordList.includes(keyword);
    if (!duplicate) uniqKeywordList.push(keyword);
    return !duplicate;
  });
};
