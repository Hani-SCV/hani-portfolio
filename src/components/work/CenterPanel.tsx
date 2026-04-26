export function CenterPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* top social */}
      <img
        src="https://github-readme-streak-stats.herokuapp.com/?user=hani-scv&theme=radical&ring=4bff21&fire=f8e602&currStreakLabel=00f0ff"
        className="h-auto w-full"
      />

      {/* portfolio header */}
      <div className="flex h-full flex-col rounded-xl bg-[#25252f]">
        <div className="flex h-14 items-center justify-between px-4">
          <div>PORTFOLIO</div>
          <div className="flex gap-2">
            <button className="h-8 w-8 rounded-full bg-[#1c1c25]" />
            <button className="h-8 w-8 rounded-full bg-[#1c1c25]" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          BROWSE MY PORTFOLIO
        </div>
      </div>

      {/* bottom stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-44 rounded-xl bg-[#25252f]" />
        <div className="flex h-44 items-center justify-center rounded-xl bg-[#25252f]">
          7 YEARS
        </div>
      </div>
    </div>
  );
}
