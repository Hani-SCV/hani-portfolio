import { useNavigate } from "react-router-dom";
import { IntroDevice } from "./IntroDevice";

export function Intro() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center">
      <IntroDevice onComplete={() => navigate("/work")} />
    </div>
  );
}
