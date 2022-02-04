interface IRepo {
  html_url: string
  language: string
  name: string
  open_issues: number //open_issues_count
  updated_at: string
  license: { name: string } | null
  id: number
}

export default IRepo
