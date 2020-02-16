import { useRouter } from "next/router";

const Event = () => {
  const router = useRouter();
  const { edition } = router.query;

  return (
    <div>
      <div>Event edition: {edition}</div>
    </div>
  );
};

export default Event;
