import { Pencil, Plus, Trash2 } from "lucide-react"
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
import { PERSONNEL_ROLES, newId, type WorkPersonnel } from "@/lib/data/wizard"
import {
  WizardField,
  WizardInput,
  WizardSelect,
} from "@/components/applications/wizard-fields"

const EMPTY_PERSON: Omit<WorkPersonnel, "id"> = {
  fullName: "",
  role: "",
  qualification: "",
  years: "",
}

export function PersonnelStep({
  personnel,
  onChange,
}: {
  personnel: WorkPersonnel[]
  onChange: (next: WorkPersonnel[]) => void
}) {
  const [draft, setDraft] = useState(EMPTY_PERSON)
  const [editingId, setEditingId] = useState<string | null>(null)

  function save() {
    if (!draft.fullName.trim() || !draft.role || !draft.qualification.trim() || !draft.years.trim()) {
      return
    }
    if (editingId) {
      onChange(
        personnel.map((item) => (item.id === editingId ? { ...draft, id: editingId } : item)),
      )
    } else {
      onChange([...personnel, { ...draft, id: newId("person") }])
    }
    setDraft(EMPTY_PERSON)
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-sm text-slate-500">
          Add key technical personnel who will be assigned to ECG-related works.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="h-9 w-fit text-ecg-blue hover:text-ecg-blue"
          onClick={() => {
            setDraft(EMPTY_PERSON)
            setEditingId(null)
          }}
        >
          <Plus className="size-4" />
          Add Personnel
        </Button>
      </div>

      {personnel.length > 0 ? (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Years of Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personnel.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.fullName}</TableCell>
                  <TableCell>{person.role}</TableCell>
                  <TableCell>{person.qualification}</TableCell>
                  <TableCell>{person.years}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingId(person.id)
                        setDraft({
                          fullName: person.fullName,
                          role: person.role,
                          qualification: person.qualification,
                          years: person.years,
                        })
                      }}
                    >
                      <Pencil className="size-4 text-slate-400" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onChange(personnel.filter((item) => item.id !== person.id))}
                    >
                      <Trash2 className="size-4 text-slate-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}

      <div>
        <p className="text-sm font-semibold text-ecg-navy">
          {editingId ? "Edit Personnel" : "Add Work Personnel"}
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <WizardField label="Full Name" required>
            <WizardInput
              value={draft.fullName}
              placeholder="Enter full name"
              onChange={(event) => setDraft((current) => ({ ...current, fullName: event.target.value }))}
            />
          </WizardField>
          <WizardField label="Role" required>
            <WizardSelect
              value={draft.role}
              placeholder="Select role"
              options={PERSONNEL_ROLES}
              onValueChange={(value) => setDraft((current) => ({ ...current, role: value }))}
            />
          </WizardField>
          <WizardField label="Qualification" required>
            <WizardInput
              value={draft.qualification}
              placeholder="e.g. BSc Electrical Engineering"
              onChange={(event) =>
                setDraft((current) => ({ ...current, qualification: event.target.value }))
              }
            />
          </WizardField>
          <WizardField label="Years of Experience" required>
            <WizardInput
              value={draft.years}
              placeholder="e.g. 8"
              onChange={(event) => setDraft((current) => ({ ...current, years: event.target.value }))}
            />
          </WizardField>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="h-10"
            onClick={() => {
              setDraft(EMPTY_PERSON)
              setEditingId(null)
            }}
          >
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
    </div>
  )
}
