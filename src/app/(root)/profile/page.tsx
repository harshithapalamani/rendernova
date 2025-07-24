import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Profile</h1>
          <p className="text-gray-300 text-lg">Manage your AI creations and account</p>
        </div>
      </div>

      {/* Modern Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Credits Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <Image
                    src="/assets/icons/coins.svg"
                    alt="credits"
                    width={32}
                    height={32}
                    className="filter sepia saturate-200 hue-rotate-45 brightness-110"
                    style={{ filter: 'sepia(1) saturate(2) hue-rotate(45deg) brightness(1.1)' }}
                  />
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium uppercase tracking-wide">Credits Available</p>
                  <h2 className="text-5xl font-bold mt-1 text-white">{user.creditBalance}</h2>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-white to-gray-400 rounded-full"></div>
            </div>

            {/* Images Card */}
            <div className="bg-gradient-to-br from-gray-100 to-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Image
                    src="/assets/icons/photo.svg"
                    alt="images"
                    width={32}
                    height={32}
                    className="filter brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Images Created</p>
                  <h2 className="text-4xl font-bold text-gray-900 mt-1">{images?.data.length}</h2>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your <span className="text-gray-900">AI Creations</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore and manage all your AI-enhanced images
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
            <Collection
              images={images?.data}
              totalPages={images?.totalPages}
              page={page}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;