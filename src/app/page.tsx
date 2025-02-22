"use client";

import { useState, useEffect } from "react";
import BarcodeScanner from "@/components/ScannerComponent";

export default function ScannerPage() {
  const [attendees, setAttendees] = useState([]);
  const [scannedCode, setScannedCode] = useState("");
  const [attendee, setAttendee] = useState(null);
  const [manualInput, setManualInput] = useState("");

  // Load attendee data from JSON (client-side)
  useEffect(() => {
    fetch("/attendees.json")
      .then((res) => res.json())
      .then((data) => setAttendees(data))
      .catch((err) => console.error("Failed to load attendees:", err));
  }, []);

  // Lookup function
  const lookupAttendee = (barcode: string) => {
    const found = attendees.find((a) => a.barcode === barcode);
    setAttendee(found || null);
  };

  // Handle barcode scan
  useEffect(() => {
    if (scannedCode) lookupAttendee(scannedCode);
  }, [scannedCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Event Check-in</h1>

      {/* Scanner Component */}
      <BarcodeScanner onScan={setScannedCode} />

      {/* Manual Input */}
      <input
        type="text"
        placeholder="Enter barcode manually"
        className="w-full p-2 border rounded mt-4"
        value={manualInput}
        onChange={(e) => setManualInput(e.target.value)}
      />
      <button
        onClick={() => lookupAttendee(manualInput)}
        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
      >
        Lookup
      </button>

      {/* Attendee Info */}
      {attendee ? (
        <div className="mt-4 p-4 bg-green-200 rounded">
          <h2 className="text-lg font-bold">Attendee Found</h2>
          <p><strong>Name:</strong> {attendee.name}</p>
          <p><strong>Table:</strong> {attendee.table}</p>
          <p><strong>Status:</strong> {attendee.status}</p>
        </div>
      ) : scannedCode && (
        <div className="mt-4 p-4 bg-red-200 rounded">
          <h2 className="text-lg font-bold">Attendee Not Found</h2>
        </div>
      )}
    </div>
  );
}
