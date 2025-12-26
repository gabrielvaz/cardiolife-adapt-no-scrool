import { createContext, useContext, useState, ReactNode } from "react";

type Variant = "V1" | "V2" | "V3" | "V4" | "V5" | "V6" | "V7" | "V8" | "V9" | "V10";

interface VariantContextType {
  variant: Variant;
  setVariant: (variant: Variant) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<Variant>("V1");

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantContext.Provider>
  );
}

export function useVariant() {
  const context = useContext(VariantContext);
  if (context === undefined) {
    throw new Error("useVariant must be used within a VariantProvider");
  }
  return context;
}
