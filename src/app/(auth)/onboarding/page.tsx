"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, PartyPopper, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cities, interestOptions, universities } from "@/lib/constants";
import { useAuth } from "@/context/auth-context";
import type { Interest } from "@/types";
import { cn } from "@/lib/utils";

const steps = ["intro", "ciudad", "universidad", "intereses", "final"] as const;
type Step = (typeof steps)[number];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [city, setCity] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [interests, setInterests] = useState<Interest[]>([]);

  const step: Step = steps[stepIndex];
  const progress = (stepIndex / (steps.length - 1)) * 100;

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }
  function toggleInterest(id: Interest) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }
  function finish() {
    completeOnboarding({ city, university, interests });
    router.push("/inicio");
  }

  const canContinue =
    step === "ciudad" ? !!city : step === "universidad" ? !!university : step === "intereses" ? interests.length > 0 : true;

  return (
    <div className="w-full max-w-xl">
      {step !== "intro" && step !== "final" && (
        <div className="mb-8">
          <Progress value={progress} />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {step === "intro" && (
            <div className="text-center">
              <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-tribu-gradient shadow-glow">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </span>
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Bienvenido a tu nueva tribu.
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                Vamos a personalizar MiTribu para ti. Solo nos llevará un minuto.
              </p>
              <Button size="lg" className="mt-8" onClick={next}>
                Empezar
              </Button>
            </div>
          )}

          {step === "ciudad" && (
            <StepCard title="¿En qué ciudad estudias?" subtitle="Te mostraremos pisos y anuncios cerca de ti.">
              <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                {cities.map((c) => (
                  <OptionPill key={c} label={c} selected={city === c} onClick={() => setCity(c)} />
                ))}
              </div>
            </StepCard>
          )}

          {step === "universidad" && (
            <StepCard title="¿Cuál es tu universidad?" subtitle="Así podemos calcular distancias y recomendarte lo más cercano.">
              <div className="grid max-h-72 gap-2 overflow-y-auto">
                {universities.map((u) => (
                  <OptionPill key={u} label={u} selected={university === u} onClick={() => setUniversity(u)} fullWidth />
                ))}
              </div>
            </StepCard>
          )}

          {step === "intereses" && (
            <StepCard title="¿Qué te interesa?" subtitle="Elige todo lo que quieras, puedes cambiarlo cuando quieras.">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {interestOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id as Interest)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                      interests.includes(opt.id as Interest)
                        ? "border-primary bg-primary-50"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                    {interests.includes(opt.id as Interest) && <Check className="ml-auto h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step === "final" && (
            <div className="text-center">
              <motion.span
                initial={{ scale: 0.6, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-coral shadow-glow"
              >
                <PartyPopper className="h-7 w-7 text-coral-foreground" />
              </motion.span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tu MiTribu está lista.</h1>
              <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                Hemos personalizado tu feed con lo mejor de {city || "tu ciudad"} para estudiantes como tú.
              </p>
              <Button size="lg" className="mt-8" onClick={finish}>
                Entrar en MiTribu
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step !== "intro" && step !== "final" && (
        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={back}>
            Atrás
          </Button>
          <Button onClick={next} disabled={!canContinue}>
            Continuar
          </Button>
        </div>
      )}
    </div>
  );
}

function StepCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionPill({
  label,
  selected,
  onClick,
  fullWidth,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all",
        fullWidth ? "text-left" : "text-center",
        selected ? "border-primary bg-primary-50 text-primary-700" : "border-border hover:border-primary/40"
      )}
    >
      {label}
    </button>
  );
}
