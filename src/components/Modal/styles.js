const styles = (theme) => ({
  modalStyle: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 4),
    outline: "none",
  },
  header: {
    backgroundColor: theme.color.primary,
    color: theme.color.textColor,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    spacing: theme.spacing(2)
  },
  title: {
    color: theme.color.textColor,
    padding: theme.spacing(2),
    fontWeight:'700',
    textTransform:'capitalize'
  },
  content:{
    padding: theme.spacing(2)
  },
  icon:{
    marginRight:10,
    cursor:'pointer',
    fontSize:24
  }
});
export default styles;
