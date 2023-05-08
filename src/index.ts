import "dotenv/config";
import Koa from "koa";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import { onDatabaseConnect } from "./config/knex";
import router from "./routes/index";

const main = async () => {
  await onDatabaseConnect();
  const app = new Koa();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser());

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(process.env.PORT, () =>
    console.log(`Koa is live with port ${process.env.PORT}`)
  );
};

main();
