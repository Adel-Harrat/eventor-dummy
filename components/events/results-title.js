import Button from "../ui/button";

export default function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto text-center mb-10 flex items-center justify-center flex-col gap-5">
      <h2 className="font-semibold text-xl text-zinc-800">
        Events in {humanReadableDate}
      </h2>

      <Button link="/events">Show All Events</Button>
    </div>
  );
}
