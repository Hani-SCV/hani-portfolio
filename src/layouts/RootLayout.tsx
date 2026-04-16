import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0f14]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size-[16px_16px]" />
      <Outlet />
    </div>
  );
}
