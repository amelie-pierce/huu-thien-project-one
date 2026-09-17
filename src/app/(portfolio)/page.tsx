import { Badge, Heading, Text } from "@/components/ui";
import { experiences, hobbies, recentProjects, stats } from "@/data/portfolio";

import { ExperienceCard } from "./components/experience-card/experience-card";
import { GitHubIcon } from "@/components/ui/icons/GithubIcon";
import Image from "next/image";
import { InsIcon } from "@/components/ui/icons/InsIcon";
import PortfolioHeader from "@/components/PortfolioHeader/PortfolioHeader";
import { ProjectCard } from "./components/project-card/project-card";
import { Stat } from "./components/stat/stat";
import { XIcon } from "@/components/ui/icons/XIcon";
import { YoutubeIcon } from "@/components/ui/icons/YoutubeIcon";
import { cn } from "@/utils";
import styles from "./portfolio.module.scss";

export default function Home() {
  return (
    <div className={cn("portfolio-dark", styles.portfolioContainer)}>
      <PortfolioHeader />
      <div className={cn("container", styles.bodyContainer)}>
        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardContainer}>
              <div className={styles.top}>
                <Image
                  src="/images/avt1.png"
                  alt="Top image"
                  width={246}
                  height={276}
                />
              </div>
              <div className={styles.middle}>
                <Heading className={styles.name}>Thien Nguyen</Heading>
                <div className={styles.socials}>
                  <GitHubIcon className="w-5 h-5" />
                  <InsIcon className="w-5 h-5" />
                  <YoutubeIcon className="w-5 h-5" />
                  <XIcon className="w-5 h-5" />
                </div>

              </div>
              <div className={styles.bottom}>
                <p className={styles.text}>A UX engineer who design and code beautifully simple things, and I love what I do.</p>
                <div className={styles.hobbyfy}>
                  <div className={`${styles.divider} ${styles.text}`}>
                    Hobbies
                  </div>
                  <div className={styles.hobbyBadges}>
                    {hobbies.map((hobby) => (
                      <Badge key={hobby}>{hobby}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className={styles.main}>
          <div className={styles.hero}>
            <div className={styles.titleRole}>
              <Heading as="h1" variant="display" className="uppercase">Frontend <span className={styles.textMuted}>Engineer</span></Heading>
              <Text size="xl" className={styles.textBody}>
                Front-end builder obsessed with simple structure, clean design, and thoughtful interactions. I love bringing concepts to life from scratch—and helping other creators level up along the way
              </Text>
            </div>

            <div className={styles.statContainer}>
              {stats.map((highlight) => (
                <Stat key={highlight.value} value={highlight.value} label={highlight.label} />
              ))}
            </div>
          </div>
          <div className={styles.experienceSection}>
            <Heading as="h1" variant="display" className="uppercase">10+ YEARS OF <span className={styles.textMuted}>EXPERIENCE</span></Heading>
            <div className={styles.experiences}>
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.company}
                  company={experience.company}
                  role={experience.role}
                  description={experience.description}
                  period={experience.period}
                  url={experience.url}
                />
              ))}
            </div>
          </div>
          <div className={styles.experienceSection}>
            <Heading as="h1" variant="display" className="uppercase">Recent <span className={styles.textMuted}>Projects</span></Heading>
            <div className={styles.experiences}>
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  description={project.description}
                  logo={project.logo}
                  url={project.url}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}
