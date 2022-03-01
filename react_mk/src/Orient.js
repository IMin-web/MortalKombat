import { useState, useEffect } from "react";

export default function Orient(props) {
  const [trueOrient, setTrueOrient] = useState(false);
  var mql = window.matchMedia("(orientation: portrait)");

  useEffect(() => {
    if (mql.matches) {
      mql.addListener(function (m) {
        !m.matches ? setTrueOrient(true) : setTrueOrient(false);
      });
    } else {
      setTrueOrient(true);
      mql.addListener(function (m) {
        !m.matches ? setTrueOrient(true) : setTrueOrient(false);
      });
    }
  }, []);

  return (
    <>
      {!trueOrient ? (
        <div className="orient">
          <p>ROTATE</p> 
          <p> YOUR DEVICE</p>
        </div>
      ) : null}
    </>
  );
}
