import { useRef, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import validateEmail from "@/helpers/validate-email";
import LoadingIcon from "../icons/loading-icon";
import toast from "react-hot-toast";

function NewsletterForm() {
  const emailInputRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  async function submitFormHandler(e) {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const enteredEmail = emailInputRef.current.value;

    if (enteredEmail === "") {
      toast.error("Please provide an email adress!");
    } else if (!validateEmail(enteredEmail)) {
      toast.error("Your email adress is invalid, try again!");
    } else {
      setIsLoading(true);

      await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message);
            emailInputRef.current.value = "";
          } else {
            toast.error(data.message);
          }
        })
        .catch(() => {
          toast.error(
            "Oops! Something went wrong. Please check your internet connection."
          );
          setError();
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <section className="max-w-lg mx-auto mb-10 px-5 md:px-0">
      <h2 className="text-center font-bold text-zinc-700 text-2xl">
        Sign up to stay updated!
      </h2>

      <form
        onSubmit={submitFormHandler}
        className="grid grid-cols-3 gap-3 mt-5"
      >
        <Input
          id="email"
          placeholder="Your Email Adress..."
          className="col-span-3 md:col-span-2"
          inputRef={emailInputRef}
          readOnly={isLoading}
        />
        <Button disabled={isLoading} className="col-span-3 md:col-span-1">
          {isLoading ? (
            <>
              <LoadingIcon white={true} />
            </>
          ) : (
            <span className="w-full">Register</span>
          )}
        </Button>
        {error && (
          <p className="col-span-3 text-center text-red-600 font-bold">
            {error}
          </p>
        )}
        {success && (
          <p className="col-span-3 text-center text-green-600 font-bold">
            {success}
          </p>
        )}
      </form>
    </section>
  );
}

export default NewsletterForm;
