import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { getApi } from "../../api/Api";

const EVENT_EDITION_PATH = `/event/[slug]/[edition]`;

function getParameters(slug) {
  return [{ slug }, "/{slug}", "GET", {}, {}];
}

const Event = ({ place }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <div>Event: {slug}</div>
      <Link href={EVENT_EDITION_PATH} as={`/event/${slug}/2017`}>
        <a>Edition 2017</a>
      </Link>
      <div>{JSON.stringify(place)}</div>
    </div>
  );
};

Event.getInitialProps = async () => {
  const api = await getApi("place");

  try {
    const params = getParameters("paris_paris");
    const place = await api.invokeApi(...params).then(res => res.data);
    return { place };
  } catch (e) {
    console.log(e);
    // TODO handle errors
    return { place: "No place found" };
  }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
