import { Container, Text } from "@/components/ui";
import {
  LogoIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  XIcon,
} from "@/components/ui/icons";
import { siteConfig, type SocialIcon } from "@/config/site";
import s from "./footer.module.scss";

const socialIcons: Record<SocialIcon, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
};

export function Footer() {
  const { contact, socials } = siteConfig;

  return (
    <footer id="contact" className={s.footer}>
      <Container className={s.grid}>
        <div className={s.brand}>
          <span className={s.logo}>
            <LogoIcon size={64} />
          </span>
          <Text className={s.brandName}>
            Life begins
            <br />
            after coffee
          </Text>
        </div>

        <ul className={s.contact}>
          <li>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={s.contactItem}>
              <PhoneIcon size={18} />
              {contact.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className={s.contactItem}>
              <MailIcon size={18} />
              {contact.email}
            </a>
          </li>
        </ul>

        <div className={s.social}>
          <Text className={s.socialTitle}>Follow us</Text>
          <ul className={s.socialList}>
            {socials.map(({ name, href, icon }) => {
              const Icon = socialIcons[icon];
              return (
                <li key={name}>
                  <a
                    href={href}
                    className={s.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                  >
                    <Icon size={16} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}