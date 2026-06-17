import Container from "@/components/ui/Container";
import TermsAndConditions from "@/components/ui/TermsAndConditions";

export default function page() {
  return (
    <main className="min-h-screen">
      <Container className="py-15">
        <TermsAndConditions />
      </Container>
    </main>
  );
}
