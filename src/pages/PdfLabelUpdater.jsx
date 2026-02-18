import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Alert,
  Divider,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function getIndianFormattedDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1; // Month is zero-indexed (0-11), so add 1
  const year = date.getFullYear();

  // Add leading zero if day or month is less than 10
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
}

export default function PdfLabelUpdater() {
  const [selectedMarketplace, setSelectedMarketplace] = useState("meesho");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState({ msg: "", type: "", show: false });
  const maxMessageCount = 250;
  const [customMessage, setCustomMessage] = useState(
    "Thank you for your order. We sincerely appreciate your trust in our store. Your support means a great deal to our business.",
  );

  const extractBuyerName = (text) => {
    const cleanText = text.replace(/\s+/g, " ").trim();

    if (selectedMarketplace === "meesho") {
      const index = cleanText.indexOf("Customer Address");
      if (index !== -1) {
        const after = cleanText.substring(index + 16).trim();
        const words = after.split(" ");
        if (words.length > 0) return words[0];
      }
    }

    return "Valued Customer";
  };

  const processPDF = async () => {
    setStatus({ msg: "", type: "", show: false });
    if (customMessage?.length > maxMessageCount) {
      return;
    }
    if (!file) {
      setStatus({
        msg: "Please upload a PDF file.",
        type: "error",
        show: true,
      });
      return;
    }

    try {
      setStatus({
        msg: "Processing PDF... Please wait...",
        type: "info",
        show: true,
      });

      const originalBuffer = await file.arrayBuffer();
      const bufferForPdfJs = originalBuffer.slice(0);
      const bufferForPdfLib = originalBuffer.slice(0);

      const pdfReader = await pdfjsLib.getDocument({ data: bufferForPdfJs })
        .promise;

      const pdfDoc = await PDFDocument.load(bufferForPdfLib);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        const pdfPage = await pdfReader.getPage(i + 1);
        const content = await pdfPage.getTextContent();

        let pageText = "";
        content.items.forEach((item) => {
          pageText += item.str + " ";
        });

        const buyerName = extractBuyerName(pageText).toUpperCase();
        const { width } = page.getSize();

        // Cut line
        page.drawLine({
          start: { x: 30, y: 150 },
          end: { x: width - 30, y: 150 },
          thickness: 1,
          color: rgb(0.7, 0.7, 0.7),
          dashArray: [4, 4],
        });

        page.drawText("Hello,", {
          x: 40,
          y: 120,
          size: 16,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });

        page.drawText(buyerName, {
          x: 82,
          y: 120,
          size: 16,
          font,
          color: rgb(0, 0, 0),
        });

        page.drawText(customMessage, {
          x: 40,
          y: 95,
          size: 16,
          font,
          color: rgb(0.3, 0.3, 0.3),
          lineHeight: 18,
          maxWidth: width - 80,
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const formattedDate = getIndianFormattedDate(new Date());
      const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      a.download = `${selectedMarketplace}_${formattedDate}_modified_label_${randomNumber}.pdf`;
      a.click();

      setStatus({
        msg: "Success! Your modified labels are ready.",
        type: "success",
        show: true,
      });
    } catch (err) {
      console.error(err);
      setStatus({
        msg: "Something went wrong while processing.",
        type: "error",
        show: true,
      });
    }
  };
  function setCustomMessageValue(value) {
    setCustomMessage(value);
  }

  return (
    <Box display="flex" justifyContent="center">
      <Paper
        elevation={0}
        sx={{
          p: 5,
          maxWidth: 800,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          gutterBottom
        >
          PDF Label Thank You Generator
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Add personalized thank you messages to your marketplace shipping
          labels
        </Typography>

        {/* Marketplace */}
        <Box display="flex" justifyContent="center" mb={4}>
          <ToggleButtonGroup
            value={selectedMarketplace}
            exclusive
            onChange={(e, value) => value && setSelectedMarketplace(value)}
            sx={{
              "& .MuiToggleButton-root": {
                borderRadius: 0,
                px: 3,
                fontWeight: 500,
                textTransform: "none",
                borderColor: "divider",
                color: "text.secondary",
                "&.Mui-selected": {
                  backgroundColor: "secondary.main",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                },
              },
            }}
          >
            <ToggleButton value="meesho">Meesho</ToggleButton>
            <ToggleButton value="amazon">Amazon</ToggleButton>
            <ToggleButton value="flipkart">Flipkart</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* <Divider sx={{ mb: 4 }} /> */}

        {/* Upload Section */}
        <Box
          onClick={() => document.getElementById("pdfInput").click()}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);

            const droppedFile = e.dataTransfer.files[0];

            if (droppedFile && droppedFile.type === "application/pdf") {
              setFile(droppedFile);
            } else {
              setStatus("Only PDF files are allowed.");
            }
          }}
          sx={{
            border: "2px dashed",
            borderColor: file ? "success.main" : "divider",
            backgroundColor: file
              ? "transparent"
              : isDragging
                ? "action.hover"
                : "transparent",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            mb: 4,
            transition: "all 0.25s ease",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* Hidden Input */}
          <input
            id="pdfInput"
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Icon */}
          <Box mb={2}>
            {file ? (
              <UploadFileIcon sx={{ fontSize: 50, color: "success.main" }} />
            ) : (
              <UploadFileIcon
                sx={{
                  fontSize: 50,
                  color: isDragging ? "primary.main" : "text.secondary",
                }}
              />
            )}
          </Box>

          {/* Text */}
          {file ? (
            <>
              <Typography variant="h6" fontWeight={600}>
                {file.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                File uploaded successfully
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight={600}>
                Drag & Drop your PDF here
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                or click anywhere to upload
              </Typography>
            </>
          )}
        </Box>

        {/* Custom Message */}
        <TextField
          label="Custom Thank You Message"
          multiline
          rows={4}
          fullWidth
          value={customMessage}
          onChange={(e) => setCustomMessageValue(e.target.value)}
        />
        <Typography
          variant="body2"
          color={customMessage?.length > maxMessageCount ? "red" : "green"}
          sx={{ mb: 2, textAlign: "right", mt: 0.2 }}
        >
          {" "}
          {customMessage?.length}{" "}
        </Typography>
        {/* Action */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={processPDF}
          color="secondary"
          sx={{
            py: 1.7,
          }}
        >
          Generate Modified Labels
        </Button>

        {status.show && (
          <Alert sx={{ mt: 3 }} severity={status.type}>
            {status?.msg}
          </Alert>
        )}
        {customMessage?.length > maxMessageCount && (
          <Alert sx={{ mt: 3 }} severity="error">
            Custom message must be less then {maxMessageCount} character !
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
