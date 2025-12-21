import Link from "next/link";

export default function Home() {
  const learningPaths = [
    {
      title: "Stacks Fundamentals",
      description: "Learn the basics of Stacks blockchain, transactions, and smart contracts",
      modules: ["What is Stacks?", "Transactions", "Clarity Language", "Smart Contracts"],
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "DeFi Development",
      description: "Build decentralized finance applications on Stacks",
      modules: ["Token Standards", "DEX Integration", "Lending Protocols", "Yield Farming"],
      color: "from-green-500 to-teal-600"
    },
    {
      title: "NFT Creation",
      description: "Create and manage non-fungible tokens on Stacks",
      modules: ["SIP-009 Standard", "Badge NFTs", "Metadata Management", "Marketplaces"],
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Frontend Integration",
      description: "Connect web applications to Stacks blockchain",
      modules: ["Wallet Connection", "@stacks/connect", "@stacks/transactions", "React Hooks"],
      color: "from-indigo-500 to-blue-600"
    }
  ];

  const featuredResources = [
    {
      title: "Badge NFT Contract",
      description: "Complete SIP-009 compliant NFT implementation with admin controls",
      link: "/docs/badge-nft",
      type: "Contract Documentation"
    },
    {
      title: "Clarity 4 Features",
      description: "Latest Clarity language features including stacks-block-time and post-conditions",
      link: "/stacks/stacks-shards/082_clarity_4_is_now_live",
      type: "Technical Guide"
    },
    {
      title: "Frontend Integration",
      description: "Complete guide to building Stacks-connected web applications",
      link: "/stacks/stacks-essentials/078_build_a_frontend",
      type: "Tutorial"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Stacks Quest Boards
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Your comprehensive learning platform for Stacks blockchain development.
            Master smart contracts, DeFi protocols, NFTs, and frontend integration through
            hands-on tutorials and documentation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#learning-paths"
              className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Learning
            </Link>
            <Link
              href="#resources"
              className="text-base font-semibold leading-6 text-slate-900 hover:text-indigo-600"
            >
              View Resources <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Learning Paths */}
        <div id="learning-paths" className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Learning Paths
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Structured learning journeys to master Stacks development
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${path.color} opacity-5`} />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-slate-900">{path.title}</h3>
                  <p className="mt-2 text-slate-600">{path.description}</p>
                  <ul className="mt-4 space-y-2">
                    {path.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex} className="flex items-center text-sm text-slate-500">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        {module}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                    Start Path
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        <div id="resources" className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Featured Resources
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Essential documentation and guides for Stacks developers
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredResources.map((resource, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {resource.description}
                </p>
                <Link
                  href={resource.link}
                  className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 rounded-2xl bg-indigo-600 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Join the Stacks Community</h2>
          <p className="mt-4 text-indigo-100">
            Connect with developers building the future of decentralized applications
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-indigo-200">Learning Modules</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-indigo-200">Smart Contracts</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-indigo-200">Developers</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Ready to Start Building?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Dive into our comprehensive documentation and start your Stacks development journey today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="https://docs.stacks.co"
              className="rounded-md bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-slate-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Docs
            </Link>
            <Link
              href="https://github.com/stacks-network/stacks-blockchain"
              className="rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
