export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`card glow p-5 ${className}`}>{children}</div>;
}
