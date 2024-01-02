import { useEffect, useState } from "react";
import CommentItem from "./comment-item";
import { useRouter } from "next/router";
import LoadingIcon from "../icons/loading-icon";
import ExclamationTriangleIcon from "../icons/exclamation-triangle-icon";

function DisplayComments() {
  const router = useRouter();
  const { eventId } = router.query;
  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchingComments() {
      await fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);

          if (data.status === "success") {
            setComments(data.comments);
            setCommentsLength(data.commentsLength);
          } else {
            setHasError(true);
          }
        });
    }

    fetchingComments();
  }, []);

  if (isLoading && !hasError) {
    return (
      <>
        <div className="flex items-center justify-center py-5">
          <LoadingIcon />
        </div>
      </>
    );
  }

  if (!isLoading && hasError) {
    return (
      <div className="my-10 px-5 md:px-0">
        <p className="text-center text-red-600 font-bold flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="flex-shrink-0">
            <ExclamationTriangleIcon />
          </span>
          <span>Something went wrong when loading comments!</span>
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto mb-10 px-5 md:px-0">
      <h2 className="mb-5 text-xl font-bold text-zinc-800">
        {commentsLength} {commentsLength === "01" ? "Comment" : "Comments"}
      </h2>
      <ul className="space-y-10">
        {comments.map((item) => (
          <CommentItem
            key={item._id}
            name={item.name}
            comment={item.comment}
            timestamp={item.timestamp}
          />
        ))}
      </ul>
    </section>
  );
}

export default DisplayComments;
