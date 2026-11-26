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
  const rawQuery = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";
  const rawBilingual = typeof req.query.bilingual === "string" ? req.query.bilingual.trim().toLowerCase() : "";
  const parsedMinDeliverables = typeof req.query.minDeliverables === "string" ? Number.parseInt(req.query.minDeliverables, 10) : 0;
  const minDeliverables = Number.isFinite(parsedMinDeliverables) && parsedMinDeliverables > 0 ? parsedMinDeliverables : 0;
  const filtered = AGENCY_SERVICES.filter((s) => {
    const matchesCategory = !rawCategory || s.category.toLowerCase() === rawCategory;
    const matchesBilingual =
      !rawBilingual ||
      (rawBilingual === "true" && s.bilingualSupport) ||
      (rawBilingual === "false" && !s.bilingualSupport);
    const matchesMinDeliverables = s.deliverables.length >= minDeliverables;
    const matchesQuery =
      !rawQuery ||
      s.slug.toLowerCase().includes(rawQuery) ||
      s.category.toLowerCase().includes(rawQuery) ||
      s.deliverables.some((d) => d.toLowerCase().includes(rawQuery));
    return matchesCategory && matchesBilingual && matchesMinDeliverables && matchesQuery;
  });

  const totalDeliverables = filtered.reduce((acc, s) => acc + s.deliverables.length, 0);
  const bilingualServiceCount = filtered.filter((s) => s.bilingualSupport).length;
  const categoryCounts = filtered.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  }, {});

  res.json({
    agency: "CySocial",
    region: "Northern Cyprus (KKTC)",
    supportedLocales: ["tr", "en", "ru", "ar"],
    categories: Array.from(new Set(AGENCY_SERVICES.map((s) => s.category))),
    categoryCounts,
    totalServices: filtered.length,
    bilingualServiceCount,
    totalDeliverables,
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
