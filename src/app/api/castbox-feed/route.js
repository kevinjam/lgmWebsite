export async function GET() {
    const response = await fetch('https://rss.castbox.fm/everest/e57bc6de67a146ab89a245ae0fda60a5.xml');
    const text = await response.text();
    return new Response(text, { headers: { 'Content-Type': 'text/xml' } });
  }