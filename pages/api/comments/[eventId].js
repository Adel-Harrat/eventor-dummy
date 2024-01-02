import validateEmail from "@/helpers/validate-email";
import sendError, {
  connectDatabase,
  getDocumentsBy,
  insertDocument,
} from "@/helpers/db-util";

async function handler(req, res) {
  const { eventId } = req.query;

  // METHOD = POST
  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    // Validate data
    if (email === "" || name === "" || comment === "") {
      sendError(res, "Oops! Could you please fill in the empty fields?", 400);
    } else if (name.length < 3 || name.length > 15) {
      sendError(res, "Name must be between 3 and 15 characters!", 400);
    } else if (comment.length < 10 || comment.length > 300) {
      sendError(res, "Comment must be between 10 and 300 characters!", 400);
    } else if (!validateEmail(email)) {
      sendError(res, "Your email adress is invalid, try again!", 400);
    } else {
      let client;

      try {
        client = await connectDatabase();
      } catch (err) {
        sendError(res, "Connecting to the database failed!", 500);
      }

      try {
        const newComment = {
          email,
          name,
          comment,
          eventId,
          timestamp: new Date().toISOString(),
        };
        await insertDocument(client, "comments", newComment);
      } catch (err) {
        sendError(res, "Inserting data failed!", 500);
      }

      res.status(200).json({
        message: "Comment successfully submitted!",
        status: "success",
      });
    }

    // METHOD = GET
  } else if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      sendError(res, "Couldn't connect to the database!", 500);
    }

    try {
      const comments = await getDocumentsBy(
        client,
        "comments",
        { eventId },
        { timestamp: -1 }
      );

      const length = comments.length;

      res.status(200).json({
        status: "success",
        comments,
        commentsLength: length < 10 ? `0${length}` : length,
      });
    } catch (err) {
      sendError(res, "Oops, Couldn't fetch comments!", 500);
    }
  }

  client.close();
}

export default handler;
