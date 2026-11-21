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

const AGENCY_SERVICES = [
  {
    slug: "social-media-management",
    category: "Social Growth",
    bilingualSupport: true,
    deliverables: ["Editorial Calendar", "Community Management", "Monthly KPI Reporting"],
  },
  {
    slug: "content-production",
    category: "Creative Studio",
    bilingualSupport: true,
    deliverables: ["4K Commercial Reels", "Product Photography", "Motion Graphics"],
  },
  {
    slug: "paid-growth-campaigns",
    category: "Performance Ads",
    bilingualSupport: true,
    deliverables: ["Meta & TikTok Ads", "Conversion Tracking", "ROAS Optimization"],
  },
  {
    slug: "brand-strategy",
    category: "Identity & Positioning",
    bilingualSupport: true,
    deliverables: ["Visual Identity Systems", "Multilingual Brand Voice", "Market Launch Playbook"],
  },
] as const;

router.get("/services", (_req, res) => {
  res.json({
    agency: "CySocial",
    region: "Northern Cyprus (KKTC)",
    supportedLocales: ["tr", "en", "ru", "ar"],
    services: AGENCY_SERVICES,
  });
});

router.get("/services/:slug", (req, res) => {
  const { slug } = req.params;
  const match = AGENCY_SERVICES.find((s) => s.slug === slug);
  if (!match) {
    res.status(404).json({ error: "Service not found", slug });
    return;
  }
  res.json({
    agency: "CySocial",
    supportedLocales: ["tr", "en", "ru", "ar"],
    service: match,
  });
});

export default router;
