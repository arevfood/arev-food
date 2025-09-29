export interface FilterListItemModel {
  label: string
  key: string
}

export interface FilterListModel {
  label: string
  key: string
  items: FilterListItemModel[]
}

export interface FilterDiseaseModel {
  key: string
  label: string
  aliases?: string[]
  description?: string
}
