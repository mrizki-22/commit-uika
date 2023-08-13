import React from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { BsSearch } from "react-icons/bs";

function page() {
  return (
    <div className="container ">
      <div className="flex w-full mx-auto max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Cari Artikel" />
        <Button type="submit" variant="outline">
          <BsSearch className="inline-block w-4 h-4 stroke-current" />
        </Button>
      </div>
    </div>
  );
}

export default page;
