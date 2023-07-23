import winston, { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(format.json(), format.timestamp()),
  transports: [new transports.File({ filename: "log.log" })],
});
