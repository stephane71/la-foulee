import slug from "slug";

function slugIt(string) {
  return slug(string, { lower: true });
}

export default slugIt;
