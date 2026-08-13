/**
 * Static forest backdrop, identical on every page.
 */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[2] overflow-hidden" aria-hidden="true">
      <img
        src="/forest.png"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover opacity-90 [object-position:50%_45%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,7,0.42)_0%,rgba(4,8,7,0.32)_45%,rgba(4,8,7,0.6)_100%)]" />
    </div>
  );
}
