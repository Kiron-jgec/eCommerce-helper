import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PrintIcon from "@mui/icons-material/Print";

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";

// ✅ IMPORTANT: set worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PrintCardLayout() {
  const [imageSrc, setImageSrc] = useState(null);
  const printRef = useRef();

  // 📥 Handle upload (PDF or Image)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 👉 If PDF → convert first page to image
    if (file.type === "application/pdf") {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument({
          data: typedarray,
        }).promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const img = canvas.toDataURL("image/png");
        setImageSrc(img);
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      // 👉 Image مستقیم
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // 🖨️ Print function
const handlePrint = () => {
  const content = printRef.current.innerHTML;

  const printWindow = window.open("", "", "width=900,height=700");

  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          @page {
            size: A4;
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
          }

          .a4 {
            width: 210mm;
            height: 297mm;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(5, 1fr);
            gap: 4mm;
            padding: 8mm;
            box-sizing: border-box;

            /* 🔥 IMPORTANT */
            page-break-after: avoid;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .card {
            border: 1px dashed #e2e2e2;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;

            /* 🔥 prevent splitting */
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .card img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <div class="a4">
          ${Array.from({ length: 10 })
            .map(
              () => `
              <div class="card">
                <img src="${imageSrc}" />
              </div>
            `
            )
            .join("")}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

  return (
     <Container maxWidth="xl" sx={{ py: 0 }}>

      <Typography variant="h6" fontWeight={600}>
              A4 Card Print Tool (2 × 5 Layout)
            </Typography>
            <Typography variant="body2"  mb={3}>
              Upload a PDF or image to print on A4 paper in a 2 × 5 layout.
            </Typography>

      {/* Buttons */}
 

      {/* Preview */}
      <Paper sx={{ p: 3, mt: 2,boxShadow:0 , pb:3,  border: 1,borderColor:"divider",borderRadius:3}}>
             <Box sx={{ display: "flex", gap: 2, mb: 3,pb:3, justifyContent:"space-between" ,borderBottom:1, borderColor:"divider"
           }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
          color="secondary"
        >
          Upload PDF / Image
          <input hidden type="file" onChange={handleFileUpload} />
        </Button>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          disabled={!imageSrc}
          color="secondary"
        >
          Print Now In A4
        </Button>
      </Box>
      {imageSrc &&
        <Box
          ref={printRef}
          sx={{
            width: "210mm",
            height: "297mm",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gap: "4mm",
            padding: "8mm",
           // background: "white",
            boxSizing: "border-box",
            margin: "0 auto",
            border: "1px solid ",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          {
            Array.from({ length: 10 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  border: "1px dashed #aaa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageSrc}
                  alt="card"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}

       
        </Box>
}
             {!imageSrc && <>

            <Box sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "210mm",
                height: "297mm",
                margin: "0 auto",
                border: "1px solid ",
                borderColor: "divider",
                borderRadius: 2,
              }}
              
              > 
            
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No preview available !
            </Typography>
             </Box>
            
            </> }
      </Paper>
    </Container>
  );
}