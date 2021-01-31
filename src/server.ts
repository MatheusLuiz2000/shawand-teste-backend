/* eslint-disable no-console */
import app from './app';

import pacote from '../package.json';

const { PORT } = process.env;

app.listen(PORT || 4040, () => {
  console.info(
    `** TEST v${pacote.version} executed in port ${PORT || 4040} **`
  );
});
