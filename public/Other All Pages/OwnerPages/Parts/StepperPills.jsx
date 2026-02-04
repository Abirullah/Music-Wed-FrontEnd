export default function StepperPills({
  steps = [],
  active = 1,
  completed = {},
  isAllowed = () => true,
  onStepClick = () => {},
}) {
  return (
    <div className="lg:hidden -mx-4 overflow-x-auto px-4 pb-3">
      <div className="flex w-max gap-2">
        {steps.map((step) => {
          const done = Boolean(completed[step.id]);
          const isActive = active === step.id;
          const allowed = isAllowed(step.id);

          const base =
            "flex items-center gap-2 rounded-full border px-3 py-2 text-sm whitespace-nowrap transition";
          const state = done
            ? "bg-green-50 border-green-200 text-green-700"
            : isActive
            ? "bg-black border-black text-white"
            : "bg-white border-gray-200 text-gray-700";

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              disabled={!allowed}
              className={`${base} ${state} ${
                allowed ? "opacity-100" : "opacity-60"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {done ? "✓" : step.id}
              </span>
              <span className="font-medium">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

