import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { QRCodeSVG } from "qrcode.react";
import { FaCopy, FaRegCopy } from "react-icons/fa";
export function SelectCharacterNull() {
  const [convertedUrl, setConvertedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  useEffect(() => {
    const convertPathToQuery = (urlString: string) => {
      const url = new URL(urlString);
      const segments = url.pathname.split("/").filter(Boolean);
      if (segments.length === 0) return urlString;

      const lastSegment = segments.length > 0 ? segments.pop()! : "";
      url.pathname = "/" + segments.join("/");
      url.searchParams.set("id", lastSegment);

      return url.toString();
    };

    const currentUrl = window.location.href;
    const newUrl = convertPathToQuery(currentUrl);
    setConvertedUrl(newUrl);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Waiting for opponent</h1>
        <h1>or </h1>
        <h1>You could send this to your friends</h1>
      </div>
      <div className={styles.qrcode}>
        <QRCodeSVG value={convertedUrl} />
      </div>
      <div className={styles.input}>
        <input
          type="text"
          value={convertedUrl}
          placeholder="Choose your name"
          disabled={true}
        />
        <button className={styles.copy} onClick={handleCopy}>
          {copied ? <FaCopy /> : <FaRegCopy />}
        </button>
      </div>
    </div>
  );
}
