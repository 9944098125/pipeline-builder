/** Labeled control wrapper for consistent spacing inside nodes */
export function NodeField({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-[0.75rem]">
      <span className="font-semibold text-[#8b95ad]">{label}</span>
      {/* nodrag: typing / selecting in controls never starts a node drag */}
      <span className="nodrag block">{children}</span>
    </label>
  );
}
