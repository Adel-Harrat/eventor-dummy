import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AdressIcon from "../icons/adress-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Image from "next/image";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAdress = location.replace(", ", "\n");

  const ExploreLink = `/events/${id}`;

  return (
    <li className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all ease-in-out duration-300 border-zinc-950/50 hover:scale-105 grid grid-cols-1 sm:grid-cols-2">
      <div className="h-44 sm:h-full overflow-hidden relative">
        <Image
          src={"/" + image}
          alt={title}
          className="object-cover hover:scale-150 hover:rotate-12 hover:saturate-50 transition-all ease-in-out duration-300 h-full"
          width={344}
          height={240}
        />
      </div>

      <div className="flex flex-col justify-between">
        <h2 className="px-5 pt-5 text-xl sm:text-2xl font-bold text-zinc-800 mb-3">
          {title}
        </h2>

        <div>
          <time className="text-zinc-600 text-sm sm:text-md font-medium flex gap-2 items-center px-5 mb-1 mt-2">
            <DateIcon />
            {humanReadableDate}
          </time>
        </div>

        <div>
          <address className="text-zinc-500 text-xs sm:text-sm font-medium px-5 flex gap-2 items-center">
            <AdressIcon />
            {formattedAdress}
          </address>
        </div>

        <div className="flex justify-end py-5 pr-5">
          <Button link={ExploreLink}>
            Explore
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
