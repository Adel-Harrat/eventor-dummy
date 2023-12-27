import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/dummy-data";
import Head from "next/head";
import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData)
    return <p className="text-center text-zinc-600">Loading...</p>;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2023 ||
    numYear < 2022 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div className="max-w-2xl mx-auto text-center mb-10 flex items-center justify-center flex-col gap-5 px-5 md:px-0">
        <Head>
          <title>Eventor | Invalid Filter</title>
        </Head>

        <p className="font-semibold text-xl text-zinc-800">
          Invalid filter, Please adjust your values!
        </p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center mb-10 flex items-center justify-center flex-col gap-5 px-5 md:px-0">
        <Head>
          <title>Eventor | No Events</title>
        </Head>

        <p className="font-semibold text-xl text-zinc-800">
          No events found for the chosen filter!
        </p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <Head>
        <title>Eventor | Filter Results</title>
      </Head>

      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}
