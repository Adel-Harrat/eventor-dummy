import { useRef, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import validateEmail from "@/helpers/validate-email";
import LoadingIcon from "../icons/loading-icon";
import Label from "../ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function AddCommentForm(props) {
  const router = useRouter();
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const eventId = router.query.eventId;

  async function submitFormHandler(e) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (enteredEmail === "" || enteredName === "" || enteredComment === "") {
      toast.error("All fields are required !");
    } else if (!validateEmail(enteredEmail)) {
      toast.error("Your email adress is invalid, try again!");
    } else if (enteredName.length < 3 || enteredName.length > 15) {
      toast.error("Name must be between 3 and 15 characters!");
    } else if (enteredComment.length < 10 || enteredComment.length > 300) {
      toast.error("Comment must be between 10 and 300 characters!");
    } else {
      setIsLoading(true);
      await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          name: enteredName,
          comment: enteredComment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message);
            emailInputRef.current.value = "";
            nameInputRef.current.value = "";
            commentInputRef.current.value = "";
          } else {
            toast.error(data.message ?? "Something went wrong!");
          }
          setIsLoading(false);
        });
    }
  }
  return (
    <form
      onSubmit={submitFormHandler}
      className="max-w-lg mx-auto px-5 md:px-0 mt-10 mb-10"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="basis-full md:basis-1/2 w-full flex flex-col">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="example@mail.com"
            inputRef={emailInputRef}
          />
        </div>

        <div className="basis-full md:basis-1/2 flex flex-col w-full">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" inputRef={nameInputRef} />
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <Label htmlFor="comment">Your comment</Label>
        <Textarea
          id="comment"
          placeholder="Say your mind here..."
          inputRef={commentInputRef}
        />
      </div>

      {error && (
        <p className="text-center text-red-600 font-bold text-sm mt-5">
          {error}
        </p>
      )}

      {success && (
        <p className="text-center text-green-600 font-bold text-sm mt-5">
          {success}
        </p>
      )}

      <div className="mt-5 flex justify-end">
        <Button disabled={isLoading}>
          {!isLoading ? (
            <>Submit Comment</>
          ) : (
            <>
              <LoadingIcon white={true} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default AddCommentForm;
