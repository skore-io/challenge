import { ContentStrategy } from './content-strategy.interface'
import { PdfStrategy } from './pdf-strategy'
import { ImageStrategy } from './image-strategy'
import { VideoStrategy } from './video-strategy'
import { LinkStrategy } from './link-strategy'
import { TxtStrategy } from './txt-strategy'

//encaminha pro tipo correto de strategy
export const contentStrategies: { [key: string]: ContentStrategy } = {
  pdf: new PdfStrategy(),
  image: new ImageStrategy(),
  video: new VideoStrategy(),
  link: new LinkStrategy(),
  txt: new TxtStrategy(),
}
