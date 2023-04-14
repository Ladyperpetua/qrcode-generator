import { useState } from "react";
import "./app.css";
import QRCode from "qrcode";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function GenerateQRCode() {
  const [text, setText] = useState("");
  const [src, setSrc] = useState("");

  const generateQRCode = () => {
    if (!text) return;
    QRCode.toDataURL(text).then(setSrc);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-blue-900">
      <div className="grid space-y-4 w-[300px] border place-items-center rounded-2xl bg-blue-500 p-4">
        {src && text ? <img src={src} alt={`QRCode for ${text}`} /> : null}
        <input
          className="h-8 w-full"
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to generate QRCode"
        />
        <button
          className="border rounded-md bg-blue-300 p-2"
          onClick={generateQRCode}
        >
          Generate QRCode
        </button>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Layout() {
  return (
    <section>
      <Outlet />
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GenerateQRCode />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
