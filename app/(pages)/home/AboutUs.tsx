import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FadeIn from "@/components/FadeIn";

const AboutUs = () => {
  return (
    <FadeIn>
      <Separator className="" />
      <div className="bg-[#f8f9fa] min-h-screen md:min-h-full md:py-32 flex items-center">
        <div className="flex flex-col max-w-7xl w-full mx-auto px-4 md:px-0">
          <div className="flex flex-col md:flex-row w-full md:gap-12 gap-6">
            <div className="flex flex-col md:w-3/7 md:space-y-12 space-y-6 justify-center items-start">
              <div className="flex flex-col gap-6">
                <h2 className="group md:text-4xl text-2xl font-bold tracking-widest cursor-pointer">
                  The People Behind Your{" "}
                  <span className="relative inline-block text-primary">
                    Journey
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </h2>
                <p className="md:text-lg text-gray-600 leading-relaxed">
                  TM Tours & Travel Sdn Bhd is a leading Muslim Tour Operator
                  established since 1991 with main activities which includes
                  Ticketing, Inbound & Outbound Tours, Umrah, Hajj, MICE,
                  Accommodations, Transportation, Car Rentals, VIP Vehicles
                  Rentals, Tailor Made Programs as we cater for Domestic and
                  International markets.
                </p>
              </div>
              <div className="flex flex-col px-0">
                <Link
                  href="/about-us"
                  className="flex items-center gap-2 text-primary font-medium"
                >
                  <Button
                    variant="link"
                    size="lg"
                    className="!px-0 hover:text-black cursor-pointer"
                  >
                    Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  href="/gallery"
                  className="flex items-center gap-2 text-primary font-medium"
                >
                  <Button
                    variant="link"
                    size="lg"
                    className="!px-0 hover:text-black cursor-pointer"
                  >
                    Gallery <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-primary font-medium"
                >
                  <Button
                    variant="link"
                    size="lg"
                    className="!px-0 hover:text-black cursor-pointer"
                  >
                    Blog <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:w-4/7 hidden md:block">
              <div className="flex flex-col">
                <Image
                  src="https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//370f693dc7f6bd52a4e36ff419ff74a4jpg&w=1080&h=720&zc=1&a="
                  alt="Gallery"
                  className="!w-full h-72 object-cover rounded-lg"
                  width={400}
                  height={400}
                />
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <Image
                    src="https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//32ff1eb1403fbf0ee233a5936b36a8cfjpg&w=1080&h=720&zc=1&a="
                    alt="Gallery"
                    className="!w-full h-54 object-cover rounded-lg"
                    width={400}
                    height={400}
                  />
                  <Image
                    src="https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//237729790f4843ada1ae6172fd34002bjpg&w=800&h=600&zc=1&a="
                    alt="Gallery"
                    className="!w-full h-54 object-cover rounded-lg"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>

            <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 px-4 scrollbar-hide">
              {/* Image 1 */}
              <div className="min-w-[85%] snap-start">
                <Image
                  src="https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//370f693dc7f6bd52a4e36ff419ff74a4jpg&w=1080&h=720&zc=1&a="
                  alt="Gallery"
                  className="w-full h-64 object-cover rounded-lg"
                  width={400}
                  height={400}
                />
              </div>

              {/* Image 2 */}
              <div className="min-w-[85%] snap-start">
                <Image
                  src="https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//32ff1eb1403fbf0ee233a5936b36a8cfjpg&w=1080&h=720&zc=1&a="
                  alt="Gallery"
                  className="w-full h-64 object-cover rounded-lg"
                  width={400}
                  height={400}
                />
              </div>

              {/* Image 3 */}
              <div className="min-w-[85%] snap-start pr-4">
                <Image
                  src="https://tmtours.com.my/public/js/common/thumbnr.php?src=https://www.tmtours.com.my/traveldez/images/globalbanner/uploads//237729790f4843ada1ae6172fd34002bjpg&w=800&h=600&zc=1&a="
                  alt="Gallery"
                  className="w-full h-64 object-cover rounded-lg"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="" />
    </FadeIn>
  );
};
export default AboutUs;
