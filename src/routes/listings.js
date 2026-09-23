const router = require("express").Router();
const prisma = require("../prisma");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/", async (req, res) => {
  const { area, minPrice, maxPrice, bedrooms } = req.query;

  const listings = await prisma.listing.findMany({
    where: {
      ...(area && { area: { contains: area, mode: "insensitive" } }),
      ...(bedrooms && { bedrooms: Number(bedrooms) }),
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: Number(minPrice) }),
          ...(maxPrice && { lte: Number(maxPrice) }),
        },
      }),
    },
    include: { landlord: { select: { id: true, name: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json(listings);
});

router.get("/:id", async (req, res) => {
  const listing = await prisma.listing.findUnique({
    where: { id: Number(req.params.id) },
    include: { landlord: { select: { id: true, name: true, phone: true } } },
  });
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json(listing);
});

router.post("/", requireAuth, requireRole("LANDLORD"), async (req, res) => {
  const { title, description, price, area, bedrooms, images = [] } = req.body;

  if (!title || !description || !price || !area || bedrooms == null) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const listing = await prisma.listing.create({
    data: {
      title, description, area, images,
      price: Number(price),
      bedrooms: Number(bedrooms),
      landlordId: req.user.id,
    },
  });

  res.status(201).json(listing);
});

module.exports = router;
