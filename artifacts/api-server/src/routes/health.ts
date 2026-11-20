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

router.get("/services", (_req, res) => {
  res.json({
    agency: "CySocial",
    region: "Northern Cyprus (KKTC)",
    supportedLocales: ["tr", "en", "ru", "ar"],
    services: [
      { slug: "social-media-management", category: "Social Growth", bilingualSupport: true },
      { slug: "content-production", category: "Creative Studio", bilingualSupport: true },
      { slug: "paid-growth-campaigns", category: "Performance Ads", bilingualSupport: true },
      { slug: "brand-strategy", category: "Identity & Positioning", bilingualSupport: true },
    ],
  });
});

export default router;
