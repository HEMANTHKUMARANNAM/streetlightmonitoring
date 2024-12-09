import React, { useState, useEffect } from "react";
import { database, ref, get } from "../firebase";

const DamagedLights = () => {
  const [damagedLights, setDamagedLights] = useState([]);

  useEffect(() => {
    fetchDamagedLights();
  }, []);

  const fetchDamagedLights = async () => {
    const lightsRef = ref(database, "streetlights/");
    const snapshot = await get(lightsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const damaged = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((light) => light.isDamaged);
      setDamagedLights(damaged);
    }
  };

  return (
    <div className="py-4">
      <h1>Damaged Lights</h1>
      {damagedLights.length > 0 ? (
        <ul className="list-group">
          {damagedLights.map((light) => (
            <li key={light.id} className="list-group-item">
              <i className="bi bi-exclamation-triangle-fill text-danger"></i>{" "}
              {light.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No damaged lights found.</p>
      )}
    </div>
  );
};

export default DamagedLights;
