import React from "react";
import ParseResume from "./_components/ParseResume"; // adjust the path if needed

function Resume() {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Resume Based Interview</h1>
      <ParseResume />
    </div>
  );
}

export default Resume;
