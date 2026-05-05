import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
const SIZE = 800; // Output 1:1 size
const variations = [
  "whiteBorder",
  "blackBorder",
  "rounded",
  "circle",
  "shadow",
  "grayscale",
  "rotate",
  "sticker",
  "zoom",
  "plain",
  "greenBorder",
  "blueBorder",
];

export default function ImageGenerator() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
    });
  };

  const drawBase = (ctx, img) => {
    const min = Math.min(img.width, img.height);
    const sx = (img.width - min) / 2;
    const sy = (img.height - min) / 2;

    ctx.drawImage(img, sx, sy, min, min, 0, 0, SIZE, SIZE);
  };

  const createCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    return canvas;
  };

  const generateImages = async (file) => {
    setLoading(true);
    const img = await loadImage(file);
    const outputs = [];

    for (let type of variations) {
      const canvas = createCanvas();
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, SIZE, SIZE);

      switch (type) {
        case "whiteBorder":
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, SIZE, SIZE);
          drawBase(ctx, img);
          ctx.lineWidth = 20;
          ctx.strokeStyle = "#fff";
          ctx.strokeRect(10, 10, SIZE - 20, SIZE - 20);
          break;

        case "blackBorder":
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, SIZE, SIZE);
          ctx.drawImage(img, 20, 20, SIZE - 40, SIZE - 40);
          break;

        case "rounded":
          ctx.beginPath();
          ctx.moveTo(50, 0);
          ctx.lineTo(SIZE - 50, 0);
          ctx.quadraticCurveTo(SIZE, 0, SIZE, 50);
          ctx.lineTo(SIZE, SIZE - 50);
          ctx.quadraticCurveTo(SIZE, SIZE, SIZE - 50, SIZE);
          ctx.lineTo(50, SIZE);
          ctx.quadraticCurveTo(0, SIZE, 0, SIZE - 50);
          ctx.lineTo(0, 50);
          ctx.quadraticCurveTo(0, 0, 50, 0);
          ctx.clip();
          drawBase(ctx, img);
          break;

        case "circle":
          ctx.beginPath();
          ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
          ctx.clip();
          drawBase(ctx, img);
          break;

        case "shadow":
          ctx.shadowColor = "rgba(0,0,0,0.4)";
          ctx.shadowBlur = 30;
          ctx.shadowOffsetY = 10;
          drawBase(ctx, img);
          break;

        case "grayscale":
          ctx.filter = "grayscale(100%)";
          drawBase(ctx, img);
          break;

        case "rotate":
          ctx.translate(SIZE / 2, SIZE / 2);
          ctx.rotate((5 * Math.PI) / 180);
          ctx.drawImage(img, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
          break;

        case "sticker":
          drawBase(ctx, img);
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(SIZE - 80, 80, 50, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "bold 24px Arial";
          ctx.fillText("SALE", SIZE - 110, 90);
          break;

        case "zoom":
          ctx.drawImage(img, 100, 100, SIZE - 200, SIZE - 200);
          break;

        case "plain":
          drawBase(ctx, img);
          break;

        case "greenBorder":
          ctx.fillStyle = "#0f0";
          ctx.fillRect(0, 0, SIZE, SIZE);
          drawBase(ctx, img);
          ctx.lineWidth = 10;
          ctx.strokeStyle = "#0f0";
          ctx.strokeRect(10, 10, SIZE - 20, SIZE - 20);
          break;

        case "blueBorder":
          ctx.fillStyle = "#00f";
          ctx.fillRect(0, 0, SIZE, SIZE);
          drawBase(ctx, img);
          ctx.lineWidth = 10;
          ctx.strokeStyle = "#00f";
          ctx.strokeRect(10, 10, SIZE - 20, SIZE - 20);
          break;

        default:
          drawBase(ctx, img);
      }

      outputs.push({
        name: `${type}.png`,
        url: canvas.toDataURL("image/png"),
      });
    }

    setImages(outputs);
    setLoading(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) generateImages(file);
  };

  const downloadAll = async () => {
    const zip = new JSZip();

    images.forEach((img, i) => {
      const base64 = img.url.split(",")[1];
      zip.file(img.name, base64, { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "images.zip");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 0 }}>
<Typography variant="h6" fontWeight={600}>
        Image Variation Generator
      </Typography>
          <Typography variant="body2"  mb={3}>
        Upload an image to create multiple variations with different effects.
                  </Typography>
      <Paper
        sx={{
          p: 3,
          mt: 2,
          boxShadow: 0,
          pb: 3,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom:1, borderColor:"divider",
            mb: 3,pb:3,
          }}
        >
          <Button variant="contained" component="label" color="secondary">
            <FileUploadIcon sx={{ mr: 1 }} />
            Upload Image
            <input hidden type="file" onChange={handleUpload} />
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={downloadAll}
            color="secondary"
            disabled={images.length === 0}
          >
            <DownloadIcon sx={{ mr: 1 }} /> Download All
          </Button>
        </Box>

        {images.length > 0 && (
          <>
            <Grid container spacing={3} mt={2}>
              {images.map((img, index) => (
                <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                    sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
                  >
                    <CardMedia
                      component="img"
                      image={img.url}
                      sx={{ aspectRatio: "1/1" }}
                    />
                  </Card>
                  <Button
                    fullWidth
                    onClick={() => saveAs(img.url, img.name)}
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 1.5 }}
                  >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {images.length === 0 && !loading && (
          <Box
            sx={{
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              sx={{ mt: 5 }}
            >
              Upload an image to see variations.
            </Typography>
          </Box>
        )}

        {loading && (
          <Box
            sx={{
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              sx={{ mt: 5 }}
            >
              <CircularProgress size={20} sx={{ mr: 1 }} /> Generating
              variations, please wait...
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
