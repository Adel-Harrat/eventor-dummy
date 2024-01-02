import { useState } from "react";
import Button from "../ui/button";
import AddCommentForm from "./add-comment-form";
import DisplayComments from "./display-comments";
import NoEyeIcon from "../icons/no-eye-icon";
import EyeIcon from "../icons/eye-icon";

function Comments() {
  const [commentsShown, setCommentsShown] = useState(false);

  const hideText = (
    <span className="flex items-center gap-3">
      <NoEyeIcon /> <span>Hide Comments</span>
    </span>
  );

  const showText = (
    <span className="flex items-center gap-3">
      <EyeIcon /> Show Comments
    </span>
  );

  return (
    <>
      <div className="flex justify-center my-10">
        <Button onClick={() => setCommentsShown((prev) => !prev)}>
          {commentsShown ? hideText : showText}
        </Button>
      </div>

      {commentsShown && (
        <>
          <AddCommentForm />
          <DisplayComments />
        </>
      )}
    </>
  );
}

export default Comments;
