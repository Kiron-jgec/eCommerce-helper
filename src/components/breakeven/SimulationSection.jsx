import { Card, Slider, Typography } from "@mui/material";

const SimulationSection = ({ values, setValues }) => {
  const handleSlider = (name) => (e, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card
     elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider"
      }}
    >
      <Typography variant="h6" mb={2}>
        Scenario Simulation
      </Typography>

      <Typography gutterBottom>Selling Price</Typography>
      <Slider
        value={values.sellingPrice}
        min={0}
        max={2000}
        onChange={handleSlider("sellingPrice")}
      />

      <Typography gutterBottom mt={1}>
        Ad Cost
      </Typography>
      <Slider
        value={values.adCost}
        min={0}
        max={500}
        onChange={handleSlider("adCost")}
      />
    </Card>
  );
};

export default SimulationSection;