import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/Layout"
import SearchBox from "../../components/SearchBox"
import Seo from "../../components/seo"

const SearchPage = () => (
  <Layout>
    <h1>Search</h1>
    <p>Find pages on this site using the search box below:</p>
    <div style={styles.searchContainer}>
      <SearchBox />
    </div>
    <p style={styles.info}>
      This search is powered by Lunr.js and runs entirely in your browser - no server needed!
    </p>
    <Link to="/">Back to home</Link>
  </Layout>
)

const styles = {
  searchContainer: {
    marginBottom: '2rem',
    maxWidth: '500px',
  },
  info: {
    color: '#666',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
}

export const Head = () => <Seo title="Search" />

export default SearchPage
