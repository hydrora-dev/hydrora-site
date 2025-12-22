import { AmbientBackground } from "@/components/Background";

export function PageShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <AmbientBackground />
      <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {children}
      </div>
    </div>
  );
}
