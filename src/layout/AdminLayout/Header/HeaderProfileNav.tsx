import { Badge, Dropdown, Nav, NavItem } from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCreditCard,
  faEnvelopeOpen,
  faFile,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { PropsWithChildren, useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faIdCard,
  faListCheck,
  faLock,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { userService } from "src/services";

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  );
};

export default function HeaderProfileNav() {
  const router = useRouter();

  const logout = async () => {
    userService.logout();
  };
  const username = userService.getUsername();
  const firstName = userService.getFirstName();
  const lastName = userService.getLastName();

  return (
    <Nav>
      <Dropdown as={NavItem}>
        <div className="profile-container">
        <p className="text-black profile-name">{firstName} {lastName}</p>
          <Dropdown.Toggle
            variant="link"
            bsPrefix="hide-caret"
            className="py-0 px-2 rounded-0"
            id="dropdown-profile"
          >
            <div className="avatar position-relative">
              <Image
                fill
                className="rounded-circle"
                src="/assets/img/avatars/avatarempty.jpg"
                alt="user@email.com"
              />
            </div>
          </Dropdown.Toggle>
        </div>
        <Dropdown.Menu className="pt-0">
        <Link href="/ID-Card" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faIdCard}>ID Card</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Dropdown.Header className="bg-light fw-bold">
            Settings
          </Dropdown.Header>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faUser}>Profile</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faGear}>Settings</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>
            <ItemWithIcon icon={faPowerOff}>Logout</ItemWithIcon>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
