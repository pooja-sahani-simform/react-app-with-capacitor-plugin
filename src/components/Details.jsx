import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

const DeviceDetails = () => {
  const [photo, setPhoto] = useState(null);

  const openCamera = async () => {
    if (Capacitor.getPlatform() === "web") {
      alert("Camera is not available on the Web.");
      return;
    }

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      console.log("Captured photo:", image.dataUrl);
      setPhoto(image.dataUrl);
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Camera Demo</h1>
      <button
        onClick={openCamera}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open Camera
      </button>

      {photo && (
        <div style={{ marginTop: "20px" }}>
          <h3>Captured Photo:</h3>
          <img
            src={photo}
            alt="Captured"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default DeviceDetails;
