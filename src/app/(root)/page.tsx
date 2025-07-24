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
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="block">Render Nova</span>
            <span className="block text-white">
              AI Tools
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform • Enhance • Create with AI
          </p>

          {/* Quick Access Tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-all duration-300">
                    <Image 
                      src={link.icon} 
                      alt={link.label} 
                      width={24} 
                      height={24} 
                      className="filter brightness-0" 
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
            className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started ✨
          </Link>
        </div>
      </section>

      {/* Main Content - Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore <span className="text-gray-900">AI Creations</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing AI-enhanced images from our community
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
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