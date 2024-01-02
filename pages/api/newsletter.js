import sendError, { connectDatabase, insertDocument } from "@/helpers/db-util";
import validateEmail from "@/helpers/validate-email";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (email === "") sendError(res, "Please provide an email adress!", 400);
    else if (!validateEmail(email)) {
      sendError(res, "Your email adress is invalid, try again!", 400);
    } else {
      let client;

      try {
        client = await connectDatabase();
      } catch (error) {
        sendError(res, "Connecting to the database failed!");
      }

      try {
        await insertDocument(client, "newsletter", { email });
        client.close();
      } catch (error) {
        sendError(res, "Inserting data failed!");
      }

      res.status(201).json({
        message: "Your email has been added to our newsletter.",
        status: "success",
      });
    }
  }
}

export default handler;
