/**
 *  This file holds a hook (or multiple hooks) which serves as api call
 *  to update a signature list in the backend (e.g. add a count, if user scanned
 *  qr code)
 */

import { useState } from 'react';

/*
  States:
  - null
  - error
  - saving
  - saved
  - noListFound
*/

export const useUpdateSignatureListByUser = () => {
  const [state, setState] = useState(null);
  return [
    state,
    data => updateSignatureListByUser(data, setState),
    () => {
      setState(null);
    },
  ];
};

// function, which makes an api call to set the signature count
// for a specific list after user has scanned the qr code
const updateSignatureListByUser = async (
  { listId, userId, email, count, campaignCode },
  setState
) => {
  // make api call to create new singature list and get pdf
  setState('saving');

  const body = { count, campaignCode };

  // Depending on whether a user id or email was provided
  // we either send only list id or with user id or email

  if (userId) {
    body.userId = userId;
  } else if (email) {
    body.email = email;
  }

  try {
    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      `${process.env.API_URL}/signatures/${listId}`,
      request
    );

    if (response.status === 204) {
      setState('saved');
    } else if (response.status === 404) {
      const json = await response.json();

      // errorCode is either 'listNotFound' or 'userNotFound' or 'listAndUserNotFound'
      setState(json.errorCode);
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error while updating signature list', error);
    setState('error');
  }
};
