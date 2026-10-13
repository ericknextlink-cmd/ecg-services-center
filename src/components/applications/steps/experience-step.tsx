import { Info, Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDisplayDate, newId, type WorkExperience } from "@/lib/data/wizard"
import {
  WizardDateInput,
  WizardField,
  WizardInput,
  WizardNotice,
} from "@/components/applications/wizard-fields"

const EMPTY_EXPERIENCE: Omit<WorkExperience, "id"> = {
  description: "",
  client: "",
  value: "",
  completedOn: "",
}

export function ExperienceStep({
  experience,
  onChange,
}: {
  experience: WorkExperience[]
  onChange: (next: WorkExperience[]) => void
}) {
  const [open, setOpen] = useState(experience.length === 0)
  const [draft, setDraft] = useState(EMPTY_EXPERIENCE)
  const [editingId, setEditingId] = useState<string | null>(null)

  function save() {
    if (!draft.description.trim() || !draft.client.trim() || !draft.value.trim() || !draft.completedOn) {
      return
    }
    if (editingId) {
      onChange(
        experience.map((item) => (item.id === editingId ? { ...draft, id: editingId } : item)),
      )
    } else {
      onChange([...experience, { ...draft, id: newId("exp") }])
    }
    setDraft(EMPTY_EXPERIENCE)
    setEditingId(null)
    setOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-sm text-slate-500">
          Provide details of relevant projects completed in the last 5 years that are related to
          electrical works.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="h-9 w-fit text-ecg-blue hover:text-ecg-blue"
          onClick={() => {
            setEditingId(null)
            setDraft(EMPTY_EXPERIENCE)
            setOpen(true)
          }}
        >
          <Plus className="size-4" />
          Add Experience
        </Button>
      </div>

      <WizardNotice>
        <Info className="mt-0.5 size-4 shrink-0" />
        Provide at least 3 completed projects within the last 5 years. Include electrical
        installation, maintenance or related projects.
      </WizardNotice>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Project / Work Description</TableHead>
              <TableHead>Client / Employer</TableHead>
              <TableHead>Contract Value (GHS)</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experience.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-400">
                  No projects added yet.
                </TableCell>
              </TableRow>
            ) : (
              experience.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="max-w-[260px] truncate font-medium whitespace-normal">
                    {item.description}
                  </TableCell>
                  <TableCell className="whitespace-normal">{item.client}</TableCell>
                  <TableCell>
                    {Number.isFinite(Number(item.value.replace(/,/g, "")))
                      ? Number(item.value.replace(/,/g, "")).toLocaleString("en-GH", {
                          minimumFractionDigits: 2,
                        })
                      : item.value}
                  </TableCell>
                  <TableCell>{formatDisplayDate(item.completedOn)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingId(item.id)
                        setDraft({
                          description: item.description,
                          client: item.client,
                          value: item.value,
                          completedOn: item.completedOn,
                        })
                        setOpen(true)
                      }}
                    >
                      <Pencil className="size-4 text-slate-400" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onChange(experience.filter((row) => row.id !== item.id))}
                    >
                      <Trash2 className="size-4 text-slate-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <WizardNotice>
        <Info className="mt-0.5 size-4 shrink-0" />
        You have added {experience.length} project(s). You can add more if required.
      </WizardNotice>

      {open ? (
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-sm font-semibold text-ecg-navy">
            {editingId ? "Edit Experience" : "Add Experience"}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <WizardField label="Project / Work Description" required className="sm:col-span-2">
              <WizardInput
                value={draft.description}
                placeholder="Describe the project"
                onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              />
            </WizardField>
            <WizardField label="Client / Employer" required>
              <WizardInput
                value={draft.client}
                placeholder="Enter client name"
                onChange={(event) => setDraft((current) => ({ ...current, client: event.target.value }))}
              />
            </WizardField>
            <WizardField label="Contract Value (GHS)" required>
              <WizardInput
                value={draft.value}
                placeholder="e.g. 1250000"
                onChange={(event) => setDraft((current) => ({ ...current, value: event.target.value }))}
              />
            </WizardField>
            <WizardField label="Completion Date" required>
              <WizardDateInput
                value={draft.completedOn}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, completedOn: event.target.value }))
                }
              />
            </WizardField>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" className="h-10" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="h-10 rounded-lg bg-ecg-blue px-5 text-white hover:bg-ecg-blue/90"
              onClick={save}
            >
              {editingId ? "Save" : "Add"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
