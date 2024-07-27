"use client";

import { ChevronLeft, ChevronRight, DownloadCloud, Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "./ui/button";
// import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfView({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url);
      const file = await response.blob();
      console.log(file);

      setFile(file);
    };
    fetchFile();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden relative">
      <div data-poster-url="/bg.png" data-autoplay={true} data-loop={true} data-wf-ignore={true} className="-z-20 w-full h-full filter blur-2xl object-cover block fixed top-0 bottom-0 left-0 right-0">
        <video id="d6f1d52f-9da1-65ea-b5e0-5b1d28bbc683-video" className="w-full h-full object-cover z-[-100] bg-[50%] bg-cover m-auto absolute -top-full -bottom-full -left-full -right-full" autoPlay loop style={{ backgroundImage: "url('/bg.png')" }} muted playsInline>
          <source src="/bg.mp4" data-wf-ignore={true} />
          <source src="/bg.webm" data-wf-ignore={true} />
        </video>
      </div>

      <div className="sticky top-0 z-50 p-2 pt-10 rounded-b-lg">
        <div className="max-w-6xl px-2 w-max">
          <div className="grid grid-cols-7 gap-5 w-full">
            <Button
              className="pdfControl-btn"
              disabled={pageNumber === 1}
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber(pageNumber - 1);
                }
              }}
            >
              <ChevronLeft />
            </Button>
            <p className="flex items-center justify-center pdfControl-btn rounded-md">
              {pageNumber} of {numPages}
            </p>
            <Button
              disabled={pageNumber === numPages}
              onClick={() => {
                if (numPages) {
                  if (pageNumber < numPages) {
                    setPageNumber(pageNumber + 1);
                  }
                }
              }}
              className="pdfControl-btn"
            >
              <ChevronRight />
            </Button>
            <Button onClick={() => setRotation((rotation + 90) % 360)} className="pdfControl-btn">
              <RotateCw />
            </Button>

            <Button
              className="pdfControl-btn"
              disabled={scale >= 1.5}
              onClick={() => {
                setScale(scale * 1.2);
              }}
            >
              <ZoomInIcon />
            </Button>

            <Button
              disabled={scale <= 0.75}
              onClick={() => {
                setScale(scale / 1.2);
              }}
              className="pdfControl-btn"
            >
              <ZoomOutIcon />
            </Button>

            <Button className="pdfControl-btn">
              <a target="_blank" href={url} download>
                <DownloadCloud />
              </a>
            </Button>
          </div>
        </div>
      </div>
      {!file ? (
        <Loader2Icon className="animate-spin h-20 w-20 text-indigo-600 mt-2" />
      ) : (
        <Document loading={null} file={file} rotate={rotation} onLoadSuccess={onDocumentLoadSuccess} className="m-4">
          <Page scale={scale} pageNumber={pageNumber} className="shadow-lg" />
        </Document>
      )}
    </div>
  );
}

export default PdfView;
