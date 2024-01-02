import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/helpers/api-util";
import Head from "next/head";

export default function FilteredEventsPage(props) {
  const { numYear, numMonth } = props;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (props.hasError) {
    return (
      <div className="max-w-2xl mx-auto text-center mb-10 flex items-center justify-center flex-col gap-5 px-5 md:px-0">
        <Head>
          <title>Invalid Filter!</title>
        </Head>

        <p className="font-semibold text-xl text-zinc-800">
          Invalid filter, Please adjust your values!
        </p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  if (!props.events || props.events.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center mb-10 flex items-center justify-center flex-col gap-5 px-5 md:px-0">
        {pageHeadData}

        <p className="font-semibold text-xl text-zinc-800">
          No events found for the chosen filter!
        </p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

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
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,
      numYear,
      numMonth,
    },
  };
}
