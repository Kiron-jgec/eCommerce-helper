import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
  Paper
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

export default function MeeshoImageOptimizer() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!image || !category) return alert("Select category & image");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/generate", formData);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          Meesho Shipping Optimizer
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          mb={4}
        >
          Generate optimized images to discover lowest shipping charges
        </Typography>

        {/* Input Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            mb: 5
          }}
        >
          <Grid container spacing={3}>
            {/* Category Select */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={category}
                  label="Select Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="kitchen">Kitchen</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="beauty">Beauty</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ height: "56px" }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>

            {preview && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                  }}
                >
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      maxHeight: 200,
                      borderRadius: 12,
                      objectFit: "contain"
                    }}
                  />
                </Box>
              </Grid>
            )}

            {/* Generate Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleGenerate}
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold"
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Generate Optimized Images"
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Section */}
        {results.length > 0 && (
          <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Generation Results
            </Typography>

            <Grid container spacing={3}>
              {results.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      height="240"
                      sx={{ objectFit: "contain", p: 2 }}
                    />

                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography fontWeight="bold">
                          Shipping Rate
                        </Typography>
                        <Chip
                          label={`₹${item.shippingRate}`}
                          color={index === 0 ? "success" : "primary"}
                        />
                      </Box>

                      {index === 0 && (
                        <Chip
                          label="Lowest Shipping"
                          color="success"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}