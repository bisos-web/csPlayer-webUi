import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/seo"

const UsingDSG = () => (
  <Layout>
    <h1>
      Hello from a template component, using Deferred Static Generation (DSG)
    </h1>
    <p>
      Currently that template only supports passing context to work. Support for
      passing regular props will be restored very soon!
    </p>
    <Link to="/">Back to home</Link>
  </Layout>
)

export const Head = () => <Seo title="Using DSG" />

export default UsingDSG
