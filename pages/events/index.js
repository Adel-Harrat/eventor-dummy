import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helpers/api-util";
import Head from "next/head";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <Head>
        <title>All Events</title>
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
