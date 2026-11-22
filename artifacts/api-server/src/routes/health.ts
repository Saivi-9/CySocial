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

router.get("/services", (req, res) => {
  const rawCategory = typeof req.query.category === "string" ? req.query.category.trim().toLowerCase() : "";
  const filtered = rawCategory
    ? AGENCY_SERVICES.filter((s) => s.category.toLowerCase() === rawCategory)
    : AGENCY_SERVICES;

  res.json({
    agency: "CySocial",
    region: "Northern Cyprus (KKTC)",
    supportedLocales: ["tr", "en", "ru", "ar"],
    totalServices: filtered.length,
    services: filtered,
  });
});

router.get("/services/:slug", (req, res) => {
  const normalizedSlug = req.params.slug.trim().toLowerCase();
  const match = AGENCY_SERVICES.find((s) => s.slug === normalizedSlug);
  if (!match) {
    res.status(404).json({ error: "Service not found", slug: normalizedSlug });
    return;
  }
  res.json({
    agency: "CySocial",
    supportedLocales: ["tr", "en", "ru", "ar"],
    service: match,
  });
});

export default router;
