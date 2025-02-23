This is a web app for scanning barcodes and fetching event attendee data from a local json file.
Built with [Next.js](https://nextjs.org) using [@yudiel/react-qr-scanner](https://github.com/yudielcurbelo/react-qr-scanner).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to use the app.

I used a node.js server and an HTTPS certificate made using mkcert. 
This allows the camera to be used on devices in the local network.
I ran the server on my laptop and used the app on my phone which is connected to the same network.
