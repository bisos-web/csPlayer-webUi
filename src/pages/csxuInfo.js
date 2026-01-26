import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { fetchGithubContent, parseOrgContent, formatOrgContent } from '../utils/fetchGithubContent';

export default function CsxuInfoPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch the README.org from GitHub
        const githubUrl = 'https://github.com/bisos-pip/facter/blob/main/README.org';
        const rawContent = await fetchGithubContent(githubUrl);

        // Parse the org-mode content
        const parsed = parseOrgContent(rawContent);
        const formatted = formatOrgContent(parsed);

        setContent(formatted);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load csxu Info:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const renderSection = (section, index) => {
    const headingClass = {
      1: 'text-4xl font-bold mb-6 mt-8',
      2: 'text-3xl font-bold mb-4 mt-6',
      3: 'text-2xl font-bold mb-3 mt-4',
      4: 'text-xl font-bold mb-2 mt-3',
      5: 'text-lg font-bold mb-2 mt-2',
    }[section.level] || 'text-base font-bold mb-2';

    return (
      <div key={index} className="mb-4">
        <h2 className={headingClass}>{section.title}</h2>
        <div className="text-gray-700 space-y-2">
          {section.content.map((line, lineIndex) => (
            <p key={lineIndex} className="text-sm leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout showHeader={true} showSidebar={true} showFooter={true}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">csxu Info</h1>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading csxu information from GitHub...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-red-800 mb-2">Error Loading Content</h2>
            <p className="text-red-700">{error}</p>
            <p className="text-sm text-red-600 mt-4">
              Source: <a href="https://github.com/bisos-pip/facter/blob/main/README.org"
                         className="underline hover:no-underline"
                         target="_blank"
                         rel="noopener noreferrer">
                GitHub - bisos-pip/facter
              </a>
            </p>
          </div>
        )}

        {content && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {content.map((section, index) => renderSection(section, index))}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Source: <a href="https://github.com/bisos-pip/facter/blob/main/README.org"
                           className="text-blue-600 hover:underline"
                           target="_blank"
                           rel="noopener noreferrer">
                  GitHub - bisos-pip/facter/README.org
                </a>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Content fetched at runtime from GitHub
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
