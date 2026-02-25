import Link from "next/link";

interface RPCTableProps {
  topPackages: {
    package_uuid: string;
    title: string;
    total_views: number;
  }[];
  title: string;
}

const RPCTable = ({ topPackages, title }: RPCTableProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full" /> {title}
        </h3>
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold uppercase">
          Ranked
        </span>
      </div>

      <div className="space-y-4">
        {topPackages?.map(
          (
            pkg: {
              package_uuid: string;
              title: string;
              total_views: number;
            },
            index: number
          ) => (
            <Link
              key={pkg.package_uuid}
              href={`/package/${pkg.package_uuid}`}
              className="group flex items-center justify-between rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold ${
                    index === 0
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-slate-700 truncate group-hover:text-primary transition-colors">
                  {pkg.title}
                </span>
              </div>
              <div className="flex flex-row gap-2 items-end">
                <span className="text-sm font-bold text-slate-900">
                  {pkg.total_views.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">views</span>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
export default RPCTable;
