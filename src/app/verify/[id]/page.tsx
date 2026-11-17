import { Suspense } from "react";
import CertificateVerificationPage from "../page";
import { SAMPLE_CREDENTIALS } from "@/lib/credentials-data";

export function generateStaticParams() {
  return [
    { id: "RESDA-CERT-2026-9041" },
    { id: "RESDA-CERT-2026-8812" },
    { id: "RESDA-CERT-2026-7734" },
  ];
}

async function VerifyContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <CertificateVerificationPage initialId={resolvedParams.id} />;
}

export default function VerifyByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent params={params} />
    </Suspense>
  );
}
