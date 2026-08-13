import { CertDocument } from "@/components/CertDocument";
import { FlowShell } from "@/components/FlowShell";
import { DEMO_CERTIFICATE } from "@/lib/demo-certificate";

export default function CertificateDemoPage() {
  return (
    <FlowShell step={3}>
      <CertDocument certificate={DEMO_CERTIFICATE} shareUrl="/certificate/demo" />
    </FlowShell>
  );
}
