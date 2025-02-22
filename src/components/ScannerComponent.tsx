"use client"; // Ensures this component only runs on the client

import { useState } from "react";
import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";

const styles = {
  container: {
    width: 400,
    margin: "auto",
  },
  controls: {
    marginBottom: 8,
  },
};

export default function BarcodeScanner({ onScan }) {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [tracker, setTracker] = useState<string | undefined>("centerText");
  const [pause, setPause] = useState(false);
  const devices = useDevices();

  function getTracker() {
    switch (tracker) {
      case "outline":
        return outline;
      case "boundingBox":
        return boundingBox;
      case "centerText":
        return centerText;
      default:
        return undefined;
    }
  }

  const handleScan = async (data: string) => {
    setPause(true); // Pause scanning to prevent duplicate reads
    onScan(data);
    setTimeout(() => setPause(false), 2000); // Resume scanning after 2 seconds
  };

  return (
    <div style={styles.container}>
      {/* Device Selection */}
      <div style={styles.controls}>
        <select onChange={(e) => setDeviceId(e.target.value)}>
          <option value={undefined}>Select a device</option>
          {devices.map((device, index) => (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
        <select
          style={{ marginLeft: 5 }}
          onChange={(e) => setTracker(e.target.value)}
        >
          <option value="centerText">Center Text</option>
          <option value="outline">Outline</option>
          <option value="boundingBox">Bounding Box</option>
          <option value={undefined}>No Tracker</option>
        </select>
      </div>

      {/* Scanner */}
      <Scanner
        formats={["qr_code", "code_128", "ean_13", "upc_a", "code_39"]} // Supports various barcode types
        constraints={{ deviceId }}
        onScan={(detectedCodes) => handleScan(detectedCodes[0]?.rawValue)}
        onError={(error) => console.error("Scanner Error:", error)}
        styles={{ container: { height: "400px", width: "350px" } }}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: getTracker(),
        }}
        allowMultiple={false} // We only need one scan at a time
        scanDelay={2000} // Delay to prevent duplicate scans
        paused={pause}
      />
    </div>
  );
}
