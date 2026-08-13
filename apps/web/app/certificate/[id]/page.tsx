import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CertDocument } from "@/components/CertDocument";
import { FlowShell } from "@/components/FlowShell";
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
    <FlowShell step={3}>
      <CertDocument certificate={cert} shareUrl={shareUrl} />
    </FlowShell>
  );
}
