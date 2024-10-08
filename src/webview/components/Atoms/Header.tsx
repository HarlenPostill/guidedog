import React from 'react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return <h1 style={{ width: '100%', textAlign: 'center' }}>{title}</h1>;
};

export default Header;
