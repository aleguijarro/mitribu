"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Check, PartyPopper, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cities, exchangeDirectionOptions, interestOptions, universities } from "@/lib/constants";
import { useAuth } from "@/context/auth-context";
import type { ExchangeDirection, Interest } from "@/types";
import { cn } from "@/lib/utils";

const steps = ["intro", "intercambio", "ciudad", "universidad", "intereses", "final"] as const;
type Step = (typeof steps)[number];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<ExchangeDirection | "">("");
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
  function finish(next: string) {
    completeOnboarding({ direction: direction || undefined, city, university, interests });
    router.push(next);
  }

  const arriving = direction !== "se-va";

  const canContinue =
    step === "intercambio"
      ? !!direction
      : step === "ciudad" ? !!city : step === "universidad" ? !!university : step === "intereses" ? interests.length > 0 : true;

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
                MiTribu es la red de los estudiantes de intercambio en España. Vamos a personalizarla para ti: solo nos
                llevará un minuto.
              </p>
              <Button size="lg" className="mt-8" onClick={next}>
                Empezar
              </Button>
            </div>
          )}

          {step === "intercambio" && (
            <StepCard title="¿Cuál es tu situación?" subtitle="Así te enseñamos lo que necesitas primero.">
              <div className="grid gap-3">
                {exchangeDirectionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDirection(opt.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                      direction === opt.id ? "border-primary bg-primary-50" : "border-border hover:border-primary/40"
                    )}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <span>
                      <span className="block text-sm font-semibold">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground">{opt.description}</span>
                    </span>
                    {direction === opt.id && <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />}
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step === "ciudad" && (
            <StepCard
              title={arriving ? "¿A qué ciudad llegas?" : "¿En qué ciudad estudias ahora?"}
              subtitle={arriving ? "Te mostraremos habitaciones y anuncios de allí." : "Ahí es donde publicarás tu habitación y tus cosas."}
            >
              <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                {cities.map((c) => (
                  <OptionPill key={c} label={c} selected={city === c} onClick={() => setCity(c)} />
                ))}
              </div>
            </StepCard>
          )}

          {step === "universidad" && (
            <StepCard
              title={arriving ? "¿En qué universidad vas a estudiar?" : "¿Cuál es tu universidad?"}
              subtitle="Así podemos calcular distancias y recomendarte lo más cercano."
            >
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
                Último paso: verifica que eres estudiante para poder {arriving ? "enviar solicitudes" : "aceptar solicitudes"}.
                Solo necesitas tu email universitario o tu carnet, y tu DNI o pasaporte.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" onClick={() => finish("/verificacion")}>
                  <BadgeCheck className="h-4 w-4" /> Verificarme ahora
                </Button>
                <Button size="lg" variant="ghost" onClick={() => finish(arriving ? "/inicio" : "/publicar")}>
                  Más tarde
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                ¿Por qué? <Link href="/soporte" className="underline">Así evitamos estafas</Link>.
              </p>
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
