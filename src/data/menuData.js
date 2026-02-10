// Menu hierarchy structure

export const menuData = [
  {
    label: "🏠 Home",
    path: "/",
  },
  {
    label: "🖥️ csPlayer CSXU",
    path: "/csPlayer",
  },
  {
      label: "🖥️ ModPlayer facter",
    path: "/modPlayerFacter",
  },
  {
      label: "🖥️ ModPlayer soncli",
    path: "/modPlayerSoncli",
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
    label: "🌳 CSXU Graphviz",
    path: "/csxuGraphviz",
  },
  {
    label: "📚 CSXU Info",
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
