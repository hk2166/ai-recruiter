"use client";
import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// ✅ Use local worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function ParseResume() {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    // Ensure component runs only in browser
    if (typeof window === "undefined") return;
  }, []);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        setResumeText(fullText.trim());
      } catch (err) {
        console.error("Error parsing PDF:", err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <label className="block font-medium mb-2">Upload Resume (PDF)</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFile}
      />
      {loading && <p className="text-blue-600 mt-2">Extracting text...</p>}
      {resumeText && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Extracted Resume Text:</h3>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">
            {resumeText.slice(0, 1000)}...
          </pre>
        </div>
      )}
    </div>
  );
}
