import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>© {currentYear} Some text. All rights reserved.</p>     
      </div>
    </footer>
  );
}

export default Footer;
