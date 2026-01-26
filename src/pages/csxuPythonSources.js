import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { fetchGithubContent } from '../utils/fetchGithubContent';

export default function CsxuPythonSourcesPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch the Python source file from GitHub
        const githubUrl = 'https://github.com/bisos-pip/facter/blob/main/py3/bin/facter.cs';
        const rawContent = await fetchGithubContent(githubUrl);
        setContent(rawContent);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load csxu Python Sources:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getLineCount = () => {
    if (!content) return 0;
    return content.split('\n').length;
  };

  return (
    <Layout showHeader={true} showSidebar={true} showFooter={true}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">csxu Python Sources</h1>
          <p className="text-lg text-gray-600">Source code from bisos-pip/facter</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading Python source code from GitHub...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-red-800 mb-2">Error Loading Source Code</h2>
            <p className="text-red-700">{error}</p>
            <p className="text-sm text-red-600 mt-4">
              Source: <a href="https://github.com/bisos-pip/facter/blob/main/py3/bin/facter.cs"
                         className="underline hover:no-underline"
                         target="_blank"
                         rel="noopener noreferrer">
                GitHub - bisos-pip/facter/py3/bin/facter.cs
              </a>
            </p>
          </div>
        )}

        {content && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-600">File: facter.cs</p>
                  <p className="text-sm text-gray-600">{getLineCount()} lines of code</p>
                </div>
              </div>
              <button
                onClick={handleCopyToClipboard}
                className={`px-4 py-2 rounded font-semibold transition-all ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? '✓ Copied!' : '📋 Copy Code'}
              </button>
            </div>

            {/* Code Display */}
            <div className="overflow-x-auto">
              <pre className="bg-gray-900 text-gray-100 p-6 text-sm leading-relaxed font-mono overflow-auto max-h-96">
                <code>{content}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
              <p className="text-sm text-gray-600 mb-2">
                Source: <a href="https://github.com/bisos-pip/facter/blob/main/py3/bin/facter.cs"
                           className="text-blue-600 hover:underline"
                           target="_blank"
                           rel="noopener noreferrer">
                  GitHub - bisos-pip/facter/py3/bin/facter.cs
                </a>
              </p>
              <p className="text-xs text-gray-500">
                Content fetched at runtime from GitHub
              </p>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-2">About This File</h2>
          <p className="text-blue-800">
            This file is part of the bisos-pip/facter repository and contains Python source code
            for the facter.cs command service. You can copy the entire source code using the
            "Copy Code" button above.
          </p>
        </div>
      </div>
    </Layout>
  );
}
