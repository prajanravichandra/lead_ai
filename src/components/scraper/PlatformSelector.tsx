type PlatformSelectorProps = {
  value: "google_maps" | "instagram";
  onChange?: (value: "google_maps" | "instagram") => void;
};

const PlatformSelector = ({
  value,
  onChange = () => undefined,
}: PlatformSelectorProps) => {
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-1 text-sm font-semibold text-slate-700">
      {[
        { key: "google_maps", label: "Google Maps" },
        { key: "instagram", label: "Instagram" },
      ].map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() =>
            onChange(option.key as "google_maps" | "instagram")
          }
          className={`rounded-full px-4 py-2 transition ${
            value === option.key
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default PlatformSelector;

