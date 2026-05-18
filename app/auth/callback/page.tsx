import { connection } from "next/server";
import { Suspense } from "react";
import AuthCallbackClient, { Spinner } from "./_client";

export default async function AuthCallbackPage() {
  // connection() opts this route out of build-time prerendering so the
  // Supabase client (which needs env vars) is never initialised during build.
  await connection();
  return (
    <Suspense fallback={<Spinner />}>
      <AuthCallbackClient />
    </Suspense>
  );
}
