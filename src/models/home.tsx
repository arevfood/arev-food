export interface userProfileModel {
  name: string
  age: number
  image: string
  active_menstrual_cycle: boolean
}

export interface userInfoModel {
  info: userInfoItemModel[]
  additional: userInfoItemModel[]
}

interface userInfoItemModel {
  title: string
  value: string
}
