import express, { Request, Response } from "express";
import path from "path";
import fileupload, { UploadedFile } from "express-fileupload";
import dotenv from "dotenv";
import DbFacade from "../data/dbFacade.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

const dbFacade = new DbFacade();

dotenv.config();

export const fileManagementRouter = express.Router();
const port = process.env.PORT;

fileManagementRouter.use(fileupload());

fileManagementRouter.get("/", (req: Request, res: Response) => {
  res.send(`<html>
  <body>
    <form ref='uploadForm' 
      id='uploadForm' 
      action='http://localhost:${port}/file/upload' 
      method='post' 
      encType="multipart/form-data">
          <label for="cars">Choose a car:</label>
          <select id="cars" name="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
        <input type="file" name="uploadedFile" />
        <input type='submit' value='Upload!' />
    </form>     
  </body>
</html>`);
});

fileManagementRouter.post("/upload", async function (req, res) {
  let uploadedFile: UploadedFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(req.body.cars);

  if (Array.isArray(req.files.uploadedFile)) {
    req.files.uploadedFile = req.files.uploadedFile[0];
  }
  uploadedFile = req.files.uploadedFile;
  // await processStGeorgeSavings(uploadedFile.data);
  uploadPath = path.normalize(
    process.cwd() + `/uploads/${dayjs().format("YYYY-MM-DD-HH-mm-ss")}.csv`
  );
  uploadedFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
});

const processStGeorgeSavings = async (data: Buffer) => {
  const lines = data.toString().split(/(?:\r\n|\r|\n)/g);
  const dateIndex = 0;
  const descIndex = 1;
  const debitIndex = 2;
  const creditIndex = 3;
  const maxIndex = Math.max(dateIndex, descIndex, debitIndex, creditIndex);

  for (let i = 1; i < lines.length; i++) {
    const lineArray = lines[i].split(",");
    if (lineArray.length >= maxIndex) {
      const date = dayjs(lineArray[dateIndex], "DD/MM/YYYY");
      const description = lineArray[descIndex];
      const debitAmt =
        lineArray[debitIndex] == "" ? 0 : Number(lineArray[debitIndex]);
      const creditAmt =
        lineArray[creditIndex] == "" ? 0 : Number(lineArray[creditIndex]);

      console.log(`${i}, ${date}, ${description}, ${debitAmt}, ${creditAmt}`);

      await dbFacade.transactions.insert({
        account: 1,
        date: date,
        description: description,
        debitAmount: debitAmt,
        creditAmount: creditAmt,
      });
    }
  }
};
