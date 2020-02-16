import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Api from "../../api/Api";

const apiSingleton = new Api();

function getParameters(slug) {
  return [{ slug }, "/{slug}", "GET", {}, {}];
}

const Event = ({ stars, place }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <div>Event: {slug}</div>
      <div>Next stars: {stars}</div>
      <Link href="/event/[slug]/[edition]" as={`/event/${slug}/2017`}>
        <a>Edition 2017</a>
      </Link>
      {JSON.stringify(place)}
    </div>
  );
};

Event.getInitialProps = async () => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();

  const api = await apiSingleton.getAPI("place");
  const place = await api
    .invokeApi(...getParameters("paris_paris"))
    .then(res => res.data);

  return { stars: json.stargazers_count, place };
};

export default Event;
