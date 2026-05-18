import { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { towns } from "../data/filters";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyeXRvbWtpbnMiLCJhIjoiY21wYnB1ejVtMDRhMzMyb2xpeHlvd2pkNiJ9.R7dq4y_hbY7cdDMvOFqBcA";

const MappyHours = ({ data, currently }) => {
  "use no memo";

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const [mapReady, setMapReady] = useState(false);
  const [checkedTowns, setCheckedTowns] = useState(new Set(towns));
  const [happeningNow, setHappeningNow] = useState(false);

  /*
   * FILTERED DATA
   */
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const curr = currently.some((curr) => curr.name === item.name);
      if (!Array.isArray(item.latlong) || item.latlong.length !== 2)
        return false;
      if (!checkedTowns.has(item.town)) return false;
      if (happeningNow && !curr) return false;
      return true;
    });
  }, [data, currently, checkedTowns, happeningNow]);

  /*
   * INITIALIZE MAP
   */
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
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
    map.on("load", () => {
      map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
      map.setConfigProperty("basemap", "showTransitLabels", false);
      setMapReady(true);
    });
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
    if (!map || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filtered.forEach((item) => {
      const el = document.createElement("div");
      el.style.width = "18px";
      el.style.height = "18px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#3677cd";
      el.style.border = "2.5px solid #ffffff";
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      el.style.cursor = "pointer";

      const dayTextFormatted = item.dayText
        ? item.dayText.replace(/\//g, "<br/>")
        : "";
      const descFormatted = item.description
        ? item.description.replace(/\//g, " &middot; ")
        : "";

      const popup = new mapboxgl.Popup({
        offset: 25,
        maxWidth: "240px",
      }).setHTML(`
        <div style="font-family:sans-serif;padding:4px;">
          <strong style="font-size:13px;color:#3677cd;">${item.name}</strong>
          <div style="font-size:11px;color:#888;margin:2px 0 5px;">${item.town}</div>
          ${dayTextFormatted ? `<div style="font-size:11px;margin-bottom:4px;line-height:1.5;">${dayTextFormatted}</div>` : ""}
          ${descFormatted ? `<div style="font-size:10px;color:#555;margin-bottom:5px;">${descFormatted}</div>` : ""}
          ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" style="font-size:11px;color:#3677cd;text-decoration:underline;">View Menu →</a>` : ""}
        </div>
      `);

      const [lat, lng] = item.latlong;
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [filtered, mapReady]);

  /*
   * TOGGLE TOWN / SELECT ALL
   */
  function toggleTown(town) {
    setCheckedTowns((prev) => {
      const next = new Set(prev);
      if (next.has(town)) next.delete(town);
      else next.add(town);
      return next;
    });
  }

  function toggleAllTowns() {
    setCheckedTowns(
      checkedTowns.size === towns.length ? new Set() : new Set(towns),
    );
  }

  const allSelected = checkedTowns.size === towns.length;

  /*
   * UI
   */
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 130px)",
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
      <div
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
        {/* Happening Now */}
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

        {/* Filter by Town header + toggle all */}
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

        {/* Town checkboxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {towns.map((town) => (
            <label
              key={town}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                color: "white",
              }}
            >
              <input
                type="checkbox"
                checked={checkedTowns.has(town)}
                onChange={() => toggleTown(town)}
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

        {/* Count + toggle all */}
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
            {filtered.length} location{filtered.length !== 1 ? "s" : ""} shown
          </div>
        </div>
      </div>
    </div>
  );
};

export default MappyHours;
