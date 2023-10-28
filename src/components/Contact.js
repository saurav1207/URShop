import React from 'react';
import './Contact.css';

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    // const email = formData.get('email');
    // const message = formData.get('message');

    alert(`Thank you for your feedback, ${name}! We have received your message and will get back to you shortly.`);
    form.reset();
  };

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="right-side">
          <h2>Get in touch with us</h2>
          <p>
            If you have any questions, feedback, or need support, feel free to reach out to us.
            We'd love to hear from you!
          </p>
          <p>
            Email: contact@urshop.com
          </p>
        </div>
        <div className="left-side">
          <h1 className="contact-title">Contact Us</h1>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;