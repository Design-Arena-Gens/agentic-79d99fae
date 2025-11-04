export const metadata = {
  title: 'Clima - Nova York',
  description: 'Vai chover hoje em Nova York?'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body style={{
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
        padding: '2rem',
        maxWidth: '720px',
        margin: '0 auto',
        lineHeight: 1.6
      }}>
        {children}
      </body>
    </html>
  );
}
