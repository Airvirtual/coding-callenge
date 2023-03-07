import { EqualizerOutlined, TocOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { SetStateAction } from "react";
const HeaderComponent = ({
  title,
  subTitle,
  setIsChart,
  isChart,
  isDisplayChart,
}: {
  title: string;
  subTitle: string;
  setIsChart?: (value: SetStateAction<boolean>) => void;
  isChart?: boolean;
  isDisplayChart: boolean;
}) => {
  return (
    <Grid
      container
      sx={{
        background: (theme) => theme.palette.primary.main,
        pl: 2,
        pr: 2,
        m: -1,
      }}
    >
      <Grid xs={10}>
        <Typography variant="h6" sx={{ color: "#fff", lineHeight: 1.45 }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ color: "#fff", fontSize: 14 }}
        >
          {subTitle}
        </Typography>
      </Grid>
      <Grid
        xs={2}
        container
        direction="column"
        alignItems="end"
        justifyContent="center"
      >
        {isDisplayChart && (
          <div style={{ display: "flex", padding: 0 }}>
            <div
              onClick={() => {
                setIsChart && setIsChart(false);
              }}
            >
              <TocOutlined
                sx={{ color: isChart ? "rgba(0,0,0,.3)" : "#fff" }}
              />
            </div>
            <div
              onClick={() => {
                setIsChart && setIsChart(true);
              }}
            >
              <EqualizerOutlined
                sx={{ color: isChart ? "#fff" : "rgba(0,0,0,.3)" }}
              />
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default HeaderComponent;
