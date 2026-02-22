import { Briefcase, Building2, Map, Plane } from "lucide-react";
import Image from "next/image";

const AboutUsPage = () => {
  const ourServices = [
    {
      title: "Flights & Visa Services",
      description:
        "Competitive domestic and international flight bookings, group itineraries, and complete visa application assistance for a smooth travel experience.",
      icon: <Plane className="text-white w-8 h-8" />,
    },
    {
      title: "Tour & Pilgrimage Packages",
      description:
        "Curated domestic and international tours, including Muslim-friendly destinations, Umrah, Hajj, and Ziarah packages with full arrangements.",
      icon: <Map className="text-white w-8 h-8" />,
    },
    {
      title: "Accommodation & Transport",
      description:
        "Hotel and resort reservations, homestays, and reliable car, van, limousine, and bus rental services for individuals and groups.",
      icon: <Building2 className="text-white w-8 h-8" />,
    },
    {
      title: "Corporate & Event Solutions",
      description:
        "Professional MICE, event management, travel insurance, and tailor-made packages designed for corporate and private needs.",
      icon: <Briefcase className="text-white w-8 h-8" />,
    },

    {
      title: "Flight Tickets",
      description:
        "Competitive pricing for both Domestic and International flights. We handle group bookings and complex itineraries with ease.",
      icon: <Plane className="text-white w-8 h-8" />,
    },
    {
      title: "Holiday Tours",
      description:
        "Expertly curated Domestic and International tour packages. Specialized in Muslim-friendly destinations and Umrah/Hajj programs.",
      icon: <Map className="text-white w-8 h-8" />,
    },
    {
      title: "Reservations",
      description:
        "From luxury Hotels and Resorts to cozy Chalets and Homestays, we secure the best accommodations tailored to your budget.",
      icon: <Building2 className="text-white w-8 h-8" />,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
      <section className="grid grid-cols-1 md:grid-cols-3 items-stretch min-h-[500px]">
        <div className="relative h-full min-h-[200px]">
          <Image
            src="https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/sign/mice-main-images/mice-corporate-meeting.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjhhYWU0OS0wZjFiLTQ1NjgtOGI0OS1mMjVkOTBlYTVmZWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtaWNlLW1haW4taW1hZ2VzL21pY2UtY29ycG9yYXRlLW1lZXRpbmcuanBnIiwiaWF0IjoxNzY5Njk5NDQ4LCJleHAiOjE4MDEyMzU0NDh9.L2jOyQRYwh3JApCpsswJm7NCj4d6_ZQGKXp77wJrFew"
            alt="Our Journey"
            className="absolute inset-0 object-cover md:w-full md:h-full w-[400px] h-[200px]"
            width={800}
            height={800}
          />
        </div>
        <div className="bg-white py-8 md:p-16 col-span-2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-l-4 border-primary pl-4">
            Our Legacy
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            Established in 1991, TM Tours & Travel has spent{" "}
            <b>over three decades</b> perfecting the art of pilgrimage and
            leisure travel. Our journey began with a simple mission: to provide
            the Muslim community with reliable, soulful, and high-quality travel
            experiences. Over the years, we have evolved from a small local
            agency into a premier tour operator, recognized for our commitment
            to excellence and our deep understanding of religious and cultural
            travel requirements. We believe that travel is more than just moving
            from one place to another; it is about the stories we create, the
            connections we make, and the spiritual growth we achieve along the
            way.
            <br />
            <br />
            Our team consists of seasoned professionals who are passionate about
            hospitality. Whether it is navigating the complexities of Hajj and
            Umrah or designing a relaxing family getaway in the heart of Europe,
            we handle every detail with precision. We take pride in our
            &quot;customer-first&quot; philosophy, ensuring that from the moment
            you inquire until the moment you return home, you feel supported and
            valued. As we look to the future, TM Tours remains dedicated to
            innovation, expanding our global network while maintaining the
            traditional values of trust and integrity that have been our
            cornerstone for over thirty years. We don&apos;t just sell packages;
            we craft memories that last a lifetime, ensuring every traveler
            finds peace of mind.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 items-stretch min-h-[500px]">
        <div className="bg-gray-50 py-8 md:p-16 col-span-2 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-l-4 border-primary pl-4">
            Our Vision & Mission
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-justify">
            <p>
              Our vision is to become the leading global provider of
              Halal-compliant travel services, setting the benchmark for quality
              and religious sensitivity. We strive to bridge the gap between
              modern travel conveniences and traditional values, making it
              easier for every traveler to explore the world without
              compromising their faith. By leveraging technology and strong
              global partnerships, we aim to offer seamless booking experiences
              and unparalleled service quality across all seven continents.
            </p>
            <p>
              Our mission is centered on personalized service. We understand
              that no two travelers are the same, which is why we focus heavily
              on tailor-made programs. From specialized MICE (Meetings,
              Incentives, Conferences, and Exhibitions) arrangements for
              corporate clients to private transport rentals including
              limousines and luxury coaches, we ensure every aspect of your trip
              is handled with the utmost care and professionalism.
            </p>
          </div>
        </div>
        <div className="relative h-full min-h-[200px] order-1 md:order-2">
          <Image
            src="https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/sign/package-main-images/korea.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjhhYWU0OS0wZjFiLTQ1NjgtOGI0OS1mMjVkOTBlYTVmZWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwYWNrYWdlLW1haW4taW1hZ2VzL2tvcmVhLmpwZyIsImlhdCI6MTc2OTY4NDkzNywiZXhwIjoxODAxMjIwOTM3fQ.kZBgAUoeyZpV78lVpLQm520XhqXhI-Q6auP7r-a9oH8"
            alt="Our Services"
            className="absolute inset-0 object-cover md:w-full md:h-full w-[400px] h-[200px]"
            width={800}
            height={800}
          />
        </div>
      </section>

      <section className="bg-white md:py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Our Services
          </h2>

          <div className="relative">
            <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-4">
              {ourServices.map((item, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-[200px] bg-blue-50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-3"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="w-full md:py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 flex justify-center">
            We Are Registered With
          </h2>

          <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-12">
            <ul className="space-y-5 text-blue-800 text-lg leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Ministry of Tourism, Art and Culture of Malaysia
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Ministry of Finance of Malaysia
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <div>
                  IATA
                  <span className="block text-sm text-blue-600 font-normal">
                    Member Number: 20310522
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Malaysia Association of Tour & Travel Agents (MATTA)
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Bumiputera Travel and Tours Association (BUMITRA)
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Licence with Tabung Haji for pilgrimage (Hajj)
              </li>
            </ul>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUsPage;
