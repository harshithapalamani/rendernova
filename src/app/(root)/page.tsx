import Collection from "@/components/shared/Collection";
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import { SearchParamProps } from "@/types"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchQuery = (resolvedSearchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="block">Render Nova</span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              AI Tools
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Transform • Enhance • Create with AI
          </p>

          {/* Quick Access Tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {navLinks.slice(1, 5).map((link, index) => (
              <Link
                key={link.route}
                href={link.route}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Image 
                      src={link.icon} 
                      alt={link.label} 
                      width={24} 
                      height={24} 
                      className="filter brightness-0 invert" 
                    />
                  </div>
                  <span className="text-white text-sm font-medium text-center">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            href="/transformations/add/restore"
            className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300"
          >
            Get Started ✨
          </Link>
        </div>
      </section>

      {/* Main Content - Gallery/Search */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Explore <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">AI Creations</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Search and discover amazing AI-enhanced images from our community
            </p>
            
            {/* Prominent Search Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-1 rounded-2xl shadow-xl">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4"> Search AI Images</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for images, styles, or effects..."
                      className="w-full px-6 py-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 font-medium">
                      Search
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    <span className="text-sm text-slate-500">Popular:</span>
                    {['restore', 'enhance', 'remove background', 'recolor'].map((tag) => (
                      <button key={tag} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm hover:bg-violet-200 transition-colors duration-200">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <Collection 
              hasSearch={true}
              images={images?.data}
              totalPages={images?.totalPage}
              page={page}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home