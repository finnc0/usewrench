/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Car,
  Calendar,
  Camera,
  Bell,
  Cog,
  ChevronRight,
  ArrowRight,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Home() {
  const [email, setEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFooterEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFooterEmail(e.target.value);
  };

  const sendToDiscord = async (emailValue: string) => {
    try {
      setIsSubmitting(true);
      // Replace with your actual Discord webhook URL
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK;

      if (!webhookUrl) {
        throw new Error("Discord webhook URL not configured");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `**New Waitlist Signup:** ${emailValue}`,
          embeds: [
            {
              title: "UseWrench Waitlist Signup",
              description: `Someone joined the waitlist with email: ${emailValue}`,
              color: 5814783, // Purple color in decimal
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send webhook");
      }

      toast("Success!", {
        description:
          "You've been added to our waitlist. We'll notify you when we launch!",
        duration: 5000,
      });

      return true;
    } catch (error) {
      console.error("Error sending to Discord:", error);

      toast("Something went wrong", {
        description: "Please try again later or contact support.",
        duration: 5000,
      });

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast("Invalid email", {
        description: "Please enter a valid email address.",
        duration: 3000,
      });
      return;
    }

    const success = await sendToDiscord(email);
    if (success) {
      setEmail("");
    }
  };

  const handleFooterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!footerEmail || !footerEmail.includes("@")) {
      toast("Invalid email", {
        description: "Please enter a valid email address.",
        duration: 3000,
      });
      return;
    }

    const success = await sendToDiscord(footerEmail);
    if (success) {
      setFooterEmail("");
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UseWrench",
    applicationCategory: "Lifestyle, Automotive",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      frequency: "month",
    },
    description:
      "Track vehicle maintenance, fluids, parts, and decode fault codes. Your personal mechanic in your pocket.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "126",
    },
  };

  return (
    <>
      <Head>
        <title>
          UseWrench - Car Maintenance Tracker & Fault Code Interpreter |
          $9.99/month
        </title>
        <meta
          name="description"
          content="Never forget car maintenance again. Track fluids, parts, and decode fault codes. Your personal mechanic in your pocket at just $9.99/month."
        />
        <meta
          name="keywords"
          content="car maintenance app, vehicle service tracker, automotive maintenance, fault code reader, car repair tracking, maintenance reminders"
        />

        {/* Open Graph tags for social sharing */}
        <meta
          property="og:title"
          content="UseWrench - Your Personal Car Maintenance Assistant"
        />
        <meta
          property="og:description"
          content="Track every part, fluid change, and service with ease. Set reminders, store part numbers, and decode fault codes."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://usewrench.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="UseWrench - Car Maintenance Simplified"
        />
        <meta
          name="twitter:description"
          content="Never miss an oil change again. Track maintenance, decode fault codes, and generate service reports."
        />
        <meta name="twitter:image" content="/twitter-card.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://usewrench.app" />

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <a href="/" className="flex items-center space-x-2">
                <Cog className="h-6 w-6 text-primary" />
                <span className="font-bold">UseWrench</span>
              </a>
            </div>
            <nav className="hidden md:flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
              <a
                href="#features"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Pricing
              </a>
              <a
                href="#joinwaitlist"
                className="transition-colors hover:text-primary text-primary"
              >
                Join Waitlist
              </a>
            </nav>
            <Button variant="outline" size="sm" className="ml-auto md:hidden">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section
            className="relative overflow-hidden py-20 md:py-24 lg:py-32"
            id="joinwaitlist"
          >
            <div className="container px-4 md:px-6 mx-auto">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
                <div className="flex flex-col gap-6">
                  <Badge className="w-fit" variant="secondary">
                    Only $9.99/month
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Never Forget Car Maintenance Again
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Track parts, fluids, maintenance, and fault codes with ease.
                    Your personal mechanic in your pocket.
                  </p>
                  <form
                    id="waitlist"
                    className="flex flex-col sm:flex-row gap-3 mt-2"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="h-12"
                        value={email}
                        onChange={(e) => handleEmailChange(e)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-6"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting ? "Submitting..." : "Join Waitlist"}
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground">
                    Be the first to know when we launch. Limited early access
                    available.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="relative max-w-md overflow-hidden rounded-xl border shadow-2xl items-center">
                    <Image
                      src="/preview.svg"
                      alt="UseWrench App Preview"
                      height={500}
                      width={500}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-secondary/60 mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center max-w-[800px] mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Every Feature You Need to Maintain Your Car
                </h2>
                <p className="text-xl text-muted-foreground">
                  UseWrench helps you manage every aspect of your vehicle's
                  maintenance with powerful features.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Car className="h-10 w-10 text-primary" />}
                  title="Complete Part Tracking"
                  description="Log every part replacement with part numbers, costs, and photos for future reference."
                />
                <FeatureCard
                  icon={<Car className="h-10 w-10 text-primary" />}
                  title="Fluid Change Reminders"
                  description="Never miss an oil change or fluid replacement with smart, customizable reminders."
                />
                <FeatureCard
                  icon={<Camera className="h-10 w-10 text-primary" />}
                  title="Photo Documentation"
                  description="Take photos of parts, receipts, and your DIY work. Everything stored securely."
                />
                <FeatureCard
                  icon={<Settings className="h-10 w-10 text-primary" />}
                  title="Fault Code Interpreter"
                  description="Store and interpret diagnostic trouble codes (DTCs). Instantly understand what those cryptic fault codes mean."
                />
                <FeatureCard
                  icon={<Bell className="h-10 w-10 text-primary" />}
                  title="Smart Notifications"
                  description="Receive timely alerts based on mileage, time, or seasonal maintenance needs."
                />
                <FeatureCard
                  icon={<Calendar className="h-10 w-10 text-primary" />}
                  title="PDF Reports & History"
                  description="Generate detailed PDF reports of your entire service history. Perfect for vehicle sales or warranty claims."
                />
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center max-w-[800px] mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  How UseWrench Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Getting started is simple. Just follow these steps to keep
                  your vehicle in top condition.
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                <StepCard
                  number="1"
                  title="Add Your Vehicle"
                  description="Enter your vehicle details including make, model, year, and current mileage."
                />
                <StepCard
                  number="2"
                  title="Log Maintenance"
                  description="Record oil changes, part replacements, and other services with all relevant details."
                />
                <StepCard
                  number="3"
                  title="Set Reminders"
                  description="Configure custom reminders based on mileage or time intervals."
                />
                <StepCard
                  number="4"
                  title="Stay Updated"
                  description="Receive timely notifications when maintenance is due."
                />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center max-w-[800px] mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-muted-foreground">
                  One affordable plan with everything you need. No hidden fees
                  or complicated tiers.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <Card className="border-primary/20 py-0">
                  <CardHeader className="bg-primary text-white text-center rounded-t-lg p-3">
                    <CardTitle className="text-2xl">$9.99 / month</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Everything included, no restrictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <PricingItem text="Unlimited vehicles" />
                      <PricingItem text="Unlimited part tracking" />
                      <PricingItem text="15GB photo storage" />
                      <PricingItem text="Custom maintenance schedules" />
                      <PricingItem text="Smart reminders & notifications" />
                      <PricingItem text="Maintenance analytics" />
                      <PricingItem text="Fault code interpretation" />
                      <PricingItem text="PDF report generation" />
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => router.push("#joinwaitlist")}
                    >
                      Join Waitlist
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center max-w-[800px] mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  What Early Testers Say
                </h2>
                <p className="text-xl text-muted-foreground">
                  Feedback from our beta testers who've had an early peek at
                  UseWrench.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <TestimonialCard
                  quote="I used to forget when I last changed my oil or what brand of filter I used. UseWrench has been a game-changer for keeping track of everything."
                  name="John D."
                  role="Toyota Camry Owner"
                />
                <TestimonialCard
                  quote="As someone who maintains multiple vehicles, this app is exactly what I needed. The part tracking feature is particularly useful for keeping everything organized."
                  name="Sarah M."
                  role="Car Enthusiast"
                />
                <TestimonialCard
                  quote="The maintenance reminders have saved me from expensive repairs multiple times already. Well worth the small monthly fee."
                  name="Michael T."
                  role="Jeep Wrangler Owner"
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20 bg-primary">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center max-w-[800px] mx-auto">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                  Ready to Never Miss Maintenance Again?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8">
                  Join our waitlist today and get early access when we launch.
                  Track all your maintenance, decode fault codes, and generate
                  professional reports with UseWrench.
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  onSubmit={(e) => handleFooterSubmit(e)}
                >
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="h-12 bg-white"
                    value={footerEmail}
                    onChange={(e) => handleFooterEmailChange(e)}
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    variant="secondary"
                    className="h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Join Waitlist"}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t bg-background py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Cog className="h-6 w-6 text-primary" />
                  <span className="font-bold">UseWrench</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Your personal mechanic in your pocket. The complete solution
                  for tracking and managing your vehicle's maintenance and
                  repairs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Support Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} UseWrench. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingItem({ text }: { text: string }) {
  return (
    <li className="flex items-center">
      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="mb-4 italic">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium mr-3">
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
