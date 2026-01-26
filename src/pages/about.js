import React from 'react';
import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout showHeader={true} showSidebar={true} showFooter={true}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">About</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to the About section. This area contains information about various
            components and projects within the BISOS ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-3">📦 PyCS</h2>
              <p className="text-gray-600">
                Information about PyCS and its role in the BISOS ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
