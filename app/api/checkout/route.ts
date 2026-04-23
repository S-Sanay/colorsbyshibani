import { NextRequest, NextResponse } from "next/server";

/**
 * Placeholder checkout API route.
 *
 * When Stripe is ready:
 *   1. npm install stripe
 *   2. Add STRIPE_SECRET_KEY to .env.local
 *   3. Replace the body below with:
 *
 *      import Stripe from 'stripe';
 *      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *
 *      const session = await stripe.checkout.sessions.create({
 *        payment_method_types: ['card'],
 *        line_items: [{ price_data: { ... }, quantity: 1 }],
 *        mode: 'payment',
 *        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
 *        cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/artwork/${artworkId}`,
 *      });
 *
 *      return NextResponse.json({ url: session.url });
 */
export async function POST(req: NextRequest) {
  const { artworkId } = await req.json();

  if (!artworkId) {
    return NextResponse.json({ error: "artworkId is required" }, { status: 400 });
  }

  // TODO: create Stripe checkout session here
  return NextResponse.json(
    {
      message: "Checkout not yet implemented. Stripe integration coming soon.",
      artworkId,
    },
    { status: 501 }
  );
}
