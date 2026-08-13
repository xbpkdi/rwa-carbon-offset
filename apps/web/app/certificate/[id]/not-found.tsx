import Link from "next/link";
import { Btn } from "@/components/ui/Btn";

export default function CertificateNotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-aurora-fg">Certificate not found</h1>
      <p className="mt-3 text-aurora-fg-muted">No retirement certificate exists for this ID.</p>
      <div className="mt-8 flex justify-center">
        <Link href="/estimate">
          <Btn size="lg">Start a new estimate</Btn>
        </Link>
      </div>
    </div>
  );
}
