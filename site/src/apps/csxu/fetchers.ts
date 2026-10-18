// Fetching what the CSXU information pages show, at run time, from the browser (both allow it: CORS *).
// From the Gatsby site's utils/fetchGithubContent.js and utils/fetchPyPIInfo.js.

// "bisos.facter" -> "facter": the bisos-pip repository of a package.
export const repoOfPackage = (packageName: string) => packageName.split(".").pop() || packageName

export const githubUrl = (repo: string, path: string) => `https://github.com/bisos-pip/${repo}/blob/main/${path}`

export async function fetchGithubContent(url: string): Promise<string> {
  const rawUrl = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
  const response = await fetch(rawUrl)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${rawUrl}`)
  return response.text()
}

export interface OrgSection { level: number; title: string; content: string[] }

// The headings of an org file and the non-empty lines under each.
export function parseOrg(text: string): OrgSection[] {
  const sections: OrgSection[] = []
  for (const line of text.split("\n")) {
    const heading = line.match(/^(\*+)\s+(.+)$/)
    if (heading) sections.push({ level: heading[1].length, title: heading[2], content: [] })
    else if (sections.length && line.trim()) sections[sections.length - 1].content.push(line)
  }
  return sections
}

export interface PyPIInfo {
  name: string; version: string; summary: string; description: string; author: string
  author_email: string; license: string; home_page: string; requires_python: string
  classifiers: string[]; versions: string[]
}

export async function fetchPyPIInfo(packageName: string): Promise<PyPIInfo> {
  const response = await fetch(`https://pypi.org/pypi/${packageName}/json`)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: PyPI ${packageName}`)
  const data = await response.json()
  const info = data.info || {}
  return {
    name: info.name, version: info.version, summary: info.summary, description: info.description,
    author: info.author, author_email: info.author_email, license: info.license, home_page: info.home_page,
    requires_python: info.requires_python, classifiers: info.classifiers || [],
    versions: Object.keys(data.releases || {}).reverse(),
  }
}
