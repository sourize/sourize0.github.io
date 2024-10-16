"use client";

import { useState, useEffect } from 'react';
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TimeLineCard } from "@/components/timeline-card";
import { Badge } from "@/components/ui/badge";
import { LocateFixed, Paperclip } from 'lucide-react';
import { SKILLS } from "@/data/skills.config";
import { PROJECTS } from "@/data/projects.config";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { BlogCard } from "@/components/blog-card";
import { ImageGallery } from "@/components/ImageGallery";

const BLUR_FADE_DELAY = 0.04;

interface BlogsI {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    icon: string;
    featured: boolean;
    readTime: string;
  };
}

export default function Page() {
  const [blogPosts, setBlogPosts] = useState<BlogsI[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    if (blogPosts.length === 0) {
      fetchBlogPosts();
    }
  }, [blogPosts.length]);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none"
                yOffset={8}
                text={`Hey, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-lg mt-2"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-2xl font-bold">About Me</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-base text-muted-foreground dark:prose-invert justify">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      {/* <section id="photos">
        <div className="columns-2 gap-4 sm:columns-3">
          {Array.from({ length: 9 }, (_, i) => {
            const isLandscape = i % 2 === 0;
            const width = isLandscape ? 800 : 600;
            const height = isLandscape ? 600 : 800;
            return `/gallery/${i + 1}.jpg`;
          }).map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <img
                className="mb-4 size-full rounded-lg object-contain"
                src={imageUrl}
                alt={`Random stock image ${idx + 1}`}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
    
      <section id="blogs">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Latest Articles
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Insights from My Journey
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve written some blogs on my learning journey, projects, ML, and some other stuff.{" "}
                  <Link href="/blog" className="text-blue-500 hover:underline">
                    checkout my blog page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex flex-col gap-3 w-full">
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className="divide-y divide-dashed">
                {blogPosts
                  .filter((post) => post.metadata.featured)
                  .sort(
                    (a, b) =>
                      new Date(b.metadata.publishedAt).getTime() -
                      new Date(a.metadata.publishedAt).getTime()
                  )
                  .map((post, id) => (
                    <BlurFade
                      key={post.slug}
                      delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                    >
                      <BlogCard
                        href={`/blog/${post.slug}`}
                        title={post.metadata.title}
                        description={post.metadata.summary}
                        publishedAt={post.metadata.publishedAt}
                        iconUrl={post.metadata.icon}
                        // readTime={post.metadata.readTime}
                      />
                    </BlurFade>
                  ))}
              </ul>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="flex flex-col items-center">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Featured Projects
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="space-y-12 w-full">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mt-2">
                    Some of my projects
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve worked on a variety of ML projects and Data Analytics projects. Here are a few of my favorites.
                    You can find more on my{" "}
                    <Link
                      href="/projects"
                      className="text-blue-500 hover:underline"
                    >
                      projects page
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto mt-8">
                {PROJECTS.filter((project) => project.featured).map(
                  (project, id) => (
                    <BlurFade
                      key={project.title}
                      delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                    >
                      <ProjectCard
                        href={project.href}
                        active={project.active}
                        archived={project.archived}
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        dates={project.dates}
                        tags={project.technologies}
                        image={project.image}
                        video={project.video}
                        links={project.links}
                      />
                    </BlurFade>
                  )
                )}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I am attending my{" "}
                  {DATA.hackathons.length}st hackathon.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 17 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links.map(link => ({
                      icon: link.icon,
                      title: link.type,
                      href: link.href
                    }))}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;m always excited to collaborate on projects or just chat about tech. Reach out anytime:{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  Twitter
                </Link>
                {", "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </Link>
                {", or "}
                <Link
                  href={`mailto:${DATA.contact.email}`}
                  className="text-blue-500 hover:underline"
                >
                  Email
                </Link>
                . I&apos;ll respond whenever I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <footer className="mt-20 pb-8 text-center text-sm text-muted-foreground">
        <BlurFade delay={BLUR_FADE_DELAY * 19}>
          <p>© Sourish Chatterjee 2024</p>
          <p className="mt-2">
            Template by{" "}
            <Link href="https://x.com/dillionverma" className="text-blue-500 hover:underline">
              Dhillon Verma
            </Link>
          </p>
        </BlurFade>
      </footer>
    </main>
  );
}
