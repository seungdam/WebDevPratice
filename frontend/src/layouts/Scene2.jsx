function Scene2()
{
    return(
        <div stype={styles.wrapper}>
            <h1>Scene2</h1>
        </div>
    )
};

const styles = {
  wrapper: {
    backgroundColor: "lightblue", 
    
    width: "100%", 
    height: "100vh",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Scene2;