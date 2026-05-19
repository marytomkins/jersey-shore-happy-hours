import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Card from "../components/Card";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.workerUrl = `${process.env.PUBLIC_URL}/mapbox-gl-csp-worker.js`;
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyeXRvbWtpbnMiLCJhIjoiY21wYncxc3d1MDA0azJyb3hpMzFvcmszZyJ9.zET9YubEWMZx7u3Ox5_gPQ";

const MappyHours = ({ data, currently }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  /*
   * INITIALIZE MAP
   */
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.03452, 40.14868],
      zoom: 11,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right",
    );
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /*
   * ADD / UPDATE MARKERS
   */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const addMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      data.forEach((item, index) => {
        // Marker element
        const markerEl = document.createElement("div");

        markerEl.className =
          "w-[18px] h-[18px] rounded-full border-[2.5px] border-white shadow-md cursor-pointer bg-[#3677cd]";

        // Popup container
        const popupNode = document.createElement("div");

        // Render React component into popup
        const root = createRoot(popupNode);

        root.render(
          <Card
            bar={item}
            index={index}
            happeningNow={false}
            mapView={true}
            compact
          />,
        );

        const popup = new mapboxgl.Popup({
          offset: 10,
          maxWidth: "300px",
          borderRadius: "16px",
        }).setDOMContent(popupNode);

        const [lat, lng] = item.latlong;

        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    if (map.isStyleLoaded()) {
      addMarkers();
    } else {
      map.once("load", addMarkers);
      return () => map.off("load", addMarkers);
    }
  }, [data]);

  /*
   * UI
   */
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 200px)",
        gap: "12px",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* MAP */}
      <div
        ref={mapContainer}
        style={{
          flex: 1,
          borderRadius: "10px",
          overflow: "hidden",
          minWidth: 0,
        }}
      />

      {/* SIDEBAR */}
      {/* <div
        style={{
          width: "clamp(148px, 30vw, 220px)",
          flexShrink: 0,
          background: "#3677cd",
          color: "white",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 24px rgba(54,119,205,0.4)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.25)",
          }}
          onClick={() => setHappeningNow((v) => !v)}
        >
          <button
            style={{
              position: "relative",
              display: "inline-flex",
              height: "22px",
              width: "40px",
              alignItems: "center",
              borderRadius: "9999px",
              background: happeningNow ? "#ff9b64" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: happeningNow ? "20px" : "3px",
                display: "inline-block",
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                background: "white",
                transition: "left 0.3s",
              }}
            />
          </button>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            Happening Now
          </span>
        </div>

        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.75)",
            textTransform: "uppercase",
          }}
        >
          Towns
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {towns.map((town) => (
            <label
              key={town}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                color: "white",
              }}
            >
              <input
                type="checkbox"
                checked={checkedTowns.has(town)}
                onChange={() => toggleTown(town)}
                className="accent-blue-600"
                style={{
                  accentColor: "white",
                  width: "14px",
                  height: "14px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              {town}
            </label>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "12px",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            onClick={toggleAllTowns}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "white",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "9999px",
              padding: "5px 0",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
            {data.length} location{data.length !== 1 ? "s" : ""} shown
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MappyHours;
