export const REVIEW_STAGES = [
  {
    title: "Submitted",
    description: "Application received",
  },
  {
    title: "Initial Review",
    description: "Completeness check",
  },
  {
    title: "AI Review",
    description: "Document analysis",
  },
  {
    title: "Technical Review",
    description: "Capacity evaluation",
  },
  {
    title: "Management Approval",
    description: "Final decision",
  },
  {
    title: "Certificate Issuance",
    description: "Certificate ready",
  },
] as const

export const APPLICATION_FEES: Record<string, number> = {
  supplier: 1500,
  classification: 3500,
  "external-license": 2500,
}

export function formatCedis(amount: number) {
  return `GHS ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`
}
