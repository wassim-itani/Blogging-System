import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./Contact.scss";

const Contact = () => {

  useDocumentTitle("Contact BLOGR");
  return (
    <section className="contact">
    <h1 className="contact-title">Contacts</h1>
    <p className="contact-text">BLOGR would love to hear from you!</p>
    <ul className="contact-list">
      <li className="contact-item">
        Email:  <a href="#" className="contact-link">blogr@hotmail.com</a>
      </li>
      <li className="contact-item">
        Twitter: <a href="#" className="contact-link">@blogr</a>
      </li>
      <li className="contact-item">
        Facebook: <a href="#" className="contact-link">@blogr</a>
      </li>
      <li className="contact-item">
        Report a vulnerability: <a href="#" className="contact-link">blogr.com/security</a>
      </li>
    </ul>
  </section>
  )
}

export default Contact;