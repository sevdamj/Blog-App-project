import Container from "@/components/ui/Container";
import AboutUs from "features/about-us/components/AboutUs";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Container className="py-15">
        <AboutUs />
      </Container>
    </main>
  );
}