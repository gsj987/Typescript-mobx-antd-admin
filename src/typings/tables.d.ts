export interface IColumn {
  title: string,
  dataIndex?: string,
  key?: string,
  width?: number,
  className?: string,
  render?: (text: string, record?: any) => JSX.Element
}
