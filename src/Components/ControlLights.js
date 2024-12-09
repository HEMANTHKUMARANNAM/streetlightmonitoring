import React, { useState, useEffect } from "react";
import { database, ref, get, update } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const ControlLights = () => {
  const [lights, setLights] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch lights data from Firebase
  useEffect(() => {
    fetchLights();
  }, []);

  const fetchLights = async () => {
    const lightsRef = ref(database, "streetlights/");
    const snapshot = await get(lightsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setLights(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
    }
  };

  // Handle individual light toggle
  const toggleLight = async (id, isOn) => {
    const lightRef = ref(database, `streetlights/${id}`);
    await update(lightRef, { isOn: !isOn });
    fetchLights(); // Refresh lights after updating
  };

  // Handle "Select All" toggle (on/off all lights except damaged ones)
  const toggleAllLights = async () => {
    setSelectAll((prev) => !prev);
    const updatedLights = lights.map((light) => {
      if (!light.isDamaged) {
        return { ...light, isOn: !selectAll };
      }
      return light; // Do not change the state of damaged lights
    });

    updatedLights.forEach(async (light) => {
      if (!light.isDamaged) {
        const lightRef = ref(database, `streetlights/${light.id}`);
        await update(lightRef, { isOn: light.isOn });
      }
    });

    fetchLights(); // Refresh lights after updating
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Street Light Control</h1>

      {/* "Select All" Button */}
      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn btn-${selectAll ? "danger" : "success"} btn-lg`}
          onClick={toggleAllLights}
          disabled={lights.some((light) => light.isDamaged)}
        >
          <i className={`bi bi-toggle-${selectAll ? "off" : "on"}`}></i>{" "}
          {selectAll ? "Turn Off All" : "Turn On All"}
        </button>
      </div>

      {/* Lights Grid */}
      <div className="row">
        {lights.map((light) => (
          <div className="col-md-3 col-sm-6 mb-4" key={light.id}>
            <div
              className={`card shadow-sm ${
                light.isDamaged
                  ? "border-danger"
                  : light.isOn
                  ? "border-success"
                  : "border-secondary"
              }`}
            >
              <div className="card-body text-center">
                <i
                  className={`bi ${
                    light.isDamaged
                      ? "bi-exclamation-triangle-fill text-danger"
                      : light.isOn
                      ? "bi-lightbulb-fill text-success"
                      : "bi-lightbulb text-secondary"
                  }`}
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="card-title mt-3">{light.name}</h5>
                <p className="card-text">
                  Status:{" "}
                  <strong>
                    {light.isDamaged
                      ? "Damaged"
                      : light.isOn
                      ? "ON"
                      : "OFF"}
                  </strong>
                </p>

                {/* Individual Light Toggle Button with Bulb Icons */}
                <button
                  className={`btn btn-${light.isOn ? "danger" : "primary"} btn-sm`}
                  onClick={() => toggleLight(light.id, light.isOn)}
                  disabled={light.isDamaged}
                >
                  <i
                    className={`bi ${
                      light.isOn ? "bi-lightbulb-off" : "bi-lightbulb-on"
                    }`}
                    style={{ fontSize: "1.5rem" }}
                  ></i>{" "}
                  {light.isDamaged
                    ? "Fix Needed"
                    : light.isOn
                    ? "Turn Off"
                    : "Turn On"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlLights;
