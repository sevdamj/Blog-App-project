import Header from "@/components/layout/Header/components/Header";
import LandingPage from "@/features/landing/components/LandingPage";

export default function HomePage() {
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col">
      <Header />
      <LandingPage />
    </div>
  );
}