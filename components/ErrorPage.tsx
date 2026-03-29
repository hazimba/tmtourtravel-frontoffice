import Link from "next/link";
import { Button } from "./ui/button";

interface ErrorPageProps {
  title?: string;
  homebutton?: boolean;
}

// to be implement in every query that fetch data from db
const ErrorPage = ({ title, homebutton = false }: ErrorPageProps) => {
  return (
    <div className="flex border border-primary/50 rounded-md p-4 flex-col items-center justify-center px-4 text-center">
      {/* Error Icon Container */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Unable to load {title}
      </h2>
      <p className="mb-8 max-w-md text-gray-500">
        We ran into a problem loading this page. Please try again later or
        contact support if the issue persists.
      </p>

      {homebutton && (
        <Link href="/" className="w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            Go to Homepage
          </Button>
        </Link>
      )}
    </div>
  );
};
export default ErrorPage;
