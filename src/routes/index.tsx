import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Star,
  UtensilsCrossed,
  ShoppingBag,
  Bike,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import heroBagel from "@/assets/hero-bagel.jpg";
import storyImg from "@/assets/story.jpg";
import bagelSalmon from "@/assets/bagel-salmon.jpg";
import bagelChicken from "@/assets/bagel-chicken.jpg";
import bagelSweet from "@/assets/bagel-sweet.jpg";
import drinks from "@/assets/drinks.jpg";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE = "02 32 15 39 31";
const PHONE_HREF = "tel:+33232153931";
const ADDRESS = "26 Rue du Maréchal Foch, 27150 Étrépagny";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("La Bagelerie, 26 Rue du Maréchal Foch, 27150 Étrépagny");
const MAPS_EMBED =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("26 Rue du Maréchal Foch, 27150 Étrépagny") +
  "&output=embed";
const INSTAGRAM = "https://instagram.com/labageleriedecamillebymarie";

const menuItems = {
  salés: [
    { name: "Le Saumon Fumé", desc: "Saumon fumé, cream cheese, aneth, oignons rouges, câpres", price: "12,50 €", img: bagelSalmon },
    { name: "Le Poulet Pesto", desc: "Poulet mariné, mozzarella, tomates fraîches, pesto maison", price: "11,90 €", img: bagelChicken },
    { name: "Le Végé", desc: "Houmous, avocat, roquette, tomates séchées, graines torréfiées", price: "10,50 €", img: null },
  ],
  sucrés: [
    { name: "Le Caramel Beurre Salé", desc: "Bagel briochée, caramel maison, éclats de noisettes", price: "6,90 €", img: bagelSweet },
    { name: "Le Nutella Framboise", desc: "Pâte à tartiner cacao, framboises fraîches, sucre glace", price: "6,50 €", img: null },
  ],
  formules: [
    { name: "Formule Midi", desc: "1 bagel salé + 1 boisson + 1 dessert au choix", price: "15,90 €", img: null },
    { name: "Formule Gourmande", desc: "1 bagel + 1 soupe ou salade + 1 boisson chaude", price: "17,90 €", img: null },
  ],
  boissons: [
    { name: "Cafés & Lattes maison", desc: "Torréfaction artisanale, laits végétaux dispo", price: "3,20 € – 4,80 €", img: drinks },
    { name: "Limonades & Thés glacés", desc: "Recettes maison, sirops naturels, menthe fraîche", price: "3,90 €", img: null },
  ],
} as const;

type Category = keyof typeof menuItems;

const reviews = [
  { name: "Sophie L.", rating: 5, text: "Les meilleurs bagels de Normandie ! Produits frais, accueil au top et une ambiance qu'on ne veut plus quitter." },
  { name: "Julien M.", rating: 5, text: "Camille et Marie font un travail incroyable. Le bagel saumon est une tuerie, on y retourne chaque semaine." },
  { name: "Aurélie P.", rating: 5, text: "Adresse coup de cœur à Étrépagny. Tout est fait maison, ça se sent. Merci pour la gentillesse !" },
  { name: "Thomas B.", rating: 4, text: "Excellente formule midi, portion généreuse et de vraies saveurs. Le caramel beurre salé, une petite folie." },
];

const hours = [
  { day: "Lundi", time: "Fermé" },
  { day: "Mardi", time: "9h00 – 15h00" },
  { day: "Mercredi", time: "9h00 – 15h00" },
  { day: "Jeudi", time: "9h00 – 15h00" },
  { day: "Vendredi", time: "9h00 – 15h00 · 18h30 – 21h30" },
  { day: "Samedi", time: "9h00 – 15h00 · 18h30 – 21h30" },
  { day: "Dimanche", time: "10h00 – 14h00" },
];

