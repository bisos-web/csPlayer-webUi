import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { messageBus } from '../utils/messageBus';
import { ORCHESTRATION_EVENTS } from '../utils/orchestrationEvents';
import { useOrchestration, useOrchestrationPersistence } from '../stores/orchestrationStore';
import { fetchGithubContent, parseOrgContent, formatOrgContent } from '../utils/fetchGithubContent';

export default function CsxuInfoPage() {
  // Use Zustand store for orchestration state
  useOrchestrationPersistence()
  const { selectedPackage, selectedCSXU } = useOrchestration()

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
   * e.g., "bisos.facter" -> "/bisos/var/csxu/facter.cs/derived/graphviz.pdf
   */
  const constructGithubUrl = (packageName) => {
    const repoName = getRepoNameFromPackage(packageName);
    if (!repoName) return null;
    // Ensure we don't double-append .cs if it's already there
    const csxuPath = selectedCSXU.endsWith('.cs') ? selectedCSXU : `${selectedCSXU}.cs`;
    return `file:///bisos/var/csxu/${csxuPath}/derived/graphviz.pdf`;
  };

  // No need for effects to load state or subscribe to messageBus
  // The useOrchestration hook automatically provides current store values
  // and updates whenever the store changes

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
          console.log('csxuGraphviz: No package selected, waiting for selection');
          return;
        }

        // Construct the graphviz PDF URL
        const url = constructGithubUrl(selectedPackage);
        console.log('csxuGraphviz: Constructed PDF URL:', url);

        if (!url) {
          setError('Could not construct PDF URL from package name');
          setLoading(false);
          return;
        }

        setGithubUrl(url);
        setLoading(false);  // For PDF in iframe, we don't need loading state
        setError(null);
        setContent(null);  // Not fetching content anymore, just embedding iframe
      } catch (err) {
        setError(err.message);
        console.error('csxuGraphviz: Failed to construct URL:', err);
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
            <h2 className="text-lg font-bold text-red-800 mb-2">Error Loading PDF</h2>
            <p className="text-red-700">{error}</p>
            {githubUrl && (
              <p className="text-sm text-red-600 mt-4">
                Attempted path: <code className="bg-red-100 px-2 py-1 rounded">{githubUrl}</code>
              </p>
            )}
          </div>
        )}

        {githubUrl && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    CSXU Graphviz: <span className="font-mono text-blue-600">{selectedCSXU}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    File: <span className="font-mono">{githubUrl}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Use fetch + blob approach to work around browser file:// security restrictions
                    fetch(githubUrl)
                      .then(response => response.blob())
                      .then(blob => {
                        const blobUrl = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = blobUrl;
                        a.download = `${selectedCSXU}-graphviz.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(blobUrl);
                        document.body.removeChild(a);
                      })
                      .catch(err => console.error('Error downloading PDF:', err))
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition whitespace-nowrap text-sm font-medium cursor-pointer"
                >
                  ⬇ Download PDF
                </button>
              </div>
            </div>
            
            <iframe
              src={githubUrl}
              style={{
                width: '100%',
                height: '800px',
                border: 'none',
                display: 'block'
              }}
              title={`Graphviz for ${selectedCSXU}`}
            />
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-600">
              Package: <strong>{selectedPackage}</strong>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
