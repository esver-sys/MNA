import { metadata } from "@/app/layout";
import FuzzyText from "@/components/ui/FuzzyText";

export default function NotFound() {
  metadata.title = "404 Not Found";
  metadata.description = "404 Not Found";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        color="#fff"
        enableHover={true}
      >
        404
      </FuzzyText>
      <div className="my-1"></div>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        color="#fff"
        enableHover={true}
        fontSize="clamp(0.5rem, 4vw, 4rem)"
      >
        not found
      </FuzzyText>
    </div>
  );
}
