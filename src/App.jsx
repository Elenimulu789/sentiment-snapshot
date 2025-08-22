import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function analyzeFake(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // simulate a call
    setResult({
      sentiment: "positive",
      confidence: { positive: 0.92, neutral: 0.06, negative: 0.02 },
    });
    setLoading(false);
  }

  return (
    <main className="container">
      <h1>Sentiment Snapshot</h1>
      <p>
        This tool analyzes the text you provide and estimates whether the overall
        sentiment is <em>positive</em>, <em>neutral</em>, or <em>negative</em>.
      </p>

      <form onSubmit={analyzeFake}>
        <textarea
          id="t"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={{ marginTop: 12 }}>
          <button disabled={!text.trim() || loading} type="submit">
            {loading ? "Analyzing…" : "Analyze"}
          </button>
        </div>
      </form>

      {result && (
        <section className="result" aria-live="polite" style={{ textAlign: "left" }}>
          <h2 style={{ marginTop: 0 }}>Overall: {result.sentiment}</h2>
          <div>Positive: {result.confidence.positive.toFixed(2)}</div>
          <div>Neutral: {result.confidence.neutral.toFixed(2)}</div>
          <div>Negative: {result.confidence.negative.toFixed(2)}</div>
        </section>
      )}
    </main>
  );
}

