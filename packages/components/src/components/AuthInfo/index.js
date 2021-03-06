import React, { useContext } from 'react';
import { AuthContext } from '../../context/Authentication';
import { useSignOut } from '../../hooks/authentication';
import { InlineButton } from '../Forms/Button';

// The component can optionally take in a username, which will be shown
// If not, the default will be to get the email from context
export default () => {
  const { customUserData } = useContext(AuthContext);
  const signOut = useSignOut();

  return (
    <>
      Du bist angemeldet als{' '}
      {customUserData && (customUserData.username || customUserData.email)}. Du
      bist jemand anderes?{' '}
      <InlineButton onClick={signOut} type="button">
        Hier klicken zum Abmelden.
      </InlineButton>
    </>
  );
};
