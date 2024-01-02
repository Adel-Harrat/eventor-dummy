import EventList from "@/components/events/event-list";
import NewsletterForm from "@/components/newsletter/newsletter-form";
import { getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";

export default function Home(props) {
  return (
    <section>
      <Head>
        <title>Eventor</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>

      <NewsletterForm />

      <EventList items={props.featuredEvents} />
    </section>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
