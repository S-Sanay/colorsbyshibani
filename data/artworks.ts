// Mock artwork data — replace with Supabase query when backend is connected.
// Each record mirrors the schema we'll use in the `artworks` Supabase table.

export type Category = "painting" | "drawing" | "sketch";

export interface Artwork {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;       // full-size (used on detail page)
  thumbnailUrl: string;   // 600×450 (used in gallery grid)
  description: string;
  inspiration: string;
  price: number;          // in USD cents (e.g. 65000 = $650.00) — ready for Stripe
  displayPrice: string;   // human-readable (e.g. "$650")
  dimensions: string;
  medium: string;
  year: number;
  available: boolean;
}

export const artworks: Artwork[] = [
  // ── Paintings ─────────────────────────────────────────────
  {
    id: "p1",
    title: "Golden Hour Study",
    category: "painting",
    imageUrl: "https://picsum.photos/seed/art10/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art10/600/450",
    description:
      "A luminous study of afternoon light filtering through sheer curtains, casting warm pools of amber and gold across a quiet interior. The painting captures a fleeting moment—the way light transforms the mundane into something sacred.",
    inspiration:
      "I was sitting in my studio one late afternoon when the light changed everything. I had maybe twenty minutes before it was gone, and I painted as fast as I could, trying to hold that feeling.",
    price: 65000,
    displayPrice: "$650",
    dimensions: '24" × 18"',
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    id: "p2",
    title: "Still Life with Orchids",
    category: "painting",
    imageUrl: "https://picsum.photos/seed/art20/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art20/600/450",
    description:
      "White orchids arranged simply in a ceramic vase, rendered in oil with soft edges and a muted background. The composition is minimal—a study in negative space and the quiet beauty of living things.",
    inspiration:
      "Orchids have always seemed impossibly delicate to me—like they don't quite belong in the same world as everything else. This piece tries to honor that otherworldliness.",
    price: 82000,
    displayPrice: "$820",
    dimensions: '18" × 24"',
    medium: "Oil on linen",
    year: 2024,
    available: true,
  },
  {
    id: "p3",
    title: "Monsoon Memory",
    category: "painting",
    imageUrl: "https://picsum.photos/seed/art30/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art30/600/450",
    description:
      "A rain-drenched cityscape dissolving into soft blues and greens, painted loosely with a palette knife for texture. The image blurs the line between memory and present experience.",
    inspiration:
      "Growing up, monsoon season was its own kind of magic—the smell of rain on hot concrete, the whole world going quiet. This is my attempt to paint a feeling, not a place.",
    price: 95000,
    displayPrice: "$950",
    dimensions: '30" × 20"',
    medium: "Oil on canvas",
    year: 2023,
    available: false,
  },
  {
    id: "p4",
    title: "Twilight Garden",
    category: "painting",
    imageUrl: "https://picsum.photos/seed/art40/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art40/600/450",
    description:
      "A garden caught between day and night, the flowers rendered in deep violet and dusty rose against a fading sky. The scale is intimate, inviting close looking.",
    inspiration:
      "There's a garden I used to walk through at dusk. Everything becomes more beautiful in that uncertain light.",
    price: 75000,
    displayPrice: "$750",
    dimensions: '20" × 16"',
    medium: "Oil on panel",
    year: 2024,
    available: true,
  },

  // ── Drawings ──────────────────────────────────────────────
  {
    id: "d1",
    title: "Portrait No. 7",
    category: "drawing",
    imageUrl: "https://picsum.photos/seed/art50/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art50/600/450",
    description:
      "A charcoal portrait study exploring the planes and shadows of a face in three-quarter view. Line and tone work together to suggest depth without fully resolving into likeness.",
    inspiration:
      "Portraits are where I push myself hardest. There's no hiding in a face.",
    price: 38000,
    displayPrice: "$380",
    dimensions: '14" × 11"',
    medium: "Charcoal on paper",
    year: 2024,
    available: true,
  },
  {
    id: "d2",
    title: "City Geometry",
    category: "drawing",
    imageUrl: "https://picsum.photos/seed/art60/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art60/600/450",
    description:
      "An architectural drawing of intersecting buildings and fire escapes, rendered in precise graphite lines. The composition finds geometry and rhythm in an urban streetscape.",
    inspiration:
      "I started noticing how city blocks create incredible abstract compositions when you block everything else out.",
    price: 42000,
    displayPrice: "$420",
    dimensions: '16" × 12"',
    medium: "Graphite on paper",
    year: 2023,
    available: true,
  },
  {
    id: "d3",
    title: "Hands in Rest",
    category: "drawing",
    imageUrl: "https://picsum.photos/seed/art70/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art70/600/450",
    description:
      "A close study of hands at rest, drawn with soft pencil. The drawing pays careful attention to the story told in the lines and weight of resting hands.",
    inspiration:
      "Hands are impossible to fake. They hold everything a person has ever done.",
    price: 29000,
    displayPrice: "$290",
    dimensions: '11" × 8.5"',
    medium: "Pencil on paper",
    year: 2024,
    available: false,
  },
  {
    id: "d4",
    title: "Botanical Study",
    category: "drawing",
    imageUrl: "https://picsum.photos/seed/art80/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art80/600/450",
    description:
      "A detailed graphite study of fern fronds, combining scientific precision with expressive mark-making. Each frond is rendered individually, yet the composition breathes as one.",
    inspiration:
      "I spent a week just looking at ferns. Their geometry is endlessly surprising.",
    price: 35000,
    displayPrice: "$350",
    dimensions: '14" × 10"',
    medium: "Graphite on archival paper",
    year: 2024,
    available: true,
  },

  // ── Sketches ──────────────────────────────────────────────
  {
    id: "s1",
    title: "Morning Light",
    category: "sketch",
    imageUrl: "https://picsum.photos/seed/art90/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art90/600/450",
    description:
      "A loose ink sketch of a breakfast table bathed in morning light—coffee cup, open book, a plant catching the sun. Done in under an hour as an exercise in pure observation.",
    inspiration:
      "The best sketches happen when you stop trying. I was just sitting there with my coffee.",
    price: 18000,
    displayPrice: "$180",
    dimensions: '9" × 7"',
    medium: "Ink on paper",
    year: 2025,
    available: true,
  },
  {
    id: "s2",
    title: "Street Scene",
    category: "sketch",
    imageUrl: "https://picsum.photos/seed/art100/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art100/600/450",
    description:
      "A quick gestural study of pedestrians on a busy street corner, captured in ink with minimal line. Movement and mood in a few deliberate strokes.",
    inspiration:
      "People-watching is where I learn the most. Everyone is holding themselves in such interesting ways.",
    price: 22000,
    displayPrice: "$220",
    dimensions: '8" × 6"',
    medium: "Ink on paper",
    year: 2025,
    available: true,
  },
  {
    id: "s3",
    title: "Quick Study: Figures",
    category: "sketch",
    imageUrl: "https://picsum.photos/seed/art110/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art110/600/450",
    description:
      "Five-minute figure sketches from a life drawing session—loose, expressive, concerned more with gesture than detail. A record of observation and speed.",
    inspiration:
      "These are meant to fail. That's how you eventually get the good ones.",
    price: 15000,
    displayPrice: "$150",
    dimensions: '11" × 8.5"',
    medium: "Pencil on paper",
    year: 2024,
    available: true,
  },
  {
    id: "s4",
    title: "Landscape Impression",
    category: "sketch",
    imageUrl: "https://picsum.photos/seed/art120/1200/900",
    thumbnailUrl: "https://picsum.photos/seed/art120/600/450",
    description:
      "A field study of rolling hills at midday, done on site in ink and watercolor wash. Light and atmosphere over topographic accuracy.",
    inspiration:
      "I was hiking and I just sat down. The hills weren't going anywhere.",
    price: 20000,
    displayPrice: "$200",
    dimensions: '10" × 8"',
    medium: "Ink and watercolor",
    year: 2025,
    available: false,
  },
];
