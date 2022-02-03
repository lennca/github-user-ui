function PrefixUrl(url: string): string {
  const regex = new RegExp(/https?:\/\//)
  const prefixUrl = url.match(regex) ? url : `http://${url}`
  return prefixUrl
}

export default PrefixUrl