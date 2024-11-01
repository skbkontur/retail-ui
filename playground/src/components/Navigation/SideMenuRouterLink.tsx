import React, { FC } from 'react';
import { SideMenu, SideMenuLinkProps } from '@skbkontur/side-menu';
import { useNavigate } from 'react-router-dom';

interface Props extends SideMenuLinkProps {
  href: string;
}

export const SideMenuRouterLink: FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <SideMenu.Link
      {...props}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        navigate(props.href);
      }}
    />
  );
};
