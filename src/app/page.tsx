'use client';
import { useEffect, useState } from 'react';

function getDefaultBase() {
  // Priority: saved in browser → env var → localhost
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('API_BASE');
    if (saved) return saved;
  }
  return process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
}

export default function Home() {
  const [base, setBase] = useState<string>(getDefaultBase());
  const [q, setQ] = useState('What is a string bet?');
  const [out, setOut] = useState<any>(null);

  useEffect(() => {
    // keep input in sync with persisted value
    const saved = typeof window !== 'undefined' ? localStorage.getItem('API_BASE') : null;
    if (saved) setBase(saved);
  }, []);

  async function ask() {
    setOut('Asking…');
    try {
      localStorage.setItem('API_BASE', base.trim());
      const resp = await fetch(`${base.replace(/\/$/,'')}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, top_k: 4 })
      });
      const json = await resp.json();
      setOut(json);
    } catch (e: any) {
      setOut({ error: String(e) });
    }
  }

  return (
    <main style={{maxWidth: 780, margin: '2rem auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1 style={{marginBottom: 8}}>PokerRag</h1>
      <p style={{marginTop: 0}}>Ask a poker question. This calls the API <code>/ask</code> endpoint.</p>

      <label style={{display:'block', fontWeight:600, marginTop: 16}}>API Base URL</label>
      <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap: 8}}>
        <input value={base} onChange={e=>setBase(e.target.value)} />
        <button onClick={()=>localStorage.setItem('API_BASE', base.trim())}>Save</button>
      </div>

      <label style={{display:'block', fontWeight:600, marginTop: 16}}>Your question</label>
      <textarea rows={5} value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%'}} />

      <button onClick={ask} style={{marginTop: 12, padding: '8px 14px'}}>Ask</button>

      <h3 style={{marginTop: 20}}>Response</h3>
      <pre style={{background:'#0b0b0b', color:'#eaeaea', padding:12, borderRadius:8, overflow:'auto'}}>
        {out ? JSON.stringify(out, null, 2) : '—'}
      </pre>
    </main>
  );
}
