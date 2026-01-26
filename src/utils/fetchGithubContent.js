/**
 * Fetch content from GitHub raw file
 * Converts GitHub web URL to raw content URL
 */
export async function fetchGithubContent(githubUrl) {
  try {
    // Convert GitHub URL to raw content URL
    // https://github.com/owner/repo/blob/branch/path/to/file
    // -> https://raw.githubusercontent.com/owner/repo/branch/path/to/file
    const rawUrl = githubUrl
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');

    const response = await fetch(rawUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching GitHub content:', error);
    throw error;
  }
}

/**
 * Parse Org-mode content to extract main sections
 * Returns an object with parsed content
 */
export function parseOrgContent(content) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match org-mode headers: *, **, ***, etc.
    const headerMatch = line.match(/^(\*+)\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2];

      // Create new section
      if (currentSection) {
        sections.push(currentSection);
      }

      currentSection = {
        level,
        title,
        content: [],
        children: [],
      };
    } else if (currentSection) {
      // Add content to current section
      currentSection.content.push(line);
    }
  }

  // Push last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Format parsed org content for display
 */
export function formatOrgContent(sections) {
  return sections.map(section => ({
    level: section.level,
    title: section.title,
    content: section.content
      .join('\n')
      .trim()
      .split('\n')
      .filter(line => line.trim()),
  }));
}
