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
import {
  DIRECTOR_POSITIONS,
  ID_TYPES,
  NATIONALITIES,
  newId,
  type Director,
} from "@/lib/data/wizard"
import {
  WizardField,
  WizardInput,
  WizardSelect,
} from "@/components/applications/wizard-fields"

const EMPTY_DIRECTOR: Omit<Director, "id"> = {
  fullName: "",
  position: "",
  nationality: "",
  idType: "Ghana Card",
  idNumber: "",
  ownership: "",
}

export function DirectorsStep({
  directors,
  onChange,
}: {
  directors: Director[]
  onChange: (next: Director[]) => void
}) {
  const [draft, setDraft] = useState(EMPTY_DIRECTOR)
  const [editingId, setEditingId] = useState<string | null>(null)

  function updateDraft<K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function resetForm() {
    setDraft(EMPTY_DIRECTOR)
    setEditingId(null)
  }

  function saveDirector() {
    if (!draft.fullName.trim() || !draft.position || !draft.idNumber.trim() || !draft.ownership.trim()) {
      return
    }

    if (editingId) {
      onChange(
        directors.map((item) =>
          item.id === editingId ? { ...draft, id: editingId } : item,
        ),
      )
    } else {
      onChange([...directors, { ...draft, id: newId("director") }])
    }
    resetForm()
  }

  function editDirector(director: Director) {
    setEditingId(director.id)
    setDraft({
      fullName: director.fullName,
      position: director.position,
      nationality: director.nationality,
      idType: director.idType,
      idNumber: director.idNumber,
      ownership: director.ownership,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-sm text-slate-500">
          Provide information about the directors or partners of the company.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="h-9 w-fit text-ecg-blue hover:text-ecg-blue"
          onClick={resetForm}
        >
          <Plus className="size-4" />
          Add Director / Partner
        </Button>
      </div>

      {directors.length > 0 ? (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead>Full Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>ID Type</TableHead>
                <TableHead>ID Number</TableHead>
                <TableHead>Ownership (%)</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {directors.map((director) => (
                <TableRow key={director.id}>
                  <TableCell className="font-medium">{director.fullName}</TableCell>
                  <TableCell>{director.position}</TableCell>
                  <TableCell>{director.nationality}</TableCell>
                  <TableCell>{director.idType}</TableCell>
                  <TableCell>{director.idNumber || "—"}</TableCell>
                  <TableCell>{director.ownership}%</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editDirector(director)}
                    >
                      <Pencil className="size-4 text-slate-400" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onChange(directors.filter((item) => item.id !== director.id))}
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
          {editingId ? "Edit Director / Partner" : "Add New Director / Partner"}
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <WizardField label="Full Name" required>
            <WizardInput
              value={draft.fullName}
              placeholder="Enter full name"
              onChange={(event) => updateDraft("fullName", event.target.value)}
            />
          </WizardField>
          <WizardField label="Position" required>
            <WizardSelect
              value={draft.position}
              placeholder="Select position"
              options={DIRECTOR_POSITIONS}
              onValueChange={(value) => updateDraft("position", value)}
            />
          </WizardField>
          <WizardField label="Nationality" required>
            <WizardSelect
              value={draft.nationality}
              placeholder="Select nationality"
              options={NATIONALITIES}
              onValueChange={(value) => updateDraft("nationality", value)}
            />
          </WizardField>
          <WizardField label="ID Type" required>
            <WizardSelect
              value={draft.idType}
              placeholder="Select ID type"
              options={ID_TYPES}
              onValueChange={(value) => updateDraft("idType", value)}
            />
          </WizardField>
          <WizardField label="ID Number" required>
            <WizardInput
              value={draft.idNumber}
              placeholder="Enter ID number"
              onChange={(event) => updateDraft("idNumber", event.target.value)}
            />
          </WizardField>
          <WizardField label="Ownership Percentage (%)" required>
            <WizardInput
              value={draft.ownership}
              placeholder="Enter ownership %"
              onChange={(event) => updateDraft("ownership", event.target.value)}
            />
          </WizardField>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" className="h-10 px-4" onClick={resetForm}>
            Cancel
          </Button>
          <Button
            type="button"
            className="h-10 rounded-lg bg-ecg-blue px-5 text-white hover:bg-ecg-blue/90"
            onClick={saveDirector}
          >
            {editingId ? "Save" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  )
}
