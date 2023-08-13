import Link from "next/link";
import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BiLogoBlogger } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import dynamic from "next/dynamic";

const FormEditor = dynamic(() => import("./FormEditor"), {
  ssr: false,
});

function Page({ params }: { params: { slug: string } }) {
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
          <li>
            <Link className="flex items-center" href={"/admin-blog"}>
              <BiLogoBlogger className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Blog</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center" href={"/admin-blog/create"}>
              <MdEdit className="inline-block w-4 h-4 mr-2 stroke-current" />
              <span className="leading-none">Tulis</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Tulis Artikel</h1>
      </div>
      <div className="mt-5">
        <FormEditor slug={params.slug} />
      </div>
    </div>
  );
}

export default Page;
