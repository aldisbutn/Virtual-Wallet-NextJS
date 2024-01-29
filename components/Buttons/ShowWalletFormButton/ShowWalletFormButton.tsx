'use client';

import React, { useState } from 'react';
import Button from '../Button/Button';

type ShowWalletFormButtonProps = {
  click: (show: boolean) => void;
};
const ShowWalletFormButton = (props: ShowWalletFormButtonProps) => {
  const { click } = props;
  return (
    <Button
      click={() => {
        click(true);
      }}
      buttonText={'Rename'}
      variant={'info'}
      size='small'
    />
  );
};

export default ShowWalletFormButton;
