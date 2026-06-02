import { useCustomizerStore } from "../../features/work/stores/useCustomizerStore";

type Props = {
  active: boolean;
};

export function Toggle({ active }: Props) {
  const color = useCustomizerStore((s) => s.color);
  return (
    <div className="flex h-5 w-9 items-center rounded-full bg-[#c1c1c1] p-1">
      <div
        className={`h-3 w-3 rounded-full transition-all duration-200 ${
          active ? "translate-x-4" : ""
        }`}
        style={{
          backgroundColor: active ? color.base : "#9CA3AF",
        }}
      />
    </div>
  );
}
