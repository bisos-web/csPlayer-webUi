import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { messageBus } from '../utils/messageBus';
import { ORCHESTRATION_EVENTS } from '../utils/orchestrationEvents';
import { getOrchestrationState } from '../utils/orchestrationState';
import { fetchGithubContent, parseOrgContent, formatOrgContent } from '../utils/fetchGithubContent';

export default function CsxuInfoPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCSXU, setSelectedCSXU] = useState(null);
  const [githubUrl, setGithubUrl] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Extract repo name from package name
   * e.g., "bisos.facter" -> "facter"
   */
  const getRepoNameFromPackage = (packageName) => {
    if (!packageName) return null;
    const parts = packageName.split('.');
    return parts[parts.length - 1];
  };

  /**
   * Construct GitHub URL from package name
   * e.g., "bisos.facter" -> "https://github.com/bisos-pip/facter/blob/main/README.org"
   */
  const constructGithubUrl = (packageName) => {
    const repoName = getRepoNameFromPackage(packageName);
    if (!repoName) return null;
    return `https://github.com/bisos-pip/${repoName}/blob/main/README.org`;
  };

  // Subscribe to package change event
  useEffect(() => {
    // Load persisted state on mount
    const persistedState = getOrchestrationState()
    if (persistedState.selectedPackage) {
      setSelectedPackage(persistedState.selectedPackage)
    }
    if (persistedState.selectedCSXU) {
      setSelectedCSXU(persistedState.selectedCSXU)
    }

    const unsubscribePackage = messageBus.subscribe(
      'CSPAYER_PACKAGE_CHANGED',
      (data) => {
        console.log('csxuInfo received package:', data.packageName);
        setSelectedPackage(data.packageName);
      },
      'csxuInfo'
    );

    return () => {
      unsubscribePackage();
    };
  }, []);

  // Subscribe to CSXU change event (for future flexibility)
  useEffect(() => {
    const unsubscribeCSXU = messageBus.subscribe(
      ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
      (data) => {
        console.log('csxuInfo received CSXU:', data.csxuName);
        setSelectedCSXU(data.csxuName);
      },
      'csxuInfo'
    );

    return () => {
      unsubscribeCSXU();
    };
  }, []);

  // When package changes, construct URL and fetch content
  useEffect(() => {
    const loadContent = async () => {
      try {
        // If no package selected, show placeholder
        if (!selectedPackage) {
          setLoading(false);
          setError(null);
          setContent(null);
          setGithubUrl(null);
          console.log('csxuInfo: No package selected, waiting for selection');
          return;
        }

        // Construct the dynamic GitHub URL
        const url = constructGithubUrl(selectedPackage);
        console.log('csxuInfo: Constructed GitHub URL:', url);

        if (!url) {
          setError('Could not construct GitHub URL from package name');
          setLoading(false);
          return;
        }

        setGithubUrl(url);
        setLoading(true);
        setError(null);

        // Fetch the README.org from GitHub
        const rawContent = await fetchGithubContent(url);

        // Parse the org-mode content
        const parsed = parseOrgContent(rawContent);
        const formatted = formatOrgContent(parsed);

        setContent(formatted);
        console.log('csxuInfo: Content loaded successfully for package:', selectedPackage);
      } catch (err) {
        setError(err.message);
        console.error('csxuInfo: Failed to load content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [selectedPackage]);

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
    <Layout 
      showHeader={true} 
      showSidebar={true} 
      showFooter={true}
      selectedCSXU={selectedCSXU}
      selectedPackage={selectedPackage}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">csxu Info</h1>

        {!selectedPackage && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">📦 No Package Selected</h2>
            <p className="text-blue-800 mb-4">
              Please select a package from the Test Stubs page to view its information.
            </p>
            <p className="text-sm text-blue-700">
              Go to <code className="bg-blue-100 px-2 py-1 rounded">Test Stubs</code> and enter a package name (e.g., "bisos.facter") to get started.
            </p>
          </div>
        )}

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
            {githubUrl && (
              <p className="text-sm text-red-600 mt-4">
                Source: <a href={githubUrl}
                           className="underline hover:no-underline"
                           target="_blank"
                           rel="noopener noreferrer">
                  {githubUrl}
                </a>
              </p>
            )}
          </div>
        )}

        {content && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {content.map((section, index) => renderSection(section, index))}

            <div className="mt-8 pt-8 border-t border-gray-200">
              {githubUrl && (
                <p className="text-sm text-gray-600">
                  Source: <a href={githubUrl}
                             className="text-blue-600 hover:underline"
                             target="_blank"
                             rel="noopener noreferrer">
                    {githubUrl}
                  </a>
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Package: <strong>{selectedPackage}</strong> | Content fetched at runtime from GitHub
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
