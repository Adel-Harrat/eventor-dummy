import Image from "next/image";
import timesago from "timesago";

export default function CommentItem({ name, comment, timestamp }) {
  return (
    <li>
      <article className="flex items-start justify-between gap-5">
        <div className="h-12 w-12 rounded-full overflow-hidden aspect-square hidden sm:block">
          <Image
            src="/images/comment-author.png"
            alt={name}
            height="48"
            width="48"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h2 className="text-zinc-600 font-semibold text-base">{name}</h2>
            <h3 className="text-zinc-500 text-sm">
              Commented {timesago(timestamp)}
            </h3>
          </div>
          <p className="text-lg font-semibold text-zinc-700 leading-7 bg-white p-5 rounded-lg shadow-lg mt-2">
            {comment}
          </p>
        </div>
      </article>
    </li>
  );
}
