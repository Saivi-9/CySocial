import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/meta", (_req, res) => {
  res.json({
    service: "CySocial Agency API",
    status: "ok",
    supportedLocales: ["tr", "en", "ru", "ar"],
  });
});

export default router;
