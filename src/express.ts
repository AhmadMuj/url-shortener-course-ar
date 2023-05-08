import "dotenv/config";
import express from "express";
import { resolveURL } from "./services/urls";

const app = express();

app.use((req, res, next) => {
  (req as any).user_id = "10";
  next();
});

app.get("/", (req, res) => {
  res.send((req as any).user_id);
});

app.use((e: any, req: any, res: any, next: any) => {
  console.log(e);
  res.send("Internal Server Error");
});

app.listen(process.env.PORT, () =>
  console.log(`Connected to ${process.env.PORT}`)
);
