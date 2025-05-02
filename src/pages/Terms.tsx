
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600">Last updated: May 1, 2025</p>
            
            <h2>1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Dukkan website, mobile application, and services (collectively, the "Services"). 
              Please read these Terms carefully before using our Services.
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, 
              then you may not access the Services.
            </p>
            
            <h2>2. Definitions</h2>
            <p>
              <strong>"Account"</strong> means a unique account created for You to access our Services or parts of our Services.
              <br />
              <strong>"Company"</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Dukkan Inc.
              <br />
              <strong>"Content"</strong> refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You.
              <br />
              <strong>"Device"</strong> means any device that can access the Services such as a computer, a cellphone or a digital tablet.
              <br />
              <strong>"Service"</strong> refers to the Website, the App and all services provided by Dukkan.
              <br />
              <strong>"Terms and Conditions"</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.
              <br />
              <strong>"Third-party Social Media Service"</strong> means any services or content provided by a third-party that may be displayed, included or made available by the Service.
              <br />
              <strong>"Website"</strong> refers to Dukkan, accessible from www.dukkan.com.
              <br />
              <strong>"You"</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </p>
            
            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password, 
              whether your password is with our Services or a third-party service.
            </p>
            
            <h2>4. Intellectual Property</h2>
            <p>
              The Services and their original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Dukkan and its licensors. 
              The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries. 
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Dukkan.
            </p>
            
            <h2>5. Links To Other Web Sites</h2>
            <p>
              Our Services may contain links to third-party web sites or services that are not owned or controlled by Dukkan.
            </p>
            <p>
              Dukkan has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. 
              You further acknowledge and agree that Dukkan shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>
            
            <h2>6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.
            </p>
            
            <h2>7. Limitation Of Liability</h2>
            <p>
              In no event shall Dukkan, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; 
              (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use or alteration of your transmissions or content, 
              whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
            
            <h2>8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: legal@dukkan.com
              <br />
              Postal address: 123 Commerce St., San Francisco, CA 94103, United States
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
