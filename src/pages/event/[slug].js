import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Event = ({ stars }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <div>Event: {slug}</div>
      <div>Next stars: {stars}</div>
      <Link href="/event/[slug]/[edition]" as={`/event/${slug}/2017`}><a>Edition 2017</a></Link>
    </div>
  );
};

Event.getInitialProps = async () => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Event;
