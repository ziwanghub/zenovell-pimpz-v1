'use client';

interface IngredientItem {
  name: string;
  description?: string;
}

interface ProductIngredientsProps {
  ingredients?: IngredientItem[];
}

export function ProductIngredients({ ingredients }: ProductIngredientsProps) {
  // Safe empty state when rich content is absent
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="bg-zinc-950 px-6 py-10 text-center text-sm text-white/50">
        Ingredients data not available yet.
      </div>
    );
  }

  return (
    <section className="px-4 py-5 text-white md:px-0">
      <div className="mx-auto max-w-[430px]">
        <div className="mb-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
            Ingredients / Composition
          </div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white">
            องค์ประกอบที่รองรับเหตุผลของการเลือกซื้อ
          </h2>
        </div>

        <div className="space-y-3">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-4"
            >
              <div className="text-[15px] font-semibold text-white">{item.name}</div>
              {item.description && (
                <p className="mt-1 text-sm leading-6 text-white/70">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
