import * as React from "react"
import { useState } from "react"

import Layout from "../../components/Layout"
import Seo from "../../components/seo"

const HelpPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      category: "Getting Started",
      items: [
        {
          q: "How do I install this starter?",
          a: "Clone the repository, run npm install, and then npm run develop. Visit http://localhost:8000 to see your site. For detailed instructions, see the README.md file."
        },
        {
          q: "What are the system requirements?",
          a: "You need Node.js 18+ and npm. The starter uses Gatsby 5, React 18, and Tailwind CSS v3. Check the package.json for all dependencies."
        },
        {
          q: "How do I create my first page?",
          a: "Create a new .js file in src/pages/. Each file automatically becomes a route. For example, src/pages/my-page.js becomes /my-page. Visit the 'For Developers > Creating Pages' guide for detailed examples."
        },
        {
          q: "Where is the menu structure defined?",
          a: "The menu is defined in src/data/menuData.js. This centralized file controls the sidebar navigation, search index, and sitemap. Edit this file to add or modify menu items."
        }
      ]
    },
    {
      category: "Navigation & Layout",
      items: [
        {
          q: "How do I add items to the sidebar navigation?",
          a: "Edit src/data/menuData.js and add new objects with 'label' and 'path' properties. You can nest items up to 5 levels deep using the 'children' array."
        },
        {
          q: "Can I control which pages show the header, sidebar, or footer?",
          a: "Yes! Use the Layout component props: showHeader={true/false}, showSidebar={true/false}, showFooter={true/false}. This gives you full control over the 4-part layout."
        },
        {
          q: "How does the hamburger menu work on mobile?",
          a: "The hamburger menu appears on screens smaller than 768px (md breakpoint). The sidebar is hidden by default and shows as an overlay when clicked. It automatically closes when you navigate to a new page."
        },
        {
          q: "What layout options are available?",
          a: "Visit 'For Developers > Layout Examples' to see all variations: full-width, with/without sidebar, with/without header/footer, and content-only layouts."
        }
      ]
    },
    {
      category: "Customization",
      items: [
        {
          q: "How do I change the site colors?",
          a: "Edit tailwind.config.js and modify the theme.extend.colors section. The ByStar brand colors are bystar.navy (#001a4d) and secondary (#E1EBDD). Customize spacing scale in the same file."
        },
        {
          q: "Can I use custom fonts?",
          a: "Yes! Add fonts to src/styles/global.css using @import, then reference them in tailwind.config.js theme.extend.fontFamily. See Gatsby documentation on web fonts for more options."
        },
        {
          q: "How do I modify the responsive breakpoints?",
          a: "Tailwind v3 uses default breakpoints (sm: 640px, md: 768px, lg: 1024px). Customize in tailwind.config.js under theme.extend.screens if needed. Use md: and lg: prefixes in className for responsive classes."
        },
        {
          q: "Where should I add global styles?",
          a: "Add global CSS to src/styles/global.css. Component-specific styles should use Tailwind utility classes in the className prop. Avoid inline styles for better maintainability."
        }
      ]
    },
    {
      category: "Styling with Tailwind CSS",
      items: [
        {
          q: "What version of Tailwind is this starter using?",
          a: "This starter uses Tailwind CSS v3 (3.4.17) for official Gatsby 5 compatibility. We follow the official Gatsby Tailwind CSS guide."
        },
        {
          q: "How do I use Tailwind classes in my components?",
          a: "Add utility classes to the className prop: className=\"bg-blue-50 p-4 rounded-lg\". Use responsive prefixes like md:, lg: for mobile-first responsive design. Visit tailwindcss.com/docs for all available utilities."
        },
        {
          q: "How do I create custom components with consistent styling?",
          a: "Use Tailwind utility strings to create reusable components. Example: const buttonClass = \"px-6 py-3 bg-blue-500 rounded font-semibold\". This keeps styles organized and DRY."
        },
        {
          q: "What's the difference between component styles and utility classes?",
          a: "This starter uses utility-first approach (Tailwind v3 standard). We avoid @layer components to maintain compatibility. Use utility classes directly in className - it's simpler and more maintainable."
        }
      ]
    },
    {
      category: "Mobile & Responsive Design",
      items: [
        {
          q: "How is the site responsive?",
          a: "This starter uses Tailwind CSS mobile-first approach: base styles apply to mobile, then use md: and lg: prefixes for larger screens. Test with browser DevTools' responsive design mode."
        },
        {
          q: "What are the mobile breakpoints?",
          a: "Mobile: < 768px (hamburger menu), Tablet/Desktop: md (768px), Large Desktop: lg (1024px). Customize in tailwind.config.js if needed."
        },
        {
          q: "How do I hide elements on mobile?",
          a: "Use className=\"hidden md:block\" to hide on mobile, show on desktop. Use className=\"block md:hidden\" to show on mobile, hide on desktop."
        },
        {
          q: "Why isn't the sidebar disappearing on mobile?",
          a: "The sidebar now uses className=\"hidden md:block\" which properly hides it on mobile (< 768px). If it still shows, clear your browser cache and hard refresh (Ctrl+Shift+R)."
        }
      ]
    },
    {
      category: "Deployment",
      items: [
        {
          q: "How do I create a production build?",
          a: "Run npm run build to compile the site. This optimizes CSS (removes unused Tailwind utilities), minifies JavaScript, and creates a public/ folder ready for deployment."
        },
        {
          q: "Where can I deploy this site?",
          a: "This static site can be deployed anywhere: Netlify, Vercel, GitHub Pages, AWS, or any static hosting. See Gatsby's deployment guide for platform-specific instructions."
        },
        {
          q: "How do I set up GitHub Pages deployment?",
          a: "See the official Gatsby documentation on deploying to GitHub Pages. Typically involves adding 'pathPrefix' to gatsby-config.js and using gatsby-plugin-manifest."
        },
        {
          q: "What should I check before going live?",
          a: "Run npm run build locally, test in the public/ folder, verify mobile responsiveness, check all links work, and test search functionality. Consider running an accessibility audit."
        }
      ]
    },
    {
      category: "Troubleshooting",
      items: [
        {
          q: "The site won't start with npm run develop",
          a: "Try: npm run clean (clears cache), then npm install (reinstalls dependencies), then npm run develop. If that fails, delete node_modules and .cache folders manually."
        },
        {
          q: "Tailwind styles aren't applying",
          a: "Restart the dev server (Ctrl+C, then npm run develop). Make sure src/styles/tailwind.css is imported in gatsby-browser.js. Check that tailwind.config.js content paths include your files."
        },
        {
          q: "Images aren't loading",
          a: "Use gatsby-plugin-image and StaticImage for optimized images. Check the file path is correct relative to src/images/. Files must be in src/images/ to be found by the plugin."
        },
        {
          q: "My changes aren't appearing",
          a: "Clear cache: npm run clean. Hard refresh browser (Ctrl+Shift+R). Restart dev server. Check browser console for errors (F12). Check terminal for build errors."
        },
        {
          q: "Search isn't working",
          a: "Check that src/utils/searchIndex.js is properly configured. Make sure menu items are in menuData.js. Search indexes pages from the menu structure, so unlisted pages won't be searchable."
        }
      ]
    }
  ]

  const resources = [
    {
      title: "📖 Gatsby Documentation",
      description: "Official Gatsby docs with guides for features, plugins, and deployment",
      link: "https://www.gatsbyjs.com/docs/",
      icon: "🚀"
    },
    {
      title: "🎨 Tailwind CSS Documentation",
      description: "Complete Tailwind v3 documentation with all utilities and customization options",
      link: "https://tailwindcss.com/docs",
      icon: "✨"
    },
    {
      title: "⚛️ React Documentation",
      description: "React docs for hooks, components, and state management",
      link: "https://react.dev/",
      icon: "⚛️"
    },
    {
      title: "🛠️ Gatsby on Tailwind",
      description: "Official guide for integrating Tailwind CSS with Gatsby",
      link: "https://www.gatsbyjs.com/docs/how-to/styling/tailwind-css/",
      icon: "🔗"
    },
    {
      title: "📱 Responsive Design Guide",
      description: "Gatsby and Tailwind best practices for mobile-first responsive design",
      link: "https://www.gatsbyjs.com/docs/how-to/styling/responsive-design/",
      icon: "📱"
    },
    {
      title: "🚀 Gatsby Deployment",
      description: "Comprehensive guide to deploying Gatsby sites on various platforms",
      link: "https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/",
      icon: "🌐"
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <div className="mb-12 p-8 bg-gradient-to-r from-bystar-navy to-blue-900 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4">❓ Help & Support</h1>
        <p className="text-lg opacity-90">
          Find answers to common questions, access documentation, and troubleshoot issues.
        </p>
      </div>

      {/* Quick Links to Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-bystar-navy mb-8">📚 Documentation & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-bystar-navy hover:shadow-lg transition-all no-underline"
            >
              <div className="text-4xl mb-3">{resource.icon}</div>
              <h3 className="text-xl font-bold text-bystar-navy mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              <span className="text-bystar-navy font-semibold text-sm">Read More →</span>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-bystar-navy mb-8">❓ Frequently Asked Questions</h2>
        
        {faqs.map((faqSection, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h3 className="text-2xl font-bold text-bystar-navy border-b-2 border-bystar-navy pb-3 mb-4">
              {faqSection.category}
            </h3>
            <div className="space-y-3">
              {faqSection.items.map((item, itemIndex) => {
                const globalIndex = `${sectionIndex}-${itemIndex}`
                const isExpanded = expandedFaq === globalIndex
                return (
                  <div
                    key={itemIndex}
                    className="border border-gray-300 rounded-lg overflow-hidden hover:border-bystar-navy transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(globalIndex)}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-800">{item.q}</span>
                      <span className="text-bystar-navy font-bold text-xl">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Additional Help Section */}
      <section className="mb-12 p-8 bg-blue-50 rounded-lg border-l-4 border-bystar-navy">
        <h2 className="text-2xl font-bold text-bystar-navy mb-4">🤝 Need More Help?</h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            ✓ Visit the <a href="/developers/creating-pages" className="text-bystar-navy underline font-semibold">Creating Pages</a> guide for step-by-step instructions
          </li>
          <li>
            ✓ Check <a href="/developers/layout-examples" className="text-bystar-navy underline font-semibold">Layout Examples</a> to see working code samples
          </li>
          <li>
            ✓ Browse the <a href="/explore/accessibility" className="text-bystar-navy underline font-semibold">Accessibility</a> page for WCAG guidelines
          </li>
          <li>
            ✓ Use the <a href="/contact" className="text-bystar-navy underline font-semibold">Contact Form</a> to get in touch for specific questions
          </li>
          <li>
            ✓ Check the project <a href="/about/this-starter" className="text-bystar-navy underline font-semibold">About This Starter</a> page for overview
          </li>
        </ul>
      </section>

      {/* Tips Section */}
      <section className="p-8 bg-green-50 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-bold text-bystar-navy mb-4">💡 Pro Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Development:</strong> Use Browser DevTools (F12) to inspect elements and debug CSS issues
          </li>
          <li>
            <strong>Responsive Testing:</strong> Test mobile layout using DevTools' responsive design mode (Ctrl+Shift+M)
          </li>
          <li>
            <strong>Caching:</strong> When styles don't update, run <code className="bg-white px-2 py-1 rounded">npm run clean</code> and hard refresh (Ctrl+Shift+R)
          </li>
          <li>
            <strong>Search Indexing:</strong> Remember that search only indexes pages listed in <code className="bg-white px-2 py-1 rounded">src/data/menuData.js</code>
          </li>
          <li>
            <strong>Production Builds:</strong> Always test with <code className="bg-white px-2 py-1 rounded">npm run build</code> before deployment to catch errors
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Help & Support" />

export default HelpPage
