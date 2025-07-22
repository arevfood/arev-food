export interface FilterListItemModel {
  label: string;
  key: string;
}

export interface FilterListModel {
  label: string;
  key: string;
  items: FilterListItemModel[];
}
