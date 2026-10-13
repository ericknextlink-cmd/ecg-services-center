import { ClassificationTables } from "@/components/classification/classification-tables"

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Certificates & Licences</h1>
      <p className="mt-2 mb-8 text-muted-foreground">
        Issued classification certificates and external licences will appear here after ECG
        evaluation. The published category and class schedule is shown below.
      </p>
      <ClassificationTables />
    </div>
  )
}
