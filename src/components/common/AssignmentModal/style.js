const styles = {
  root: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 99
  },
  wrapper: {
    width: "50%",
    height: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: 50
  },
  title: {
    fontWeight: 900,
    fontSize: 35
  },
  form: {
    minWidth: "100%"
  },
  btnWrapper: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 25
  },
  button: {
    minWidth: "35%",
    marginRight: 15
  }
};

export default styles;
