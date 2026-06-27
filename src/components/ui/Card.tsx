type CardProps = {
  title: string;
  icon: string;
  description: string;
};

export default function Card({
  title,
  icon,
  description,
}: CardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-4 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-400">
        {description}
      </p>
    </div>
  );
}