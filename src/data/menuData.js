// Menu hierarchy structure
// Can go up to 5 levels deep as requested

export const menuData = [
  {
    label: "🏠 Home",
    path: "/",
  },
  {
    label: "🖥️ csPlayer",
    path: "/csPlayer",
  },
  {
    label: "�️ csPlayer BackEnd",
    path: "/csPlayerBackEnd",
  },
  {
    label: "⚙️ Airflow",
    path: "/airflow",
  },
  {
    label: "📈 Grafana",
    path: "/grafana",
    dividerAfter: true,
  },
  {
    label: "📚 csxu Info",
    path: "/csxuInfo",
  },
  {
    label: "📦 pipx Info",
    path: "/pipxInfo",
  },
  {
    label: "🐍 Python of CSXU",
    path: "/csxuPythonSources",
    dividerAfter: true,
  },
  {
    label: "ℹ️ About",
    path: "/about",
    children: [
      {
        label: "PyCS",
        path: "/about/pycs",
      },
      {
        label: "CSXU",
        path: "/about/csxu",
      },
      {
        label: "BISOS-CSXUs",
        path: "/about/bisos",
      },
      {
        label: "csPlayers",
        path: "/about/csplayers",
      },
      {
        label: "This csPlayer",
        path: "/about/thiscsplayer",
      },
    ],
  },
  {
    label: "🔍 Explore",
    path: "/explore",
    dividerAfter: true,
    children: [
      {
        label: "Help & FAQ",
        path: "/explore/help",
      },
      {
        label: "Search",
        path: "/explore/search",
      },
      {
        label: "Accessibility",
        path: "/explore/accessibility",
      },
      {
        label: "Sitemap",
        path: "/sitemap",
      },
    ],
  },
  {
    label: "🧪 Test Stubs",
    path: "/testStubs",
  },
  {
    label: "🔧 Facter csApp",
    path: "/facterCsApp",
  },
]
