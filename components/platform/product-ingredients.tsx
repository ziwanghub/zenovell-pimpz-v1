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
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Ingredients</h2>

        <div className="space-y-3">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <div className="font-medium">{item.name}</div>
              {item.description && (
                <p className="mt-1 text-sm text-white/70">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
