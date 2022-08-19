import { useState } from "react";
import DashboardLayout from "~/layouts/DashboardLayout";
import ReactQuill from "~/components/ReactQuill";

function Home() {
  const [value, setValue] = useState("");

  return (
    <DashboardLayout>
      {/* <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Beranda</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
        </div>
      </div> */}
      <ReactQuill value={value} setValue={setValue} />
    </DashboardLayout>
  );
}

export default Home;
