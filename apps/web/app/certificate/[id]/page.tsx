import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CertDocument } from "@/components/CertDocument";
import { ForgePath } from "@/components/ForgePath";
import { getCertificate } from "@/lib/certificates";

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = getCertificate(id);
  if (!cert) notFound();

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const shareUrl = `${proto}://${host}/certificate/${cert.id}`;

  return (
    <div className="mx-auto w-full max-w-[1500px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <ForgePath activeStep={3} className="mb-4" />
      <CertDocument certificate={cert} shareUrl={shareUrl} />
    </div>
  );
}
