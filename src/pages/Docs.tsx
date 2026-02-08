import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Shield, Zap, HelpCircle } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground mb-12">Everything you need to know about Ahsan GPT</p>

        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-foreground">Getting Started</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ahsan GPT is an AI-powered chatbot built with Google's Gemini 2.5 technology. It provides intelligent, context-aware responses to help you with various tasks.
              </p>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">How to Sign Up</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Visit the sign-in page</li>
                  <li>Choose to sign up with email/password or Google</li>
                  <li>Complete the authentication process</li>
                  <li>Start chatting immediately</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-foreground">Features</h2>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-foreground mb-2">AI-Powered Conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Google Gemini 2.5, providing intelligent and contextual responses to your queries.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-foreground mb-2">Conversation History</h3>
                <p className="text-sm text-muted-foreground">
                  All your chats are saved and accessible from the sidebar for easy reference.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-foreground mb-2">Markdown Support</h3>
                <p className="text-sm text-muted-foreground">
                  Responses support rich formatting including code blocks, lists, and emphasis.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-foreground mb-2">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized dark theme for comfortable extended use.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-foreground">Security & Privacy</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your privacy and security are our top priorities. All data is encrypted in transit and at rest using industry-standard protocols.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Authentication via Firebase with secure OAuth 2.0</li>
                <li>End-to-end encrypted data transmission</li>
                <li>No third-party data sharing without consent</li>
                <li>Regular security audits and updates</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-foreground">FAQ</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">What AI model does Ahsan GPT use?</h3>
                <p className="text-sm text-muted-foreground">
                  We use Google's Gemini 2.5 Flash model, with automatic fallback to Gemini 2.5 Pro for enhanced responses when needed.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Is my conversation data private?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes. Your conversations are stored securely and are only accessible to you. We do not share your data with third parties.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Can I delete my account and data?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes. You can request account deletion at any time, and all associated data will be permanently removed.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Is there a mobile app?</h3>
                <p className="text-sm text-muted-foreground">
                  Currently, Ahsan GPT is a web application optimized for both desktop and mobile browsers. A native mobile app may be released in the future.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">How do I report a bug or request a feature?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact us at <a href="mailto:support@ahsangpt.com" className="text-primary hover:underline">support@ahsangpt.com</a> with your feedback.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">What should I do if I forgot my password?</h3>
                <p className="text-sm text-muted-foreground">
                  Use the "Forgot Password" link on the sign-in page to reset your password via email. Alternatively, sign in with Google.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-4">
              If you have additional questions or need support, reach out to us:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">
                Email: <a href="mailto:support@ahsangpt.com" className="text-primary hover:underline">support@ahsangpt.com</a>
              </p>
              <p className="text-muted-foreground">
                Documentation: <Link to="/docs" className="text-primary hover:underline">ahsangpt.com/docs</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;
