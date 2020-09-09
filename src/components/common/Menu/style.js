const styles = {
  root: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 99
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 15
  },
  wrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "25%"
  },
  grid: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    textAlign: "center"
  },
  text: {
    fontSize: 25,
    margin: 10,
    cursor: "pointer"
  }
};

export default styles;