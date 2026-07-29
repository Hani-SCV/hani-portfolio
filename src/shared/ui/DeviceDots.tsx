type DeviceDotsProps = {
  className?: string;
};

const maskUrl = "url(/device/device-dots.png)";

export function DeviceDots({ className }: DeviceDotsProps) {
  return (
    <div
      aria-hidden="true"
      className={`bg-primary h-5 w-40 ${className ?? ""}`}
      style={{
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "contain",
      }}
    />
  );
}
