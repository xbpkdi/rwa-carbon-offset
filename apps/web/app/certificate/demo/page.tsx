import { CertDocument } from "@/components/CertDocument";
import { ForgePath } from "@/components/ForgePath";
import { DEMO_CERTIFICATE } from "@/lib/demo-certificate";

export default function CertificateDemoPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <ForgePath activeStep={3} className="mb-4" />
      <CertDocument certificate={DEMO_CERTIFICATE} shareUrl="/certificate/demo" />
    </div>
  );
}
