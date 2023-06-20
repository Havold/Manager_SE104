import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  fontFamily: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      main: "#2E4958",
      90: "#C3E8FF",
      80: "#78D1FF",
    },
    secondary: {
      main: "#266E96",
    },
    text_neutral: {
      main: "#4A4553",
      white: "#fff",
    },
    battery: {
      100: "#25cc40",
      50: "#9fdf54",
      25: "#f4f458",
      0: "#ec3e3f",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          width: "100%",
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: "transparent",
        },
      },
      variants: [
        {
          props: { variant: "primary filled" },
          style: {
            width: "auto",
            height: "auto",
            minHeight: 0,
            minWidth: 0,
            color: "#FFFFFF",
            background: "#2E4958",
            ":hover": {
              background: "#242D3F",
            },
            ":focus": {
              background: "#242D3F",
              borderColor: "#2E4958",
            },
            ":disabled": {
              color: "#ffffff",
              background: "#9D9AA4",
            },
          },
        },
        {
          props: { variant: "primary link" },
          style: {
            width: "auto",
            height: "auto",
            minHeight: 0,
            minWidth: 0,
            color: "#FFAB00",
            background: "transparent",
            ":hover": {
              color: "#CC8900",
            },
            ":focus": {
              color: "#CC8900",
            },
            ":disabled": {
              color: "#ffffff",
              background: "#9D9AA4",
            },
          },
        },
        {
          props: { size: "small" },
          style: {
            width: 97,
            height: 32,
            fontSize: 12,
            fontWeight: 600,
          },
        },
        {
          props: { size: "medium" },
          style: {
            width: 137,
            height: 44,
            fontSize: 14,
            fontWeight: 700,
          },
        },
        {
          props: { size: "large" },
          style: {
            width: 168,
            height: 54,
            fontSize: 16,
            fontWeight: 700,
          },
        },
      ],
    },
  },
});

export default theme;