function Index() {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState<Category>("salés");

  const nav = [
    { href: "#menu", label: "Menu" },
    { href: "#histoire", label: "À propos" },
    { href: "#avis", label: "Avis" },
    { href: "#instagram", label: "Instagram" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-3xl leading-none text-primary md:text-4xl">La Bagelerie</span>
            <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground md:inline">Étrépagny</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition hover:text-primary">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 md:inline-flex"
            >
              <Phone className="h-4 w-4" /> Nous appeler
            </a>
            <button
              aria-label="Ouvrir le menu"
              className="rounded-full border border-border p-2 md:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border/60 bg-background md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={PHONE_HREF}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-2 md:gap-14 md:px-8 md:pb-24 md:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" /> Bagels artisanaux · Étrépagny
            </span>
            <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">
              Le bagel,
              <span className="font-display block text-terracotta">fait maison</span>
              avec amour.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Chez Camille & Marie, on pétrit, on garnit, on régale. Des recettes généreuses,
              des produits frais, et cette petite touche normande qui fait toute la différence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Voir le menu
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-6 py-3 text-sm font-semibold text-primary transition hover:bg-secondary"
              >
                <MapPin className="h-4 w-4" /> Itinéraire
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span>
                <strong className="text-foreground">4,8/5</strong> · 117 avis Google
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-40 w-40 rounded-full bg-accent/40 blur-3xl md:block" />
            <div className="absolute -bottom-8 -right-4 hidden h-56 w-56 rounded-full bg-terracotta/30 blur-3xl md:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-2xl">
              <img
                src={heroBagel}
                alt="Bagel artisanal au saumon fumé"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-lg md:block">
              <p className="font-display text-2xl text-terracotta">Ouvert aujourd'hui</p>
              <p className="text-xs text-muted-foreground">Sur place · À emporter · Livraison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section id="histoire" className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div className="relative">
            <img
              src={storyImg}
              alt="Bagels fraîchement sortis du four"
              loading="lazy"
              width={1200}
              height={1000}
              className="rounded-[2rem] border border-border object-cover shadow-xl"
            />
            <div className="absolute -bottom-6 -right-4 rotate-3 rounded-2xl bg-accent px-5 py-3 shadow-lg md:-right-8">
              <p className="font-display text-2xl text-primary">Fait maison, chaque jour</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-terracotta">Notre histoire</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Deux passionnées, une même envie&nbsp;: <span className="font-display text-terracotta">régaler.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                La Bagelerie, c'est l'histoire de Camille et Marie, deux Normandes qui ont fait du
                bagel leur terrain de jeu. Une pâte pétrie à la main, pochée puis dorée au four,
                garnie de produits frais choisis chez nos voisins producteurs.
              </p>
              <p>
                Rien d'industriel ici — juste de la générosité, un peu d'audace, et ce plaisir simple
                de voir nos clients revenir. Bienvenue chez nous, à Étrépagny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-terracotta">Notre carte</p>
              <h2 className="mt-3 text-4xl md:text-5xl">
                Une carte <span className="font-display text-terracotta">généreuse</span>
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Salés, sucrés, formules midi et boissons maison. Compter 10&nbsp;–&nbsp;20&nbsp;€ par personne.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(menuItems) as Category[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={
                    "rounded-full border px-4 py-2 text-sm font-medium capitalize transition " +
                    (cat === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/80 hover:border-primary/40")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuItems[cat].map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:shadow-xl"
              >
                {item.img ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-accent/30 to-terracotta/20">
                    <span className="font-display text-5xl text-primary/60">{item.name.split(" ")[1] ?? "★"}</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl">{item.name}</h3>
                    <span className="whitespace-nowrap font-display text-2xl text-terracotta">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Avis */}
      <section id="avis" className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-accent">Ils nous adorent</p>
            <h2 className="mt-3 text-4xl text-primary-foreground md:text-5xl">
              <span className="font-display text-accent">4,8</span> / 5 sur 117 avis
            </h2>
            <div className="mt-4 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-primary-foreground/90">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold">— {r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-terracotta">Comment on vous régale</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Trois façons de <span className="font-display text-terracotta">savourer</span></h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: UtensilsCrossed, title: "Sur place", desc: "Une petite salle cosy pour prendre le temps, entre amis ou en solo." },
              { icon: ShoppingBag, title: "À emporter", desc: "Passez commande par téléphone, on vous prépare tout, chaud et bien emballé." },
              { icon: Bike, title: "Livraison", desc: "On livre à Étrépagny et alentours — parfait pour un déjeuner au bureau." },
            ].map((s) => (
              <div key={s.title} className="rounded-3xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/40 text-primary">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <InstagramFeed />

      {/* Contact */}
      <section id="contact" className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-sm uppercase tracking-[0.25em] text-terracotta">Nous trouver</p>
              <h2 className="mt-3 text-4xl md:text-5xl">Passez nous <span className="font-display text-terracotta">dire bonjour</span></h2>

              <div className="mt-8 space-y-5 text-sm">
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-primary">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <span>26 Rue du Maréchal Foch<br />27150 Étrépagny, Normandie</span>
                </a>
                <a href={PHONE_HREF} className="flex items-center gap-3 hover:text-primary">
                  <Phone className="h-5 w-5 shrink-0 text-terracotta" />
                  <span className="font-semibold">{PHONE}</span>
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary">
                  <Instagram className="h-5 w-5 shrink-0 text-terracotta" />
                  <span>@labageleriedecamillebymarie</span>
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-terracotta" />
                  <h3 className="text-lg">Horaires</h3>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-none last:pb-0">
                      <dt className="font-medium">{h.day}</dt>
                      <dd className="text-right text-muted-foreground">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
                <iframe
                  title="Carte La Bagelerie"
                  src={MAPS_EMBED}
                  loading="lazy"
                  className="h-80 w-full md:h-[420px]"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
          <div>
            <p className="font-display text-4xl text-accent">La Bagelerie</p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Bagels artisanaux, faits maison à Étrépagny, Normandie.
            </p>
          </div>
          <div className="text-sm text-primary-foreground/80">
            <p className="font-semibold text-primary-foreground">Nous contacter</p>
            <p className="mt-2">{ADDRESS}</p>
            <p><a href={PHONE_HREF} className="hover:text-accent">{PHONE}</a></p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-primary-foreground">Suivez-nous</p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-4 py-2 text-primary-foreground/90 transition hover:bg-primary-foreground/10"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-primary-foreground/60 md:px-8">
            © {new Date().getFullYear()} La Bagelerie · Mentions légales · Fait avec amour en Normandie
          </p>
        </div>
      </footer>

      {/* Mobile call CTA */}
      <a
        href={PHONE_HREF}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl md:hidden"
      >
        <Phone className="h-4 w-4" /> Appeler
      </a>

      {/* Preload image for offscreen use */}
      <img src={interior} alt="" className="hidden" aria-hidden />
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-6 rounded-3xl border border-border bg-card p-6 md:p-8"
    >
      <h3 className="text-2xl">Une question ? Un événement ?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Écrivez-nous, on répond vite (entre deux fournées).
      </p>
      {sent ? (
        <p className="mt-6 rounded-xl bg-sage/20 px-4 py-3 text-sm text-foreground">
          Merci, votre message est bien parti&nbsp;! On vous répond très vite. 🥯
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Nom</span>
            <input required className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Email</span>
            <input type="email" required className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            <span className="font-medium">Message</span>
            <textarea required rows={4} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </label>
          <button
            type="submit"
            className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Envoyer le message
          </button>
        </div>
      )}
    </form>
  );
}
