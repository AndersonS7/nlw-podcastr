import '../styles/global.scss';
import styles from '../styles/app.module.scss';

import Header from '../components/Header';
import Player from '../components/Player';
import { PlayerConterxProvider } from '../contexts/PlayerContext';


function MyApp({ Component, pageProps }) {

  return (
    <PlayerConterxProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerConterxProvider>
  )
}

export default MyApp
