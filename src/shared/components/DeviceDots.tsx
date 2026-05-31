type DeviceDotsProps = {
  className?: string;
};

export function DeviceDots({ className }: DeviceDotsProps) {
  return (
    <div
      className={`bg-primary h-5 w-40 ${className ?? ""}`}
      style={{
        WebkitMaskImage: "url(/device/device-dots.png)",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskImage: "url(/device/device-dots.png)",
        maskRepeat: "no-repeat",
        maskSize: "contain",
      }}
    />
  );
}
