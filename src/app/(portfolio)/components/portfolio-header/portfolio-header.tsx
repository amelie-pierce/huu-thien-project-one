"use client";

import { BriefcaseIcon, FolderIcon, UserIcon } from "@/components/ui/icons";

import { PillNav } from "@/components/ui";
import styles from "./portfolio-header.module.scss";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = [
    { key: "self", label: "Me", icon: <UserIcon /> },
    { key: "experience", label: "Experience", icon: <BriefcaseIcon /> },
    { key: "project", label: "Projects", icon: <FolderIcon /> },
];
const IDS = SECTIONS.map((section) => section.key);

export default function PortfolioHeader() {
    const active = useActiveSection(IDS, { rootMargin: "-30% 0px -60% 0px" }) ?? "self";

    return (
        <header className={styles.header}>
            <PillNav
                label="Portfolio"
                items={SECTIONS.map((section) => ({
                    ...section,
                    href: `#${section.key}`,
                    active: section.key === active,
                }))}
            />
        </header>
    );
}
