export function RightPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-20 items-center rounded-xl bg-[#25252f] px-4">
        SIDE PROJECTS
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-[#25252f]" />
        ))}
      </div>
      <div className="h-50 rounded-xl bg-[#25252f]" />
    </div>
  );
}
