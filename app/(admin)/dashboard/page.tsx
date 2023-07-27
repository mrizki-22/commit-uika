import { BiSolidDashboard } from "react-icons/bi";
import Link from "next/link";

function Page() {
  return (
    <div className="container mx-auto">
      <div className="text-xs breadcrumbs">
        <ul>
          <li>
            <Link className="flex items-center" href={"/dashboard"}>
              <BiSolidDashboard className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Dashboard Admin</h1>
      </div>
    </div>
  );
}

export default Page;
