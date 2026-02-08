import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 8, 2026</p>

        <div className="prose prose-sm max-w-none [&>*]:text-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us when you create an account, use our services, or communicate with us. This includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Account information (email address, name)</li>
              <li>Authentication data (Google OAuth or email/password)</li>
              <li>Chat messages and conversation history</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Provide, maintain, and improve our AI chat services</li>
              <li>Process and respond to your queries</li>
              <li>Send you technical notices and support messages</li>
              <li>Monitor and analyze usage patterns to enhance user experience</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Data Storage and Security</h2>
            <p className="text-muted-foreground">
              Your data is stored securely using Firebase and Google Cloud infrastructure. We implement industry-standard security measures including encryption in transit and at rest. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Third-Party Services</h2>
            <p className="text-muted-foreground">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Google Firebase for authentication and data storage</li>
              <li>Google AI (Gemini) for AI-powered responses</li>
              <li>Google Analytics for usage tracking (if applicable)</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your conversation history</li>
              <li>Opt out of non-essential data collection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy, please contact us at: <a href="mailto:privacy@ahsangpt.com" className="text-primary hover:underline">privacy@ahsangpt.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
