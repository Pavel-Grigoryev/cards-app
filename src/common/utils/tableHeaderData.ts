export type TableHeaderDataType = {
  name: string
  sortName: string
}

export const packPageTableNames: TableHeaderDataType[] = [
  { name: 'Question', sortName: 'question' },
  { name: 'Answer', sortName: 'answer' },
  { name: 'Last Updated', sortName: 'updated' },
  { name: 'Grade', sortName: 'grade' },
  { name: 'Actions', sortName: 'updated' },
]

export const packsListTableNames: TableHeaderDataType[] = [
  { name: 'Cover', sortName: 'updated' },
  { name: 'Name', sortName: 'name' },
  { name: 'Cards', sortName: 'cardsCount' },
  { name: 'Last Updated', sortName: 'updated' },
  { name: 'Created by', sortName: 'user_name' },
  { name: 'Actions', sortName: 'updated' },
]
