import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents, getFilteredEvents } from "@/dummy-data";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const allEvents = getAllEvents();

  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <Head>
        <title>Eventor | All Events</title>
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
}
