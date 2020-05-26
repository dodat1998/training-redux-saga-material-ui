const styles = (theme) => ({
  drawPaper: {
    width: 240,
    zIndex: 10,
    minHeight: "calc(100vh - 60px)",
    position: "relative",
  },
  menuLink: {
    textDecoration: "none",
    color: theme.color.defaultTextColor,
  },
  activeMenuLink: {
    "&>div": {
      backgroundColor: theme.color.hoverColor,
    },
  },
});

export default styles;
