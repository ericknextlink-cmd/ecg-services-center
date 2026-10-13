export type ClassificationCategory = {
  id: string
  code: number
  title: string
}

export type ClassificationClass = {
  id: string
  grade: "A" | "B" | "C" | "D" | "E"
  scoreRange: string
  minScore: number
  maxScore: number
  awardingOffices: string
  outcome: "classified" | "unclassified"
}

export const CLASSIFICATION_CATEGORIES: ClassificationCategory[] = [
  {
    id: "cat-1",
    code: 1,
    title: "Construction / Rehabilitation of 33kV Primary Substation",
  },
  {
    id: "cat-2",
    code: 2,
    title: "Construction of 33kV Overhead Line on Steel Lattice Towers",
  },
  {
    id: "cat-3",
    code: 3,
    title: "Construction of 33kV Underground Cables",
  },
  {
    id: "cat-4",
    code: 4,
    title:
      "Construction of 33kV and 11kV Overhead Line on Wood/Tubular Steel Poles (pole height not exceeding 14m) Underground Cable, Installation of Distribution Transformers and LV Network",
  },
  {
    id: "cat-5",
    code: 5,
    title:
      "Construction of up to two Poles LV Network Extension and Underground Cable Services (Service Connection)",
  },
]

export const CLASSIFICATION_CLASSES: ClassificationClass[] = [
  {
    id: "class-a",
    grade: "A",
    scoreRange: "80 - 100",
    minScore: 80,
    maxScore: 100,
    awardingOffices: "Head Office & Regional Office",
    outcome: "classified",
  },
  {
    id: "class-b",
    grade: "B",
    scoreRange: "70 to Less than 80",
    minScore: 70,
    maxScore: 79,
    awardingOffices: "Head Office & Regional Office",
    outcome: "classified",
  },
  {
    id: "class-c",
    grade: "C",
    scoreRange: "60 to Less than 70",
    minScore: 60,
    maxScore: 69,
    awardingOffices: "Head Office, Regional Office & District Office",
    outcome: "classified",
  },
  {
    id: "class-d",
    grade: "D",
    scoreRange: "50 to Less than 60",
    minScore: 50,
    maxScore: 59,
    awardingOffices: "Regional Office & District Office (Farming Out)",
    outcome: "classified",
  },
  {
    id: "class-e",
    grade: "E",
    scoreRange: "Less than 50",
    minScore: 0,
    maxScore: 49,
    awardingOffices: "Unclassified (Failed)",
    outcome: "unclassified",
  },
]

export function classificationClassForScore(score: number) {
  return (
    CLASSIFICATION_CLASSES.find(
      (classificationClass) =>
        score >= classificationClass.minScore &&
        score <= classificationClass.maxScore,
    ) ?? CLASSIFICATION_CLASSES[CLASSIFICATION_CLASSES.length - 1]
  )
}
