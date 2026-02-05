import Image from "next/image";
import Link from "next/link";
import WhatsappButton from "./WhatsappButton";
import NavigationPopover from "./NavigationPopover";

const NavigationBar = () => {
  return (
    <nav className="py-8 px-6 flex items-center justify-between max-w-7xl mx-auto">
      <Link href="/">
        <Image src="/tm-icon.png" alt="Logo" width={120} height={100} />
      </Link>
      <div className="flex gap-12">
        <NavigationPopover />
      </div>
    </nav>
  );
};
export default NavigationBar;
