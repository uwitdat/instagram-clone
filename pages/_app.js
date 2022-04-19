import '../styles/reset.css'
import { AppWrapper } from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>

  )
}

export default MyApp
