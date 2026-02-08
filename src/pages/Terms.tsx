import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 8, 2026</p>

        <div className="prose prose-sm max-w-none [&>*]:text-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using Ahsan GPT, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground">
              Ahsan GPT is an AI-powered chatbot service that provides conversational assistance using Google's Gemini AI technology. The service is provided "as is" and may be modified or discontinued at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground">You are responsible for:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and complete registration information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Acceptable Use</h2>
            <p className="text-muted-foreground">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit malicious code, viruses, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the service to generate spam or misleading content</li>
              <li>Reverse engineer or attempt to extract the source code</li>
              <li>Use automated systems to access the service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Content and Intellectual Property</h2>
            <p className="text-muted-foreground">
              You retain ownership of the content you submit. By using our service, you grant us a license to process and store your content to provide the service. AI-generated responses are provided for informational purposes and may not be accurate or reliable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free. AI responses may contain inaccuracies and should not be relied upon for critical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, Ahsan GPT shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Data and Privacy</h2>
            <p className="text-muted-foreground">
              Your use of the service is also governed by our Privacy Policy. We collect and process data as described in that policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason. You may terminate your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">12. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these terms, contact us at: <a href="mailto:legal@ahsangpt.com" className="text-primary hover:underline">legal@ahsangpt.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
