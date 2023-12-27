import EventItem from "./event-item";

function EventList(props) {
  const { items } = props;

  return (
    <ul className="sm:grid sm:grid-cols-1 gap-10 px-5 sm:px-10 space-y-10 sm:space-y-0 max-w-3xl mx-auto mb-10">
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          date={event.date}
          title={event.title}
          image={event.image}
          adress={event.adress}
          location={event.location}
        />
      ))}
    </ul>
  );
}

export default EventList;
