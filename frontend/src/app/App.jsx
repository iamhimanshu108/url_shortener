import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  async function fetchUrls() {
    const response = await axios.get("/api/url");

    const responseData = response.data;

    // The API returns the URL documents directly in `data` as an array.
    setUrls(Array.isArray(responseData.data) ? responseData.data : []);
  }

  async function createShortUrl() {
    const response = await axios.post("/api/url", {
      url: inputValue,
    })
    setCurrentUrl({
      originalUrl: response.data.data.originalUrl,
      shortCode: response.data.data.shortCode,
    });
    await fetchUrls();
  }

  async function deleteUrl(id) {
    await axios.delete(`/api/url/${id}`);
    setUrls((currentUrls) => currentUrls.filter((url) => url._id !== id));
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="p-40 flex flex-col gap-4">
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2 *:flex gap-2 items-center  flex justify-between">
        <input
          type="text"
          className="w-full p-2 border border-neutral-200 rounded"
          placeholder="Enter URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="p-2 rounded bg-orange-400 text-white cursor-pointer"
          onClick={createShortUrl}
        >
          Shorten
        </button>
      </div>
      <div className="w-full max-w-4xl p-2 flex flex-col gap-2">
        {urls.map((url) => {
          return (
            <div key={url._id} className="border border-neutral-200 p-2 flex justify-evenly gap-4 items-center">
              <a
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
                rel="noreferrer"
              >
                {url.shortCode}
              </a>
              <p className="truncate">{url.originalUrl}</p>
              <p>{url.clicks}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-2 rounded bg-orange-400 text-white cursor-pointer"
                >
                  COPY
                </button>
                <button
                  type="button"
                  className="p-2 rounded bg-orange-400 text-white cursor-pointer"
                   onClick={() => deleteUrl(url._id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
