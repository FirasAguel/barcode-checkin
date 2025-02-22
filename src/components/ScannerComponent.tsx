"use client"; // Ensures this component only runs on the client

import { useState } from "react";
import {
  Scanner,
} from "@yudiel/react-qr-scanner";

const styles = {
  container: {
    width: 400,
    margin: "auto",
    display:"flex",
    "justify-content": "center"
  },
  controls: {
    marginBottom: 8,
  },
};

export default function BarcodeScanner({ onScan }) {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [pause, setPause] = useState(false);

  const handleScan = async (data: string) => {
    setPause(true); // Pause scanning to prevent duplicate reads
    onScan(data);
    setTimeout(() => setPause(false), 2000); // Resume scanning after 2 seconds
  };

  return (
    <div style={styles.container}>
      {/* Device Selection 
      <div style={styles.controls}>
        <select onChange={(e) => setDeviceId(e.target.value)}>
          <option value={undefined}>Select a device</option>
          {devices.map((device, index) => (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
      */}

      {/* Scanner */}
      <Scanner
        formats={["qr_code", "code_128", "ean_13", "upc_a", "code_39"]} // Supports various barcode types
        constraints={{ deviceId }}
        onScan={(detectedCodes) => handleScan(detectedCodes[0]?.rawValue)}
        onError={(error) => console.error("Scanner Error:", error)}
        styles={{ container: { height: "400px", width: "350px" } }}
        components={{
          audio: false,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
        }}
        allowMultiple={false} // We only need one scan at a time
        scanDelay={2000} // Delay to prevent duplicate scans
        paused={pause}
      />
    </div>
  );
}
