/**
 * Fetch PyPI package information from the JSON API
 * PyPI provides a simple JSON API at /pypi/{package}/json
 */
export async function fetchPyPIInfo(packageName) {
  try {
    const url = `https://pypi.org/pypi/${packageName}/json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch PyPI info: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching PyPI data:', error);
    throw error;
  }
}

/**
 * Format PyPI data for display
 */
export function formatPyPIData(pypiData) {
  const info = pypiData.info || {};
  const releases = pypiData.releases || {};

  // Get latest release version
  const versions = Object.keys(releases).sort();
  const latestVersion = versions[versions.length - 1];

  return {
    name: info.name,
    version: info.version,
    summary: info.summary,
    description: info.description,
    author: info.author,
    author_email: info.author_email,
    license: info.license,
    home_page: info.home_page,
    project_url: info.project_url,
    project_urls: info.project_urls,
    requires_python: info.requires_python,
    classifiers: info.classifiers || [],
    keywords: info.keywords,
    downloads: info.downloads,
    last_released: Object.keys(releases).pop(),
    all_versions: versions.reverse(), // Latest first
  };
}
