import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CLASSIFICATION_CATEGORIES,
  CLASSIFICATION_CLASSES,
} from "@/lib/data/classification"

export function ClassificationTables({
  selectedCategoryIds = [],
}: {
  selectedCategoryIds?: string[]
}) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-lg font-semibold">Category Table</h3>
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader className="bg-foreground text-background">
              <TableRow className="hover:bg-foreground">
                <TableHead className="w-16 text-background">No.</TableHead>
                <TableHead className="text-background">Work Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLASSIFICATION_CATEGORIES.map((category) => {
                const isSelected = selectedCategoryIds.includes(category.id)
                return (
                  <TableRow
                    key={category.id}
                    className={isSelected ? "bg-muted" : undefined}
                  >
                    <TableCell className="align-top font-medium">{category.code}</TableCell>
                    <TableCell className="whitespace-normal">{category.title}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold">Class Table</h3>
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader className="bg-foreground text-background">
              <TableRow className="hover:bg-foreground">
                <TableHead className="w-16 text-background">Class</TableHead>
                <TableHead className="min-w-24 text-background">Score</TableHead>
                <TableHead className="min-w-40 text-background">Awarding Office</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLASSIFICATION_CLASSES.map((classificationClass) => (
                <TableRow key={classificationClass.id}>
                  <TableCell className="align-top font-semibold">
                    {classificationClass.grade}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {classificationClass.scoreRange}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    {classificationClass.awardingOffices}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          ECG assigns a class after evaluation. Class E (less than 50) is unclassified
          and the application is considered failed.
        </p>
      </section>
    </div>
  )
}
