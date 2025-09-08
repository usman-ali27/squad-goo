import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const jobSeekerLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Career Resources", href: "/career-resources" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Salary Guide", href: "/salary-guide" },
    { name: "Interview Tips", href: "/interview-tips" },
  ];

  const employerLinks = [
    { name: "Post Jobs", href: "/post-jobs" },
    { name: "Find Candidates", href: "/find-candidates" },
    { name: "Pricing Plans", href: "/pricing" },
    { name: "Enterprise Solutions", href: "/enterprise" },
    { name: "Recruitment Tools", href: "/recruitment-tools" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "About SquadGoo", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-hover">
                <span className="text-lg font-bold text-white">SG</span>
              </div>
              <span className="text-xl font-bold text-accent">SquadGoo</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Australia's premier job platform connecting exceptional talent with innovative companies. 
              Build your career, grow your business.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    to={social.href}
                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">For Job Seekers</h3>
            <ul className="space-y-3">
              {jobSeekerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">For Employers</h3>
            <ul className="space-y-3">
              {employerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support & Company</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} SquadGoo Australia. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-accent text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;