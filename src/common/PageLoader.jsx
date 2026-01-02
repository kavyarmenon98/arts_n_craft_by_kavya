const PageLoader = () => (
    <div style={styles.overlay}>
      <div className="loader" />
    </div>
  );
  
  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.7)",
      zIndex: 9999,
    },
  };
  
  export default PageLoader;
  