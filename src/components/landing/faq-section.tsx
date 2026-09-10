import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/support";

const landingFaqIds = ["f3", "f4", "f5", "f9", "f7", "f10"];

export function FaqSection() {
  const selected = landingFaqIds.map((id) => faqs.find((f) => f.id === id)).filter(Boolean);

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container max-w-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-3 text-muted-foreground">Todo lo que necesitas saber antes de empezar.</p>
        </div>
        <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-border bg-card px-6">
          {selected.map((faq) => (
            <AccordionItem key={faq!.id} value={faq!.id}>
              <AccordionTrigger>{faq!.question}</AccordionTrigger>
              <AccordionContent>{faq!.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
