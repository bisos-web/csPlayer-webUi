import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/Layout"
import Seo from "../../components/seo"

const AccessibilityPage = () => (
  <Layout>
    <h1>Accessibility</h1>
    
    <h2>Text Size</h2>
    <p>
      While we recommend using your browser's built-in text sizing features (typically Ctrl/Cmd + and -), 
      this site is designed to be readable at all standard text sizes.
    </p>
    <ul>
      <li>Increase text: Ctrl + (Windows/Linux) or Cmd + (Mac)</li>
      <li>Decrease text: Ctrl - (Windows/Linux) or Cmd - (Mac)</li>
      <li>Reset text: Ctrl 0 (Windows/Linux) or Cmd 0 (Mac)</li>
    </ul>

    <h2>Web Accessibility Guidelines</h2>
    <p>
      This site has been designed to be completely accessible and usable, working in accordance with 
      the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
      Web Content Accessibility Guidelines (WCAG 2.1)</a>. 
      We aim to meet AA level conformance. If you encounter any accessibility issues on this site, 
      please <Link to="/explore/help">contact us</Link>.
    </p>

    <h2>Keyboard Navigation</h2>
    <p>This site is fully navigable using the keyboard. Common keyboard shortcuts include:</p>
    <ul>
      <li><kbd>Tab</kbd> - Move to next interactive element</li>
      <li><kbd>Shift + Tab</kbd> - Move to previous interactive element</li>
      <li><kbd>Enter</kbd> - Activate links and buttons</li>
      <li><kbd>Space</kbd> - Toggle checkboxes and buttons</li>
      <li><kbd>Arrow Keys</kbd> - Navigate within menus and lists</li>
    </ul>

    <h2>Screen Reader Support</h2>
    <p>
      This site is designed to work with screen readers including:
    </p>
    <ul>
      <li>NVDA (free, open source)</li>
      <li>JAWS (Windows)</li>
      <li>VoiceOver (Mac/iOS)</li>
      <li>TalkBack (Android)</li>
    </ul>
    <p>
      All pages include proper heading structure, alt text for images, and semantic HTML to ensure 
      screen readers can properly interpret the content.
    </p>

    <h2>Technical Standards</h2>
    <p>
      This site uses modern web standards and best practices:
    </p>
    <ul>
      <li>Valid HTML5 markup</li>
      <li>CSS that conforms to W3C specifications</li>
      <li>Semantic HTML for proper structure</li>
      <li>Color contrast that meets WCAG AA standards</li>
      <li>Mobile-responsive design</li>
      <li>JavaScript that enhances without requiring JavaScript</li>
    </ul>

    <h2>Accessibility Statement</h2>
    <p>
      We are committed to making this website accessible to all users, regardless of ability or 
      circumstance. We have undertaken to use our knowledge and understanding of the ways in which 
      different people access the Internet to develop a website that is clear and simple for everybody to use.
    </p>
    <p>
      We believe that usability and accessibility must have a solid foundation in web standards. 
      Our development approach prioritizes:
    </p>
    <ul>
      <li>Clear, simple language</li>
      <li>Logical page structure</li>
      <li>Sufficient color contrast</li>
      <li>Accessible forms and navigation</li>
      <li>Compatibility with assistive technologies</li>
    </ul>

    <h2>Report an Issue</h2>
    <p>
      If you encounter any accessibility issues or have suggestions for improvement, 
      please <Link to="/explore/help">contact us</Link> and let us know. 
      We take accessibility seriously and appreciate your feedback.
    </p>

    <Link to="/explore">Back to Explore</Link>
  </Layout>
)

export const Head = () => <Seo title="Accessibility" />

export default AccessibilityPage
