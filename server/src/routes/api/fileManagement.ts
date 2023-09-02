import express, { Request, Response } from "express";
import path from "path";
import fileupload, { UploadedFile } from "express-fileupload";
import dotenv from "dotenv";
import DbFacade from "../../data/dbFacade.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { logger } from "../../utils/logger.js";

dayjs.extend(customParseFormat);

const dbFacade = new DbFacade();

dotenv.config();

export const fileManagementRouter = express.Router();

fileManagementRouter.use(fileupload());

fileManagementRouter.post("/upload", async function (req, res) {
  let uploadedFile: UploadedFile;
  let uploadPath;

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    if (Array.isArray(req.files.file)) {
      req.files.file = req.files.file[0];
    }
    uploadedFile = req.files.file;
    await processFile(uploadedFile.data, Number(req.body.accountId), {
      dateIndex: 0,
      descIndex: 1,
      debitIndex: 2,
      creditIndex: 3,
    });
    uploadPath = path.normalize(
      process.cwd() + `/uploads/${dayjs().format("YYYY-MM-DD-HH-mm-ss")}.csv`
    );
    uploadedFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      res.send("File uploaded!");
    });
  } catch (error) {
    logger.error(error);
  }
});

const processFile = async (
  data: Buffer,
  accountId: number,
  columns: {
    dateIndex: number;
    descIndex: number;
    debitIndex: number;
    creditIndex: number;
  }
) => {
  const lines = data.toString().split(/(?:\r\n|\r|\n)/g);
  const maxIndex = Math.max(
    columns.dateIndex,
    columns.descIndex,
    columns.debitIndex,
    columns.creditIndex
  );

  for (let i = 1; i < lines.length; i++) {
    const lineArray = lines[i].split(",");
    if (lineArray.length >= maxIndex) {
      const date = dayjs(lineArray[columns.dateIndex], "DD/MM/YYYY");
      const description = lineArray[columns.descIndex];
      const debitAmt =
        lineArray[columns.debitIndex] == ""
          ? 0
          : Number(lineArray[columns.debitIndex]);
      const creditAmt =
        lineArray[columns.creditIndex] == ""
          ? 0
          : Number(lineArray[columns.creditIndex]);

      console.log(`${i}, ${date}, ${description}, ${debitAmt}, ${creditAmt}`);

      await dbFacade.transactions.insert({
        accountId: accountId,
        date: date,
        description: description,
        debitAmount: debitAmt,
        creditAmount: creditAmt,
      });
    }
  }
};
