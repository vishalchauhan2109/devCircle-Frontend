import React, { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { Github, Twitter } from "lucide-react"

/* ---------- Utils ---------- */
const cn = () =>{
  


  return (
    <div
      style={style}
      className={cn(
        "h-full w-full rounded-3xl p-8 flex flex-col",
        onAccent
          ? "text-[var(--on-accent-foreground)]"
          : "bg-white text-slate-900"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className={cn(!showAvatar && "invisible")}>
          <img
            src={avatarSrc}
            alt={avatarFallback}
            className="h-16 w-16 rounded-full ring-2 ring-offset-4"
            style={{ ringColor: "var(--accent-color)" }}
          />
        </div>

        <p
          className={cn(
            "text-sm",
            onAccent ? "opacity-80" : "text-slate-500"
          )}
        >
          {location}
        </p>

        <h3 className="text-3xl font-semibold">{name}</h3>
      </div>

      <p
        className={cn(
          "mt-6 leading-relaxed",
          onAccent ? "opacity-90" : "text-slate-600"
        )}
      >
        {bio}
      </p>

      {socials.length > 0 && (
        <div className="mt-6 flex gap-4">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="hover:opacity-70"
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- Animated Wrapper ---------- */
export const AnimatedProfileCard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const initial = "circle(40px at 64px 64px)"
  const hover = "circle(150% at 64px 64px)"

  useGSAP(() => {
    gsap.set(overlayRef.current, { clipPath: initial })
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div
        ref={containerRef}
        onMouseEnter={() =>
          gsap.to(overlayRef.current, {
            clipPath: hover,
            duration: 0.7,
            ease: "expo.inOut",
          })
        }
        onMouseLeave={() =>
          gsap.to(overlayRef.current, {
            clipPath: initial,
            duration: 1.1,
            ease: "expo.out",
          })
        }
        
        className="relative w-[350px] overflow-hidden rounded-3xl border-2 border-slate-300"
      >
        {/* Base */}
        <ProfileCard
          name="Satish Kumar"
          location="Bengaluru, India"
          bio="Design Engineer, building UI components & MVPs."
          avatarSrc="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
          avatarFallback="SK"
          showAvatar={false}
        />

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ background: "var(--accent-color)" }}
        >
          <ProfileCard
            variant="on-accent"
            name="Satish Kumar"
            location="Bengaluru, India"
            bio="Design Engineer, building UI components & MVPs."
            avatarSrc="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
            avatarFallback="SK"
            socials={[
              {
                id: "github",
                url: "https://github.com",
                label: "GitHub",
                icon: <Github className="h-5 w-5" />,
              },
              {
                id: "twitter",
                url: "https://x.com",
                label: "Twitter",
                icon: <Twitter className="h-5 w-5" />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
