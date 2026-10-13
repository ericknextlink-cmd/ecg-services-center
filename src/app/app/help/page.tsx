import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQS = [
  {
    question: "What is a Classification Certificate?",
    answer:
      "It is ECG's contractor class based on evaluated capacity. Classes A to D are certified. Class E (score below 50) is unclassified and fails.",
  },
  {
    question: "How long does review take?",
    answer:
      "ECG reviews complete applications at Head Office, Regional Office or District Office depending on the class being sought.",
  },
  {
    question: "Can I apply for more than one category?",
    answer:
      "Yes. Select every work category your firm can undertake. Evaluation is still scored against the published class table.",
  },
]

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Help Centre</h1>
      <p className="mt-2 mb-6 text-muted-foreground">
        Common questions about vendor registration, classification and external licences.
      </p>
      <Accordion type="single" collapsible className="rounded-3xl border bg-card px-4">
        {FAQS.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
