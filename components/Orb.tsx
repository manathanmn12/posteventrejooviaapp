export default function Orb({ size = 72 }: { size?: number }) {
  return <div className="orb mx-auto" style={{ width: size, height: size }} aria-hidden />;
}
