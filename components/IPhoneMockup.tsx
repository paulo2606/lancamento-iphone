export default function IPhoneMockup() {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Glow behind phone */}
      <div
        className="absolute w-[280px] h-[480px] rounded-[50px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "scale(1.2)",
        }}
      />

      {/* Phone body */}
      <div
        className="relative w-[240px] h-[490px] rounded-[44px]"
        style={{
          background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Side button - right volume up */}
        <div
          className="absolute -right-[3px] top-[110px] w-[3px] h-[36px] rounded-r-full"
          style={{ background: "linear-gradient(to right, #2a2a2e, #3a3a3e)" }}
        />
        {/* Side button - right volume down */}
        <div
          className="absolute -right-[3px] top-[158px] w-[3px] h-[36px] rounded-r-full"
          style={{ background: "linear-gradient(to right, #2a2a2e, #3a3a3e)" }}
        />
        {/* Side button - left power */}
        <div
          className="absolute -left-[3px] top-[130px] w-[3px] h-[56px] rounded-l-full"
          style={{ background: "linear-gradient(to left, #2a2a2e, #3a3a3e)" }}
        />

        {/* Screen bezel */}
        <div className="absolute inset-[6px] rounded-[38px] overflow-hidden bg-black">
          {/* Screen content */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0a0a1a 100%)",
            }}
          >
            {/* Ambient glow on screen */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 30%, rgba(139,92,246,0.3) 0%, transparent 60%)",
              }}
            />

            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[25px] bg-black rounded-full z-10" />

            {/* Screen UI elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pt-10">
              {/* Clock */}
              <p className="text-white/40 text-[10px] tracking-widest uppercase mt-2">
                09:41
              </p>
              <p className="text-white font-bold text-[32px] leading-none tracking-tight">
                iPhone 18
              </p>
              <p className="text-white/40 text-[9px] tracking-widest text-center">
                ALÉM DO QUE VOCÊ IMAGINA
              </p>

              {/* Fake app grid */}
              <div className="grid grid-cols-4 gap-2 mt-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${
                        [
                          "#6366f1,#8b5cf6",
                          "#06b6d4,#3b82f6",
                          "#ec4899,#f43f5e",
                          "#10b981,#059669",
                          "#f59e0b,#f97316",
                          "#8b5cf6,#6366f1",
                          "#3b82f6,#06b6d4",
                          "#f43f5e,#ec4899",
                          "#059669,#10b981",
                          "#f97316,#f59e0b",
                          "#6366f1,#3b82f6",
                          "#ec4899,#8b5cf6",
                        ][i]
                      })`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>

              {/* Dock */}
              <div
                className="flex gap-2 mt-4 px-3 py-2 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {["#6366f1,#8b5cf6", "#06b6d4,#3b82f6", "#10b981,#059669", "#f59e0b,#f97316"].map(
                  (g, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${g})`,
                        opacity: 0.8,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Screen reflection */}
        <div
          className="absolute inset-[6px] rounded-[38px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}
