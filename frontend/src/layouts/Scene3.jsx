function Scene3()
{
    return(
        <div stype={styles.wrapper}>
            <h1>Scene3</h1>
        </div>
    )
};

const styles = {
  wrapper: {
    backgroundColor: "lightgreen", 
    
    width: "100%", 
    height: "100vh",
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Scene3;