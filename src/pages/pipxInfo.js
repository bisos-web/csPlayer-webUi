import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getOrchestrationState } from '../utils/orchestrationState';
import { fetchPyPIInfo, formatPyPIData } from '../utils/fetchPyPIInfo';

export default function PipxInfoPage() {
  const [selectedCSXU, setSelectedCSXU] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load persisted state on mount
    const persistedState = getOrchestrationState()
    setSelectedCSXU(persistedState.selectedCSXU)
    setSelectedPackage(persistedState.selectedPackage)
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch the PyPI package info
        const pypiData = await fetchPyPIInfo('bisos.facter');
        const formatted = formatPyPIData(pypiData);
        setData(formatted);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load pipx Info:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderClassifiers = (classifiers) => {
    return classifiers.slice(0, 10).map((classifier, index) => (
      <span
        key={index}
        className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
      >
        {classifier}
      </span>
    ));
  };

  const renderVersions = (versions) => {
    return versions.slice(0, 10).map((version, index) => (
      <span
        key={index}
        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2 mb-2"
      >
        {version}
      </span>
    ));
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
        <h1 className="text-5xl font-bold mb-8 text-gray-900">pipx Info</h1>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading bisos.facter package information...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-red-800 mb-2">Error Loading Package Info</h2>
            <p className="text-red-700">{error}</p>
            <p className="text-sm text-red-600 mt-4">
              Source: <a href="https://pypi.org/project/bisos.facter/"
                         className="underline hover:no-underline"
                         target="_blank"
                         rel="noopener noreferrer">
                PyPI - bisos.facter
              </a>
            </p>
          </div>
        )}

        {data && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
            {/* Header Info */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{data.name}</h2>
                  <p className="text-lg text-gray-600 mt-2">{data.summary}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 ml-4">
                  <p className="text-sm text-gray-600">Latest Version</p>
                  <p className="text-2xl font-bold text-blue-600">{data.version}</p>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.author && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Author</h3>
                  <p className="text-gray-900">{data.author}</p>
                </div>
              )}

              {data.author_email && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Email</h3>
                  <p className="text-gray-900">
                    <a href={`mailto:${data.author_email}`} className="text-blue-600 hover:underline">
                      {data.author_email}
                    </a>
                  </p>
                </div>
              )}

              {data.license && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">License</h3>
                  <p className="text-gray-900">{data.license}</p>
                </div>
              )}

              {data.requires_python && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Python Version</h3>
                  <p className="text-gray-900">{data.requires_python}</p>
                </div>
              )}

              {data.last_released && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Last Released</h3>
                  <p className="text-gray-900">{data.last_released}</p>
                </div>
              )}

              {data.home_page && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Project URL</h3>
                  <a href={data.home_page} target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    {data.home_page}
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            {data.description && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {data.description}
                </div>
              </div>
            )}

            {/* Classifiers */}
            {data.classifiers.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Classifiers</h3>
                <div>
                  {renderClassifiers(data.classifiers)}
                  {data.classifiers.length > 10 && (
                    <p className="text-sm text-gray-600 mt-4">
                      +{data.classifiers.length - 10} more classifiers
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Versions */}
            {data.all_versions.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Versions</h3>
                <div>
                  {renderVersions(data.all_versions)}
                  {data.all_versions.length > 10 && (
                    <p className="text-sm text-gray-600 mt-4">
                      +{data.all_versions.length - 10} more versions available
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                Package info from: <a href="https://pypi.org/project/bisos.facter/"
                                      className="text-blue-600 hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer">
                  PyPI - bisos.facter
                </a>
              </p>
              <p className="text-xs text-gray-500">
                Data fetched at runtime from PyPI JSON API
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
