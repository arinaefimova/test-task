import { FC, useEffect, useState } from "react";
import {  CiUser } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./Header.module.scss";
import { TbMapPin } from "react-icons/tb";

const Header: FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={classNames(styles.header, { [styles.active]: isSticky })}>
      <div className="container">
        <div className={styles.row}>
          <Link to="/" className={styles.logo}>
            LOGO
          </Link>

          <nav className={styles.menu} aria-label="Main Navigation">
            <ul className={styles["menu-list"]}>
              <li className={styles["menu-item"]}>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.menuLink, { [styles.menuLinkActive]: isActive })
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className={styles["menu-item"]}>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.menuLink, { [styles.menuLinkActive]: isActive })
                  }
                  to="/create-product"
                >
                  Create Product
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.socials}>
            <button className={styles.icon} aria-label="Map Pin">
            <TbMapPin size={20}  />
            </button>
            <button className={styles.icon} aria-label="User Profile">
              <CiUser size={20} />
              
            </button>
          </div>
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;
