import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";
import PrintIcon from "@mui/icons-material/Print";

const LABELS_PER_PAGE = 20;

export default function InventoryLabelGenerator() {
  const printRef = useRef(null);

  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    skuId: "",
    productId: "",
    color: "",
  });

  const labels = useMemo(() => {
    return Array.from({ length: LABELS_PER_PAGE });
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* PRINT CSS */}
      <style>
        {`
          @page {
            size: A4 portrait;
            margin: 5mm;
          }

          @media print {

            html,
            body {
              width: 210mm;
              height: 297mm;
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
              background: white;
            }

            body * {
              visibility: hidden;
            }

            #print-area,
            #print-area * {
              visibility: visible;
            }

            #print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 200mm;
              height: 287mm;
              margin: 0;
              padding: 0;
              overflow: hidden !important;
              background: white;
            }

            .label-card {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={4} className="no-print">
            <Card
              sx={{
                borderRadius: 1,
                position: "sticky",
                top: 100,
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Inventory Label Generator
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    label="Product Name"
                    value={form.productName}
                    onChange={handleChange("productName")}
                    fullWidth
                  />
                   <TextField
                    label="Product ID"
                    value={form.productId}
                    onChange={handleChange("productId")}
                    fullWidth
                  />

                  <TextField
                    label="SKU ID"
                    value={form.skuId}
                    onChange={handleChange("skuId")}
                    fullWidth
                  />

                  <TextField
                    label="Product Color"
                    value={form.color}
                    onChange={handleChange("color")}
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadIcon />}
                    sx={{ height: 50 }}
                  >
                    Upload Product Image

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    sx={{ height: 50 }}
                  >
                    Print Labels
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                width: "210mm",
                height: "297mm",
                overflow: "hidden",
                mx: "auto",
                p: "5mm",
                background: "#fff",
                boxSizing: "border-box",
              }}
            >
              <Box
                id="print-area"
                ref={printRef}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(5, 1fr)",
                  gap: "2.5mm",
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
              >
                {labels.map((_, index) => (
                  <Box
                    key={index}
                    className="label-card"
                    sx={{
                      border: "1px solid #cfcfcf",
                      borderRadius: 1,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                      background: "#fff",
                      minHeight: 0,
                    }}
                  >
                    {/* IMAGE */}
                    <Box
                      sx={{
                        height: "24mm",
                        borderRadius: 1,
                        overflow: "hidden",
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                        flexShrink: 0,
                      }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt="product"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          No Image
                        </Typography>
                      )}
                    </Box>

                    {/* PRODUCT NAME */}
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      textAlign="center"
                      sx={{
                        lineHeight: 1.1,
                        fontSize: "12px",
                        mb: 0.5,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "20px",
                      }}
                    >
                      {form.productName || "Product Name"}
                    </Typography>

                    {/* DETAILS */}
                    <Box mt="auto">
                       <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          lineHeight: 1.2,
                          fontSize: "10px",
                          mb:0.5
                        }}
                      >
                       <b> Product Id :</b> {form.productId || "1001"}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          lineHeight: 1.2,
                          fontSize: "10px",
                          mb:0.5
                        }}
                      >
                        <b>SKU :</b> {form.skuId || "SKU001"}
                      </Typography>

                     

                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          lineHeight: 1.2,
                          fontSize: "10px",
                          mb:0.5
                        }}
                      >
                       <b> Color : </b>{form.color || "Black"}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}