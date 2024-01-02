import Comments from "@/components/comments/comments";
import AdressIcon from "@/components/icons/adress-icon";
import DateIcon from "@/components/icons/date-icon";
import Button from "@/components/ui/button";
import { getEventById, getAllEvents } from "@/helpers/api-util";
import Head from "next/head";
import Image from "next/image";

function EventDetailPage(props) {
  const { event, hasError } = props;

  if (!event || hasError) {
    return (
      <>
        <Head>
          <title>No Event Found!</title>
        </Head>
        <div className="max-w-2xl mx-auto text-center mb-10 flex items-center justify-center flex-col gap-5 px-5 md:px-0">
          <p className="font-semibold text-xl text-zinc-800">No Event Found!</p>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const humanReadableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAdress = event.location?.replace(", ", "\n");

  return (
    <>
      <Head>
        <title>{event.title}</title>
      </Head>

      <article className="max-w-2xl mx-auto px-5 md:px-0">
        <h1 className="text-4xl font-bold text-blue-500 mb-5 leading-10">
          {event.title}
        </h1>

        <section>
          <Image
            src={"/" + event.image}
            alt={event.title}
            width={672}
            height={448}
            className="rounded-xl shadow-lg"
          />

          <p className="mt-5 font-medium text-zinc-800 indent-5 leading-loose">
            {event.description}
          </p>

          <div className="flex flex-col gap-y-10 md:gap-0 md:flex-row items-center justify-between mt-10">
            <div>
              <time className="text-zinc-800 text-lg sm:text-xl font-semibold flex gap-2 items-center px-5 mb-1 mt-2">
                <DateIcon />
                {humanReadableDate}
              </time>
            </div>

            <div>
              <address className="text-zinc-800 text-lg sm:text-xl font-semibold px-5 flex gap-2 items-center">
                <AdressIcon />
                {formattedAdress}
              </address>
            </div>
          </div>
        </section>
      </article>

      <Comments />
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
}

export default EventDetailPage;
