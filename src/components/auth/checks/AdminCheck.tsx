import React from 'react';
import { SingleLine, Sub4Title } from '../../generic/Styled';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { themeColors } from '../../../styles/Themes';
import { XSvg, Check } from '../../generic/Icons';
import { useGetCanAdminQuery } from '../../../generated/graphql';

type AdminProps = {
  host: string;
  admin: string;
  cert?: string;
  setChecked: (state: boolean) => void;
};

export const AdminCheck = ({ host, admin, cert, setChecked }: AdminProps) => {
  const { data, loading } = useGetCanAdminQuery({
    fetchPolicy: 'network-only',
    skip: !admin,
    variables: { auth: { host, macaroon: admin, cert } },
    onError: () => {
      setChecked(false);
    },
    onCompleted: () => {
      setChecked(true);
    },
  });

  const content = () => {
    if (loading) {
      return <ScaleLoader height={20} color={themeColors.blue3} />;
    }
    if (data?.adminCheck) {
      return <Check />;
    }
    return <XSvg />;
  };

  return (
    <SingleLine>
      <Sub4Title>Admin Macaroon</Sub4Title>
      {content()}
    </SingleLine>
  );
};
