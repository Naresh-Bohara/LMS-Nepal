import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="w-[95%] 800px:w-[90%] mx-auto py-8 text-gray-900 dark:text-gray-100 font-Poppins leading-relaxed">
      <h1 className={`${styles.title} !text-start mb-6`}>
        Privacy &amp; Policy
      </h1>

      <section className="space-y-6 text-[16px]">
        <p>
          <strong>LMS-Nepal</strong> (“we”, “us”, or “our”) is committed to
          protecting your personal information and your right to privacy.
          This Privacy Policy applies to our website, mobile applications, and
          services (collectively, the “Service”). By using our Service, you
          agree to the collection and use of information in accordance with
          this policy.
        </p>

        <h2 className="text-xl font-semibold mt-8">1. Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us,
          such as your name, email, phone number, and payment details. We also
          automatically collect certain technical data such as IP address,
          browser type, device information, and usage patterns through cookies
          and similar technologies.
        </p>

        <h3 className="text-lg font-semibold mt-6">1.1 How We Collect Information</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Voluntarily Provided Data:</strong> When you register,
            contact us, or interact on social media.
          </li>
          <li>
            <strong>Automatically Collected Data:</strong> Via cookies,
            server logs, and app analytics.
          </li>
          <li>
            <strong>Third-Party Sources:</strong> We may receive information
            from public databases or marketing partners.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. Use of Your Information</h2>
        <p>
          Your information is used to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Create and manage your account.</li>
          <li>Process payments securely.</li>
          <li>Communicate important updates and support.</li>
          <li>Prevent fraud and ensure service security.</li>
          <li>Send marketing and promotional materials (with your consent).</li>
          <li>Improve and personalize our services.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. Sharing Your Information</h2>
        <p>
          We do not sell your data. We share information only when necessary with:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Service providers to support our operations.</li>
          <li>Business partners for joint promotions.</li>
          <li>Legal authorities when required by law.</li>
          <li>In case of mergers or acquisitions.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">4. Cookies &amp; Tracking</h2>
        <p>
          We use cookies to enhance your experience, analyze site traffic, and
          personalize content. You can manage cookie preferences in your
          browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal data but cannot guarantee absolute security. Please protect
          your account credentials and notify us of any suspicious activity.
        </p>

        <h2 className="text-xl font-semibold mt-8">6. Children’s Privacy</h2>
        <p>
          Our Service is not intended for children under 13, and we do not
          knowingly collect personal information from children under this age.
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You may also opt out of marketing communications at any
          time.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We encourage you to
          review it regularly. Continued use of the Service after changes
          constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-xl font-semibold mt-8">9. Contact Us</h2>
        <p>
          For questions or concerns about your privacy, please contact us at{" "}
          <a href="mailto:info@lms-nepal.com" className="text-teal-600 hover:underline">
            info@lms-nepal.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default Policy;
