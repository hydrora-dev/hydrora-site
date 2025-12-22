export default function Loading() {
  return (
    <div className="bg-navy">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="space-y-6">
          <div className="h-6 w-40 rounded-xl bg-white/10" />
          <div className="h-12 w-full max-w-2xl rounded-2xl bg-white/10" />
          <div className="h-4 w-full max-w-xl rounded-xl bg-white/10" />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-24 rounded-2xl bg-white/10" />
            <div className="h-24 rounded-2xl bg-white/10" />
            <div className="h-24 rounded-2xl bg-white/10" />
          </div>
          <div className="h-[340px] rounded-3xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}
