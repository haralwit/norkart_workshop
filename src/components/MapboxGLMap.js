import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100%",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

const mapstyle = {
  position: "absolute",
  background: "white",
  zIndex: 1,
  padding: 10,
};

const onClickMapStyle = () => {

}


const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
        center: [10.4326436, 63.4111865],
        zoom: 13
      
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      
      var layers = document.getElementById("mapstylemenu");
      var inputs = layers.getElementsByTagName("input");
      var marker = new mapboxgl.Marker()
      .setLngLat([10.4326436, 63.4111865]).addTo(map);

    };
    
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  const switchLayer = (layer) => {
    var layer_id = layer.target.id;
    map.setStyle("mapbox://styles/mapbox/" + layer_id)
  }

  return <div>
      <div ref={el => (mapContainer.current = el)} style={styles} />
      <div id="mapstylemenu" style = {mapstyle}>
        <input id="streets-v11" type="radio" name="rtoggle" value="streets" onClick={switchLayer}/>
        <label for="streets-v11">streets</label>
        <input id="light-v10" type="radio" name="rtoggle" value="light" onClick={switchLayer}/>
        <label for="light-v10">light</label>
        <input id="dark-v10" type="radio" name="rtoggle" value="dark" onClick={switchLayer}/>
        <label for="dark-v10">dark</label>
        <input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors" onClick={switchLayer}/>
        <label for="outdoors-v11">outdoors</label>
        <input id="satellite-v9" type="radio" name="rtoggle" value="satellite" onClick={switchLayer}/>
        <label for="satellite-v9">satellite</label>
      </div>
    </div>
};

export default MapboxGLMap;