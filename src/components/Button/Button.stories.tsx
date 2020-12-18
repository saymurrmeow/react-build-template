import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '.';

storiesOf('Button', module)
  .add('default', () => <Button title="click" />)
  .add('primary', () => <Button title="click" color="#FF4785" />);
